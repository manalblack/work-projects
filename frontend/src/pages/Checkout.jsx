import { useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar'
import LightBtn from "../components/LightBtn";
import MiniOverlay from "../components/MiniOverlay";
import { TiMinus, TiPlus } from "react-icons/ti";
import Header from '../components/Header'
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';




export default function Checkout(){

    const [selectedEvent, setSelectedEvent] = useState([])
    const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    })
    const navigate = useNavigate();
    
    const handelFormChange = (e) => {
        const {name, value} = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
    const handelPostPaymentSuccess = (paymentResponse) => {
        console.log(paymentResponse);

        sessionStorage.removeItem('temp_ticket')

        setSelectedEvent([]);

        toast.success("Payment Received! we sent the Ticket to Your email.", {
        duration: 6000,
        });

        navigate('/')
        
    }

        // Monneify Testing 
   

    useEffect(() => {
        const data = sessionStorage.getItem('temp_ticket');

        console.log('session data:', data);

        // console.log(data.eventData);
        
        setSelectedEvent(JSON.parse(data));
        
    }, [])

  

    const storageItems = JSON.parse(sessionStorage.getItem('temp_ticket')) || [];

    const storageSummery = storageItems.map(item => ({
        ticket_id: item.eventId,
        type: item.type,
        quantity: item.qty
    }))

     const metadata = {
        "cart_summery": JSON.stringify(storageItems),
        "summery": JSON.stringify(storageSummery),
        "total_amount": storageItems.reduce((total, item) => total + (item.price * item.qty), 0),
        "customer_name": formData.fullName,
        "customer_email": formData.email,
        "customer_phone": formData.phoneNumber
    }
    

    const updateQuantity = (type, event, operator) => {

        console.log(event);
        

        const currentTicket = JSON.parse(sessionStorage.getItem('temp_ticket')) || [];

        const existingItemIndex = currentTicket.findIndex((item) => item.eventId === event.id && item.type === type);

        let updatedStorage;

        if(existingItemIndex > -1) {

            updatedStorage = selectedEvent.map((item, index) => {
            if (index === existingItemIndex) {
                return {...item, qty: Math.max(1, item.qty + operator)}
            }
            return item
        }); 
        } else {
            if(operator > 0){
                const newTicket = {
                    eventId: event.id,
                    title: event.title,
                    type: type,
                    price: type == 'vip'? event.vip.price: event.regular.price,
                    vipPrice: event.vip.price,
                    regularPrice: event.regular.price,
                    qty: 1, 
                    image: event.img
                };
                updatedStorage = [...currentTicket, newTicket];
            } else {
                updatedStorage = currentTicket
            }
        }

        setSelectedEvent(updatedStorage);

        sessionStorage.setItem('temp_ticket', JSON.stringify(updatedStorage))
    }

    const handelDecrease = (eventId, ticketType) => {        
            
        const currentTicket = JSON.parse(sessionStorage.getItem('temp_ticket')) || [];

        // find the item
        const existingItemIndex = currentTicket.findIndex((item) => item.eventId === eventId && item.type === ticketType);

        if(existingItemIndex > -1) {
            const item = currentTicket[existingItemIndex];
            if (item.qty > 1) {
                currentTicket[existingItemIndex].qty -= 1;

            } else {
                currentTicket.splice(existingItemIndex, 1)
                toast.error('Removed 1 ticket')
            }
        }

        sessionStorage.setItem('temp_ticket', JSON.stringify(currentTicket))
        setSelectedEvent(currentTicket);
    } 
    

    const groupedItems = (selectedEvent || []).reduce((acc, item) => {
    // If we haven't seen this event ID yet, create a base object
    if (!acc[item.eventId]) {
        acc[item.eventId] = {
        title: item.title,
        id: item.eventId,
        img: item.image,
        vip: { qty: 0, price: item.vipPrice },
        regular: { qty: 0, price: item.regularPrice }
        };
    }

    // Assign the specific ticket data to the correct type
        acc[item.eventId][item.type].qty = item.qty;

    return acc;
    }, {});

    console.log(groupedItems)

    // this line flip the grouped cart object into an array so that we can map over it
    const displayItems = Object.values(groupedItems)
    

    const total = selectedEvent.reduce((total, item) => {
        return total + (item.price * item.qty)
    }, 0)


    
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
            metaData: metadata,
            onComplete: function(response) {
                if(response.status === 'SUCCESS') {
                    handelPostPaymentSuccess(response);
                    return;
                }
            },
           onClose: function(data) {
               if(data.status === 'SUCCESS') return;
                toast.error('payment cancelled')
            }
        })
           
    } 
    
    
    const handelFormSubmission = (e) => {
        e.preventDefault();
        console.log(formData);
        if(formData.fullName == '' && formData.email == '' && formData.phoneNumber == '') {
            toast.error('Please fill the the form !', {
                duration: 6000
            });
            return;
        } else {
            payWithMonnify();
        }

        // payWithMonnify();
    }


    if(!selectedEvent) {
        return <div>loading....</div>
    }


    return(
        <>
            <Navbar/>
            {/* The whole screen parent container */}
            <div className="h- w-full bg-lightPurple flex flex-col justify-center items-center mt-15 md:h-auto md:mt-20 md:gap-10 md:pt-5">
                <Header>Checkout</Header>
               <div className="flex flex-col justify-center items-center mt-7 bg-blue-30 gap-8 pb-8 ">
                    {/* Current Ticket */}
                    {displayItems.map((item) => (
                        <div key={`${item.id}-${item.type}`} className="bg-white p-1 flex flex-row gap-4 justify-center items-center rounded-md shadow-lg px-2 h-45 md:h-60 w-9/10 md:w-">

                        <div className="relative flex justify-center items-center w-3/5 md:w-1/2 bg-green-00">
                            <img src={item.img} alt="" className="rounded-md"/>
                            <MiniOverlay>
                                <div className="flex flex-col gap-5 text-white justify-center items-center bg-green-00 w-full">
                                    <h2 className="font-bold text-white text-center text-2xl">{item.title}</h2>
                                </div>
                            </MiniOverlay>
                        </div>

                        <div className="bg-red-00 h-40 md:h- w-1/2 flex flex-col gap-3 md:gap-6">
                            <div className=" py-1 flex flex-col gap-3 justify-center items-center md:py bg-blue-00">
                                <p className="font-light text-lg">
                                    VIP: {item.vip.price}
                                </p>


                                <div className="flex flex-row gap-5">
                                  
                                    <button onClick={() => handelDecrease(item.id, 'vip')} className="bg-darkPurple py- px-1 rounded-3xl shadow-xl active:scale-85 hover:bg-lightPurple hover:text-darkPurple transition-all duration-300 ease-in-out">
                                        <TiMinus className="size-5 text-white"/>
                                    </button>
                                        <span className="font-extrabold text-xl">{item.vip.qty}</span>
                                    <button  onClick={() => updateQuantity('vip', item, 1)} className="bg-darkPurple py- px-1 rounded-3xl shadow-lg active:scale-85 hover:bg-lightPurple hover:text-darkPurple transition-all duration-300 ease-in-out ">
                                        <TiPlus className="size-5 text-white"/>
                                    </button>
                                </div>
                            </div>
                             <div className="bg-green-00 py-1 flex flex-col gap-3 justify-center items-center md:py">
                                <p className="font-light text-lg">
                                    Regular: {item.regular.price}
                                </p>


                                <div className="flex flex-row gap-5">
                                  
                                    <button onClick={() => handelDecrease(item.id, 'regular')} className="bg-darkPurple py- px-1 rounded-3xl shadow-lg active:scale-85 hover:bg-lightPurple hover:text-darkPurple transition-all duration-300 ease-in-out">
                                        <TiMinus className="size-5 text-white"/>
                                    </button>
                                        <span className="font-extrabold text-xl">{item.regular.qty}</span>
                                    <button onClick={() => updateQuantity('regular', item, 1)} className="bg-darkPurple py- px-1 rounded-3xl shadow-lg active:scale-85 hover:bg-lightPurple hover:text-darkPurple transition-all duration-300 ease-in-out">
                                        <TiPlus className="size-5 text-white"/>
                                    </button>
                                </div>


                            </div>
                        </div>

                    </div>
                    ))}

                    {/* Total Container */}
                    <div className="bg-darkPurple w-3/4 p-4 text-center rounded-3xl shadow-2xl md:w-100">
                        <span className="font-bold text-xl text-white">
                            Total: N{total}
                        </span>
                    </div>

                    {/* Form Container */}
                    <div className="w-9/10 md:w-120">
                        <h2 className="text-center m-5">Enter the correct Information, please confirm your email before paying</h2>
                        <form action="" className="bg-darkPurple h-100 md:h-120 flex flex-col justify-center items-center gap-8 rounded-sm md:gap-8">

                            <input type="text" placeholder="Name" name="fullName" value={formData.fullName} onChange={handelFormChange}
                            className="border bg-white w-3/4 md:w-1/2 md:py-2 p-1 px-3 rounded-lg" required/>
                            <div className="bg-amber-00 md:w-1/2 w-3/4 flex flex-col p-1 gap-1 items-center">
                                <label htmlFor="" className="text-white font bold text-sm">we will email  your ticket to this provided email </label>
                                <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handelFormChange} required
                            className="border bg-white w-full p-1 px-3 rounded-lg md:py-2"/>
                            </div>
                           
                            <input type="text" placeholder="Phone Number" name='phoneNumber' value={formData.phoneNumber} onChange={handelFormChange} required
                             className="border bg-white w-3/4 p-1 px-3 rounded-lg md:w-1/2 md:py-2"/>
        
                            <LightBtn onPress={handelFormSubmission}>
                                Proceed
                            </LightBtn>
                        </form>

                    </div>
               </div>

            </div>
        </>
    )
}