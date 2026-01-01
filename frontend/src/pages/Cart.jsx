import Navbar from '../components/Navbar'
import { TiMinus, TiPlus } from "react-icons/ti";
import LightBtn from '../components/LightBtn';
import { useEffect, useState } from 'react';
import Header from '../components/Header';



const vipPrice = 3000;
const regularPrice = 1000

export default function Cart() {

    const [quantities, setQuantities] = useState({
        vip: 0,
        regular: 0
    })
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart')

        if(savedCart) {
            // if there is another way fix it
            setCartItems(JSON.parse(savedCart));
        }
    }, [])
    

    const handelFormSubmission = (e) => {
        e.preventDefault();

        console.log(cartItems);

        alert('information submitted !!');
    }

    const handelIncrement = (type) => {
        setQuantities((prev) => ({
            ...prev,
            [type]: prev[type] + 1
        })) 
    }

    const handelDecrement = (type) => {
        setQuantities((prev) => ({
            ...prev,
            [type]: prev[type] - 1
        }))
    }

    const updateQuantity = (type, id, operator) => {

        const updatedCart = cartItems.map((item) => {

            if (item.id === id && item.type === type) {
                const newQty = Math.max(1, item.qty + operator)
                return {...item, qty: newQty}
            }
            return item
        })
        setCartItems(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }



    const total = (quantities.vip * vipPrice) + (quantities.regular * regularPrice)

    const groupedCart = cartItems.reduce((acc, item) => {
    // If we haven't seen this event ID yet, create a base object
    if (!acc[item.id]) {
        acc[item.id] = {
        title: item.title,
        id: item.id,
        vip: { qty: 0, price: 0 },
        regular: { qty: 0, price: 0 }
        };
    }
    
    // Assign the specific ticket data to the correct type
    acc[item.id][item.type] = { 
        qty: item.qty, 
        price: item.price 
    };
    
    return acc;
    }, {});

    // this line flip the grouped cart object into an array so that we can map over it
    const displayItems = Object.values(groupedCart)
    console.log(displayItems);
    


    return(
       <>
        <Navbar />

        <main className='w-full bg-lightPurple mt-14 pt-5 flex flex-col items-center gap-5 pb-5 md:gap-15 md:mt-17'>
            <Header>Cart</Header>
            <div className='flex flex-col justify-center items-center gap-5 w-full md:mt-1'>
                {displayItems.map((item) => (
                    <div key={`${item.id}-${item.type}`}  className='h-45 w-9/10 bg-white p-2 flex flex-row items-center gap-4 rounded-sm md:h-auto md:w-3/4'>

                    <div className='w-1/2 '>
                        <img src='/placeholder.jpg' alt="" className='rounded-sm'/>
                    </div>

                    <div className="bg-red-0 h- w-1/2 flex flex-col gap-3 md:gap-6">
                        <div className="shadow-md py-1 flex flex-col gap-3 justify-center items-center md:py-3">
                            <p className="font-light text-">
                                VIP Ticket: {item.vip.price.toLocaleString()}
                            </p>


                            <div className="flex flex-row gap-5">
                                
                                <button onClick={() => updateQuantity('vip', item.id, -1)}
                                    className="bg-darkPurple py- px-1 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                    <TiMinus className="size-5 text-white"/>
                                </button>
                                    <span className="font-extrabold text-xl">
                                        {item.vip.qty}
                                    </span>
                                <button onClick={() => updateQuantity('vip', item.id, 1)}
                                    className="bg-darkPurple py- px-1 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                    <TiPlus className="size-5 text-white"/>
                                </button>
                            </div>


                        </div>
                        <div className="shadow-md py-1 flex flex-col gap-3 justify-center items-center md:py-3">
                            <p className="font-light text-">
                                Regular Ticket: 1000
                            </p>


                            <div className="flex flex-row gap-3">
                                
                                <button onClick={() => updateQuantity('regular', item.id, -1)}
                                    className="bg-darkPurple py- px-1 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                    <TiMinus className="size-5 text-white"/>
                                </button>
                                    <span className="font-extrabold text-xl">{item.regular.qty}</span>
                                <button onClick={() => updateQuantity('regular', item.id, 1)}
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
                    Total: N{total}
                </span>
            </div>

            {/* user information and monnify linking */}
             <div className="w-9/10 md:w-120">
                <form action="" className="bg-darkPurple h-100 flex flex-col justify-center items-center gap-8 rounded-sm">
                    <input type="text" placeholder="Name" className="border bg-white w-3/4 p-1 px-3 rounded-lg md:w-1/2 md:py-2"/>
                    <input type="text" placeholder="Email" className="border bg-white w-3/4 p-1 px-3 rounded-lg md:w-1/2 md:py-2"/>
                    <input type="text" placeholder="Phone Number" className="border bg-white w-3/4 p-1 px-3 rounded-lg md:w-1/2 md:py-2"/>
                   
                    <LightBtn onPress={handelFormSubmission}>
                        Proceed
                    </LightBtn>
                </form>

            </div>
        </main>
       </>
    )
}