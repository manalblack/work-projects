import { useLocation } from "react-router-dom"
import Navbar from '../components/Navbar'
import LightBtn from "../components/LightBtn";
import Overlay from "../components/Overlay";
import MiniOverlay from "../components/MiniOverlay";
import { TiMinus, TiPlus } from "react-icons/ti";
import Header from '../components/Header'
import { useState } from "react";


const vipPrice = 3000;
const regularPrice = 1000

export default function Checkout(){

    const [quantities, setQuantities] = useState({
        vip: 0,
        regular: 0
    })

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


    const total = (quantities.vip * vipPrice) + (quantities.regular * regularPrice)
    

    const location = useLocation()
    const itemToPay = location.state?.directBuyItem

    console.log(itemToPay);
    
    const handelFormSubmission = (e) => {
        e.preventDefault();
        console.log('form button working ok!!');
        alert('information submitted !!')
        
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
                                    <span>Event name</span>
                                    <span>Event date / time</span>
                                    <span>Address</span>
                                </div>
                            </MiniOverlay>
                        </div>

                        <div className="bg-red-40 h-40 w-9/10 md:w-1/2 flex flex-col gap-5 md:gap-10">
                            <div className="shadow-md py-1 flex flex-col gap-3 justify-center items-center md:py-5">
                                <p className="font-light text-lg">
                                    VIP Ticket price: 3000
                                </p>


                                <div className="flex flex-row gap-5">
                                  
                                    <button onClick={() => handelDecrement('vip')} className="bg-darkPurple py- px-2 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                        <TiMinus className="size-7 text-white"/>
                                    </button>
                                        <span className="font-extrabold text-xl">{quantities.vip}</span>
                                    <button  onClick={() => handelIncrement('vip')}className="bg-darkPurple py- px-2 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                        <TiPlus className="size-7 text-white"/>
                                    </button>
                                </div>


                            </div>
                             <div className="shadow-md py-1 flex flex-col gap-3 justify-center items-center md:py-5">
                                <p className="font-light text-lg">
                                    Regular Ticket price: 1000
                                </p>


                                <div className="flex flex-row gap-5">
                                  
                                    <button onClick={() => handelDecrement('regular')} className="bg-darkPurple py- px-2 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                        <TiMinus className="size-7 text-white"/>
                                    </button>
                                        <span className="font-extrabold text-xl">{quantities.regular}</span>
                                    <button onClick={() => handelIncrement('regular')} className="bg-darkPurple py- px-2 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
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

                            <input type="text" placeholder="Name" className="border bg-white w-3/4 md:w-1/2 md:py-2 p-1 px-3 rounded-lg"/>
                            <input type="text" placeholder="Email" className="border bg-white w-3/4 p-1 px-3 rounded-lg md:w-1/2 md:py-2"/>
                            <input type="text" placeholder="Phone Number" className="border bg-white w-3/4 p-1 px-3 rounded-lg md:w-1/2 md:py-2"/>
        
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