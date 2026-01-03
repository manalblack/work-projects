import Navbar from '../components/Navbar'
import { TiMinus, TiPlus } from "react-icons/ti";
import LightBtn from '../components/LightBtn';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import toast from 'react-hot-toast';
import MiniOverlay from '../components/MiniOverlay';



/*  Steps to link database with localstorage cart
    When they click "Pay" or "Confirm Purchase," you trigger a function.

   That function takes the items from their LocalStorage and sends a request to your Supabase database to say: "Someone just bought 2 tickets for Event A, please subtract 2 from the total stock."

*/

export default function Cart() {

    const [cartItems, setCartItems] = useState([]);
     const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
    })

    const handelFormChange = (e) => {
        const {name, value} = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }


    useEffect(() => {
        const savedCart = localStorage.getItem('cart')

        if(savedCart) {
            // if there is another way fix it
            setCartItems(JSON.parse(savedCart));
        }
    }, [])
    

    
    const handelPostPaymentSuccess = (paymentResponse) => {
        console.log(paymentResponse);
        localStorage.removeItem('cart');

        setCartItems([]);

        toast.success("Payment Received! Thank you for your purchase.", {
        duration: 6000,
        position: 'top-center',
        });
        
    }

    /* 
         BUG: This is not working fix it,
         the payment modal is not showing up, but i got a transaction failed modal. FIX IT : Reference your last query to gemini
    */
    // Monneify Testing 
    const payWithMonnify = () => {

        window.MonnifySDK.initialize({
            amount: Number(total),
            currency: 'NGN',
            reference: new String(new Date().getTime()),
            customerFullName: formData.fullName,
            customerEmail: formData.email,
            apiKey: "MK_TEST_VM93KWVDC9",
            contractCode: '6713572503',
            paymentDescription: 'Event Ticket Purchase',
            onComplete: function(response) {
                if(response.status === 'SUCCESS') {
                    handelPostPaymentSuccess(response);
                }
            },
            onClose: function(data) {
                toast.error('payment cancelled')
            }

        })
    }


    const handelFormSubmission = (e) => {
        e.preventDefault();
        console.log(formData);
        

        console.log(cartItems);
        payWithMonnify();
        // alert('information submitted !!');
    }

    const updateQuantity = (type, event, operator) => {

        console.log(event);
        

        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingItemIndex = currentCart.findIndex((item) => item.id === event.id && item.type === type);

        let updatedCart;

        if(existingItemIndex > -1) {
            updatedCart = cartItems.map((item, index) => {
            if (index === existingItemIndex) {
                
                return {...item, qty: Math.max(1, item.qty + operator)}
            }
            return item
        }); 
        } else {
            if(operator > 0){
                const newTicket = {
                    id: event.id,
                    title: event.title,
                    type: type,
                    price: type == 'vip'? event.vip.price: event.regular.price,
                    vipPrice: event.vip.price,
                    regularPrice: event.regular.price,
                    qty: 1
                };
                updatedCart = [...currentCart, newTicket];
            } else {
                updatedCart = currentCart
            }
        }
        setCartItems(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

    const handelDecrease = (eventId, ticketType) => {        
        
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

        // find the item
        const existingItemIndex = currentCart.findIndex((item) => item.id === eventId && item.type === ticketType);

        if(existingItemIndex > -1) {
            const item = currentCart[existingItemIndex];
            if (item.qty > 1) {
                currentCart[existingItemIndex].qty -= 1;

            } else {
                currentCart.splice(existingItemIndex, 1)
                toast.error('Removed 1 ticket from cart')
            }
        }

        localStorage.setItem('cart', JSON.stringify(currentCart))
        setCartItems(currentCart)
    } 

    
  

    const groupedCart = cartItems.reduce((acc, item) => {
    // If we haven't seen this event ID yet, create a base object
    if (!acc[item.id]) {
        acc[item.id] = {
        title: item.title,
        id: item.id,
        vip: { qty: 0, price: item.vipPrice },
        regular: { qty: 0, price: item.regularPrice }
        };
    }
    
    // Assign the specific ticket data to the correct type
        acc[item.id][item.type].qty = item.qty;


    return acc;
    }, {});

    // this line flip the grouped cart object into an array so that we can map over it
    const displayItems = Object.values(groupedCart)
 
    const total = cartItems.reduce((total, item) => {
        return total + (item.price * item.qty)
    }, 0)
    

    

    return(
       <>
        <Navbar />

        <main className='w-full bg-lightPurple mt-14 pt-5 flex flex-col items-center gap-5 pb-5 md:gap-15 md:mt-17'>
            <Header>Cart</Header>
            <div className='flex flex-col justify-center items-center gap-5 w-full md:mt-1'>
                {displayItems.map((item) => (
                    <div key={`${item.id}-${item.type}`}  className='h-45 w-9/10 bg-white p-2 flex flex-row items-center gap-4 rounded-sm md:h-auto md:w-3/4'>

                    <div className='md:w-1/2 w-3/5 relative'>
                        <img src='/placeholder.jpg' alt="" className='rounded-sm'/>
                        <MiniOverlay>
                            <h2 className='text-white font-bold text-2xl text-center'>
                                {item.title}
                            </h2>
                        </MiniOverlay>
                    </div>

                    <div className="bg-red-0 h- w-1/2 flex flex-col gap-3 md:gap-6">
                        <div className="shadow-md py-1 flex flex-col gap-3 justify-center items-center md:py-3">
                            <p className="font-light text-">
                                VIP Ticket: {item.vip.price}
                            </p>


                            <div className="flex flex-row gap-5">
                                
                                <button onClick={() => handelDecrease( item.id, 'vip')}
                                    className="bg-darkPurple py- px-1 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                    <TiMinus className="size-5 text-white"/>
                                </button>
                                    <span className="font-extrabold text-xl">
                                        {item.vip.qty}
                                    </span>
                                <button onClick={() => updateQuantity('vip', item, 1)}
                                    className="bg-darkPurple py- px-1 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                    <TiPlus className="size-5 text-white"/>
                                </button>
                            </div>


                        </div>
                        <div className="shadow-md py-1 flex flex-col gap-3 justify-center items-center md:py-3">
                            <p className="font-light text-">
                                Regular Ticket: {item.regular.price}
                            </p>


                            <div className="flex flex-row gap-3">
                                
                                <button onClick={() => handelDecrease( item.id, 'regular')}
                                    className="bg-darkPurple py- px-1 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                    <TiMinus className="size-5 text-white"/>
                                </button>
                                    <span className="font-extrabold text-xl">{item.regular.qty}</span>
                                <button onClick={() => updateQuantity('regular', item, 1)}
                                    className="bg-darkPurple py- px-1 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                    <TiPlus className="size-5 text-white"/>
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
                ))}
                
            </div>

            <div className="bg-darkPurple w-3/4 p-4 text-center rounded-3xl shadow-2xl md:w-100">
                <span className="font-bold text-xl text-white">
                    Total: ₦{total}
                </span>
            </div>

            {/* user information and monnify linking */}
             <div className="w-9/10 md:w-120">
                <form action="" className="bg-darkPurple h-100 flex flex-col justify-center items-center gap-8 rounded-sm">
                    <input type="text" placeholder="Name" name='fullName' value={formData.fullName} onChange={handelFormChange}
                     className="border bg-white w-3/4 p-1 px-3 rounded-lg md:w-1/2 md:py-2"/>

                    <input type="text" placeholder="Email" name='email' value={formData.email} onChange={handelFormChange}
                    className="border bg-white w-3/4 p-1 px-3 rounded-lg md:w-1/2 md:py-2"/>

                    <input type="text" placeholder="Phone Number" name='phoneNumber' value={formData.phoneNumber} onChange={handelFormChange}
                    className="border bg-white w-3/4 p-1 px-3 rounded-lg md:w-1/2 md:py-2"/>
                   
                    <LightBtn onPress={handelFormSubmission}>
                        Proceed To Pay
                    </LightBtn>
                </form>

            </div>
        </main>
       </>
    )
}