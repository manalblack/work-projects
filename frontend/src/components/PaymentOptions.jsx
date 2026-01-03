import { useState } from "react";
import LightBtn from "./LightBtn"
import LightPurpleBtn from "./LightPurpleBtn"
import { useNavigate } from "react-router-dom"
import {Link} from 'react-router-dom';
import Modal from "./Modal";
import { TiMinus, TiPlus } from "react-icons/ti";
import toast from 'react-hot-toast';


/* 
   UI IMPROVEMENTS ADD react hot toast instead of alerts 
*/


export default function PaymentOptions({eventData}) {

    const [addToCartModal, setAddToCartModal] = useState(false)


    const navigate = useNavigate()

    const handelPayNowBtn = () => {
        // console.log(eventId);
        
        // console.log(eventDetails);
        navigate('/checkout', {state: {directBuyItem: eventData}})
    }

    const handelAddToCartModal = () => {
        setAddToCartModal(true)
        console.log(eventData);
        
    }

    const handelAddToCart = (type) => {

        console.log(eventData);
        
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

         // Logic to prevent duplicates and only update the qty property
        const existingItemIndex = currentCart.findIndex((item) => item.id === eventData.id && item.type == type)

        if(existingItemIndex > -1) {
            currentCart[existingItemIndex].qty += 1
        } else {
            const newCartItem = {
            id: eventData.id,
            title: eventData.title,
            type: type,
            price: type === 'vip'? eventData.vip_price: eventData.regular_price,
            vipPrice: eventData.vip_price,
            regularPrice: eventData.regular_price,
            qty: 1
            }
            currentCart.push(newCartItem)
        }

        localStorage.setItem('cart', JSON.stringify(currentCart))

        toast.success('Ticket added to cart',{
            style: {
                padding:'20px',
                fontWeight: 'bold',
            }

        })

    }


    return(
        <div className="b h-60 w-9/10 flex flex-col justify-center items-center gap-6">
            <LightBtn onPress={handelPayNowBtn}>
                Pay Now ?
            </LightBtn>

            <h3 className="text-lg text-white font-bold">
                OR
            </h3>

            <LightPurpleBtn onPress={handelAddToCartModal}>
                Add To Cart
            </LightPurpleBtn>


        {/*  */}
            <Modal isOpen={addToCartModal} closeModal={() => setAddToCartModal(false)}>
                <div className="bg- size-70 flex flex-col gap-5 items-center p-2 md:w-9/10 w-full">
                    <div className="bg-white h-30 w-9/10 md:w-3/4 flex flex-col gap-3 items-center justify-center shadow-2xl px- rounded-md p-2">
                        <span className="w-1/2 font-bold bg-green-0 text-center text-xl">VIP: {eventData.vip_price}</span>
                        <div className="bg-blue-40 w-3/4 h-30 flex flex-col gap-8 items-center p-2">
                            {/* <span className="flex flex-row gap-5">
                                <button className="bg-lightPurple px-3 rounded-2xl">
                                    <TiPlus className=""/>
                                </button>
                                    <span className="font-bold">
                                        1
                                    </span>
                                <button className="bg-lightPurple px-3 rounded-2xl">
                                    <TiMinus />
                                </button>
                            </span> */}
                            <button onClick={() => handelAddToCart('vip')} className="bg-lightPurple px-4 rounded-2xl font-bold py-1 active:scale-95 transition-all duration-300 ease-in-out">
                                Add To Cart
                            </button>
                        </div>
                    
                    </div>

                    <div className="bg-white h-30 w-9/10 md:w-3/4 flex flex-col gap-3 items-center justify-center shadow-2xl px- rounded-md p-2">
                        <span className="w-3/4 text-center font-bold text-xl ">Regular: N{eventData.regular_price}</span>
                        <div className="bg-blue-40 w-3/4 h-30 flex flex-col gap-8 items-center p-2">
                            {/* <span className="flex flex-row gap-5">
                                <button className="bg-lightPurple px-3 rounded-2xl active:scale-95 transition-all duration-300 ease-in-out">
                                    <TiPlus className=""/>
                                </button>
                                    <span className="font-bold">
                                        1
                                    </span>
                                <button className="bg-lightPurple px-3 rounded-2xl">
                                    <TiMinus />
                                </button>
                            </span> */}
                            <button onClick={() => handelAddToCart('regular')}
                             className="bg-lightPurple px-4 rounded-2xl font-bold py-1 active:scale-90 transition-all duration-300 ease-in-out">
                                Add To Cart
                            </button>
                        </div>
                    
                    </div>
                </div>
            </Modal>
        </div>
    )
}