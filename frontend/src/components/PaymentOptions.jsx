import LightBtn from "./LightBtn"
import LightPurpleBtn from "./LightPurpleBtn"
import { useNavigate } from "react-router-dom"


/* 
    my application doesn't have any user login or signup system is it possible to create a cart this way?
*/


export default function PaymentOptions({eventId}) {


    const navigate = useNavigate()

    const handelPayNowBtn = (eventDetails) => {
        console.log(eventDetails);
        
        // navigate('/checkout', {state: {directBuyItem: eventDetails}})
    }


    return(
        <div className="b h-60 w-9/10 flex flex-col justify-center items-center gap-6">
            <LightBtn onPress={() => handelPayNowBtn(eventId)}>
                Pay Now ?
            </LightBtn>

                <h3 className="text-lg text-white font-bold">
                    OR
                </h3>

            <LightPurpleBtn >
                Add To Cart
            </LightPurpleBtn>
        </div>
    )
}