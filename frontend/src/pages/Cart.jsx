import Navbar from '../components/Navbar'
import { TiMinus, TiPlus } from "react-icons/ti";
import LightBtn from '../components/LightBtn';
import { useState } from 'react';



const vipPrice = 3000;
const regularPrice = 1000

export default function Cart() {

    const [quantities, setQuantities] = useState({
        vip: 0,
        regular: 0
    })

    const handelFormSubmission = (e) => {
        e.preventDefault();
        console.log('form button working ok!!');
        alert('information submitted !!')
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

    const total = (quantities.vip * vipPrice) + (quantities.regular * regularPrice)


    return(
       <>
        <Navbar />

        <main className='w-full bg-lightPurple mt-14 pt-5 flex flex-col items-center gap-5 pb-5'>

            <div className='flex flex-col justify-center items-center gap-5 w-full'>
                <div className='h-45 w-9/10 bg-white p-2 flex flex-row items-center gap-4 rounded-sm'>

                    <div className='w-1/2 '>
                        <img src='/placeholder.jpg' alt="" />
                    </div>

                        <div className="bg-red-40 h- w1/2 flex flex-col gap-3">
                            <div className="shadow-md py-1 flex flex-col gap-3 justify-center items-center">
                                <p className="font-light text-">
                                    VIP Ticket: 2000
                                </p>


                                <div className="flex flex-row gap-5">
                                    
                                    <button onClick={() => handelDecrement('vip')}
                                     className="bg-darkPurple py- px-1 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                        <TiMinus className="size-5 text-white"/>
                                    </button>
                                        <span className="font-extrabold text-xl">{quantities.vip}</span>
                                    <button onClick={() => handelIncrement('vip')}
                                     className="bg-darkPurple py- px-1 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                        <TiPlus className="size-5 text-white"/>
                                    </button>
                                </div>


                            </div>
                            <div className="shadow-md py-1 flex flex-col gap-3 justify-center items-center">
                                <p className="font-light text-">
                                    Regular Ticket: 1000
                                </p>


                                <div className="flex flex-row gap-3">
                                    
                                    <button onClick={() => handelDecrement('regular')}
                                     className="bg-darkPurple py- px-1 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                        <TiMinus className="size-5 text-white"/>
                                    </button>
                                        <span className="font-extrabold text-xl">{quantities.regular}</span>
                                    <button onClick={() => handelIncrement('regular')}
                                     className="bg-darkPurple py- px-1 rounded-3xl shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                                        <TiPlus className="size-5 text-white"/>
                                    </button>
                                </div>


                            </div>
                        </div>
                </div>
            </div>

            <div className="bg-darkPurple w-3/4 p-4 text-center rounded-3xl shadow-2xl">
                <span className="font-bold text-xl text-white">
                    Total: N{total}
                </span>
            </div>

            {/* user information and monnify linking */}
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
        </main>
       </>
    )
}