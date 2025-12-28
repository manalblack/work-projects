import Card from "./Card";
import Introduction from "./Introduction";
import MiniOverlay from "./MiniOverlay";
import LightBtn from './LightBtn';
import LightPurpleBtn from './LightPurpleBtn'
import PriceContainer from './PriceContainer'
import { useState } from "react";
import Modal from "./Modal";



export default function Hero(){

    const [aboutModal, setAboutModal] = useState(false)


    const aboutEventModal = () => {
        setAboutModal(true)
    }

    return(
        <Card>
            <div className="bg-red-0 w-full md:w-9/10 h-auto flex flex-col justify-center items-center p-2 md:p-6 gap-10">

                <div className="relative w-full group overflow-hidd rounded-xl">
                    <img src="/placeholder.jpg" alt="" className="w-full rounded-sm shadow-lg h-80"/>
                    <MiniOverlay>
                        <div className="bg-black/40 text-white absolute bottom-0 left-0 w-full h-75 md:h-50 flex flex-row justify-between gap-8">
                            <div className="w-3/4 flex flex-col items-start gap-3 md:gap-5 bg-gray-00 p-2 mt-13 md:mt-0">
                               <h2 className="md:text-3xl font-bold text-lg">
                                    Black lights event
                                </h2> 
                                <p className="md:text-lg font-light text-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                                </p>
                                <PriceContainer>
                                    N3,000
                                </PriceContainer>
                                <span className="bg-white/50 text-gray-800 md:px-4 py-1 rounded-sm px-2 text-sm md:text-lg ">
                                Date: Oct/10, Time: 10:00am
                                <br />
                                Venue: 1234 Event center
                            </span>
                            </div>
                            <div className="bg-blue-2 h-40 md:h-50 w-40 md:w-60 flex flex-col justify-center items-center gap-5 md:gap-10 mt-10 md:mt-0">
                                <LightBtn onPress={aboutEventModal}>
                                    About Event
                                </LightBtn>
                                <LightPurpleBtn>
                                    Buy Ticket
                                </LightPurpleBtn>
                            </div>
                        </div>
                    </MiniOverlay>
                </div>
                <Introduction />
            </div>
           <Modal isOpen={aboutModal}/>
        </Card>
    )
}