import { useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar'
import LightBtn from "../components/LightBtn";
import Overlay from "../components/Overlay";
import MiniOverlay from "../components/MiniOverlay";
import { TiMinus, TiPlus } from "react-icons/ti";
import Header from '../components/Header'
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';



const vipPrice = 3000;
const regularPrice = 1000

export default function Checkout(){

    const [quantities, setQuantities] = useState(() => {
    const savedData = sessionStorage.getItem('temp_ticket')
        if(savedData) {
            const parsed = JSON.parse(savedData)
            return {
                vip: parsed.vip?.qty || 0,
                regular: parsed.regular?.qty || 0
            };
        }
        return {vip:0, regular:0}
    })
    const [selectedEvent, setSelectedEvent] = useState(null)
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

        toast.success("Payment Received! Thank you for your purchase.", {
        duration: 6000,
        });

        navigate('/')
        
    }

        // Monneify Testing 
   

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('temp_ticket'));

        console.log('session data:', data);

        // console.log(data.eventData);
        
        setSelectedEvent(data)
        
    }, [])

    const handelIncrement = (type, operator) => {

       const existingData = JSON.parse(sessionStorage.getItem('temp_ticket')) || {};


        const currentType = existingData[type] || {qty: 0, price: 0}

        const newQty = operator === '+' ? currentType.qty + 1 : Math.max(0, currentType.qty - 1); 
        
        const updatedQuantities = {
            ...existingData,
            [type]: {
                ...currentType,
                qty: newQty
            }
        }

        sessionStorage.setItem('temp_ticket', JSON.stringify(updatedQuantities))

        setSelectedEvent(updatedQuantities)
        setQuantities({
            regular: updatedQuantities.regular?.qty ||0,
            vip: updatedQuantities.vip?.qty || 0
        })


    }



    // const location = useLocation()
    // const {event, type, qty, price} = location.state || {}

    let total;

    if(selectedEvent) {
        total = (selectedEvent.vip.price * selectedEvent.vip.qty) + (selectedEvent.regular.price * selectedEvent.regular.qty);
    }
    
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
                if(data.status === ' SUCCESS') {
                    return;
                }
                
                toast.error('payment cancelled')
            }

        })
    }
                
        }

        })
    }
    
    
    
    const handelFormSubmission = (e) => {
        e.preventDefault();
        console.log(formData);
        payWithMonnify();
    }


    if(!selectedEvent) {
        return <div>loading....</div>
    }

    return(
        <>
            <Navbar/>
            {/* The whole screen parent container */}
            <div className="h- w-full bg-lightPurple flex flex-col justify-center items-center mt-14 md:mt-17 md:gap-10 md:pt-5">
                <Header>Checkout</Header>
               <div className="flex flex-col justify-center items-center mt-7 bg-blue-30 gap-8 pb-8">
                    {/* Current Ticket */}
                    <div className="bg-white h-100 w-5/6 p-1 flex flex-col md:flex-row gap-5 justify-center items-center rounded-md shadow-lg px-2">

                        <div className="relative flex justify-center items-center w-5/6 md:w-1/2">
                            <img src="/placeholder.jpg" alt="" className="rounded-md"/>
                            <MiniOverlay>
                                <div className="flex flex-col gap-5 text-white">
                                    <span>event name</span>
                                    <span>Event date / time</span>
                                    <span>Address</span>
                                </div>
                            </MiniOverlay>
                        </div>

                        <div className="bg-red-40 h-40 w-9/10 md:w-1/2 flex flex-col gap-5 md:gap-10">
                            <div className="shadow-md py-1 flex flex-col gap-3 justify-center items-center md:py-5">
                                <p className="font-light text-lg">
                                    VIP Ticket: {selectedEvent.vip.price}
                                </p>


                                <div className="flex flex-row gap-5">
                                  
                                    <button onClick={() => handelIncrement('vip', '-')} className="bg-darkPurple py- px-2 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                        <TiMinus className="size-7 text-white"/>
                                    </button>
                                        <span className="font-extrabold text-xl">{quantities.vip}</span>
                                    <button  onClick={() => handelIncrement('vip', '+')}className="bg-darkPurple py- px-2 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                        <TiPlus className="size-7 text-white"/>
                                    </button>
                                </div>


                            </div>
                             <div className="shadow-md py-1 flex flex-col gap-3 justify-center items-center md:py-5">
                                <p className="font-light text-lg">
                                    Regular Ticket: {selectedEvent.regular.price}
                                </p>


                                <div className="flex flex-row gap-5">
                                  
                                    <button onClick={() =>
                                        handelIncrement('regular', '-')} className="bg-darkPurple py- px-2 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                        <TiMinus className="size-7 text-white"/>
                                    </button>
                                        <span className="font-extrabold text-xl">{quantities.regular}</span>
                                    <button onClick={() => handelIncrement('regular', '+')} className="bg-darkPurple py- px-2 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                        <TiPlus className="size-7 text-white"/>
                                    </button>
                                </div>


                            </div>
                        </div>

                    </div>

                    {/* Total Container */}
                    <div className="bg-darkPurple w-3/4 p-4 text-center rounded-3xl shadow-2xl md:w-100">
                        <span className="font-bold text-xl text-white">
                            Total: N{total}
                        </span>
                    </div>

                    {/* Form Container */}
                    <div className="w-9/10 md:w-120">
                        <form action="" className="bg-darkPurple h-100 md:h-120 flex flex-col justify-center items-center gap-8 rounded-sm md:gap-10">

                            <input type="text" placeholder="Name" name="fullName" value={formData.fullName} onChange={handelFormChange}
                            className="border bg-white w-3/4 md:w-1/2 md:py-2 p-1 px-3 rounded-lg"/>
                            <input type="text" placeholder="Email" name="email" value={formData.email} onChange={handelFormChange}
                            className="border bg-white w-3/4 p-1 px-3 rounded-lg md:w-1/2 md:py-2"/>
                            <input type="text" placeholder="Phone Number" name='phoneNumber' value={formData.phoneNumber} onChange={handelFormChange}
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