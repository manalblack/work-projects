import { useLocation } from "react-router-dom"
import Navbar from '../components/Navbar'
import LightBtn from "../components/LightBtn";
import Overlay from "../components/Overlay";
import MiniOverlay from "../components/MiniOverlay";
import { TiMinus, TiPlus } from "react-icons/ti";



export default function Checkout(){

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
            <div className="h- w-full bg-lightPurple flex flex-col justify-center items-center mt-14 ">

               <div className="flex flex-col justify-center items-center mt-7 bg-blue-30 gap-8 pb-8">
                    {/* Current Ticket */}
                    <div className="bg-white h-90 w-5/6 p-1 flex flex-col gap-5 justify-center items-center rounded-md shadow-lg">

                        <div className="relative flex justify-center items-center w-5/6">
                            <img src="/placeholder.jpg" alt="" className="rounded-md"/>
                            <MiniOverlay>
                                <div className="flex flex-col gap-5 text-white">
                                    <span>Event name</span>
                                    <span>Event date / time</span>
                                    <span>Address</span>
                                </div>
                            </MiniOverlay>
                        </div>

                        <div className="bg-red-40 h-40 w-9/10 flex flex-col gap-5">
                            <div className="shadow-md py-1 flex flex-col gap-3 justify-center items-center">
                                <p className="font-light text-lg">
                                    VIP Ticket price: 2000
                                </p>


                                <div className="flex flex-row gap-5">
                                  
                                    <button className="bg-darkPurple py- px-2 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                        <TiMinus className="size-7 text-white"/>
                                    </button>
                                        <span className="font-extrabold text-xl">10</span>
                                    <button className="bg-darkPurple py- px-2 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                        <TiPlus className="size-7 text-white"/>
                                    </button>
                                </div>


                            </div>
                             <div className="shadow-md py-1 flex flex-col gap-3 justify-center items-center">
                                <p className="font-light text-lg">
                                    Regular Ticket price: 1000
                                </p>


                                <div className="flex flex-row gap-5">
                                  
                                    <button className="bg-darkPurple py- px-2 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                        <TiMinus className="size-7 text-white"/>
                                    </button>
                                        <span className="font-extrabold text-xl">2</span>
                                    <button className="bg-darkPurple py- px-2 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                        <TiPlus className="size-7 text-white"/>
                                    </button>
                                </div>


                            </div>
                        </div>

                    </div>

                    {/* Total Container */}
                    <div className="bg-darkPurple w-3/4 p-4 text-center rounded-3xl shadow-2xl">
                        <span className="font-bold text-xl text-white">
                            Total: N22,000
                        </span>
                    </div>

                    {/* Form Container */}
                    <div className="w-9/10">
                        <form action="" className="bg-darkPurple h-100 flex flex-col justify-center items-center gap-8 rounded-sm">
                            <input type="text" placeholder="Name" className="border bg-white w-3/4 p-1 px-3 rounded-lg"/>
                            <input type="text" placeholder="Email" className="border bg-white w-3/4 p-1 px-3 rounded-lg"/>
                            <input type="text" placeholder="Phone Number" className="border bg-white w-3/4 p-1 px-3 rounded-lg"/>
                            <input type="text" placeholder="Address" className="border bg-white w-3/4 p-1 px-3 rounded-lg"/>
        
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