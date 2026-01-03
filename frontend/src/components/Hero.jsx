import Card from "./Card";
import Introduction from "./Introduction";
import MiniOverlay from "./MiniOverlay";
import LightBtn from './LightBtn';
import LightPurpleBtn from './LightPurpleBtn'
import PriceContainer from './PriceContainer'
import { useState } from "react";
import Modal from "./Modal";
import {useNavigate} from 'react-router-dom'
import PaymentOptions from "./PaymentOptions";
import {motion} from 'motion/react'


const heroEventId = 'hero1'

const currentEvent  = {
    id: 11,
    title: ' Black lights event',
    description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. ',
    vip_price: 5500,
    regular_price: 2000,
    date: 'Date: Oct/10', 
    time: '10:00am',
}

export default function Hero(){

    const [aboutModal, setAboutModal] = useState(false);
    const [buyTicket, setBuyTicket] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [aboutPay, setAboutPay] = useState(false);
    

    const aboutEventModal = () => {
        setAboutModal(true)
    }

    const buyTicketModal = () => {
        setBuyTicket(true)
    }

    const handelAboutEventPayBtn = () => {
        setAboutPay(true)
    }





    return(
        <Card>
            <motion.div
                initial={{opacity:0, y: 50}}
                whileInView={{opacity: 1, y: 0}}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{amount: 0.2 }}
             className="bg-red-0 w-full md:w-9/10 h-auto flex flex-col justify-center items-center p-2 md:p-6 gap-10">

                <div className="relative w-full md:w-9/10 group rounded-xl">
                    <img src="/placeholder.jpg" alt="" className="w-full rounded-sm shadow-lg h-90 md:h-150"/>
                    <MiniOverlay>
                        <div className="bg-black/40 text-white absolute bottom-0 left-0 w-full h-85 md:h-70 flex flex-row justify-between gap-8">
                            <div className="w-3/4 flex flex-col items-start gap-3 md:gap-5 bg-gray-00 p-2 mt-13 md:mt-0">
                               <h2 className="md:text-4xl font-bold text-lg">
                                    {currentEvent.title}
                                </h2> 
                                <p className="md:text-xl font-light text-sm">
                                   {currentEvent.description}
                                </p>
                                <PriceContainer>
                                    {currentEvent.regular_price}
                                </PriceContainer>
                                <span className="bg-white/50 text-gray-800 md:px-4 py-1 rounded-sm px-2 text-sm md:text-xl ">
                                {currentEvent.date}, {currentEvent.time}
                                <br />
                                Venue: 1234 Event center
                            </span>
                            </div>
                            <div className="bg-blue-0 h-40 md:h-50 w-40 md:w-60 flex flex-col justify-center items-center gap-5 md:gap-10 mt-40 md:mt-0">
                                <LightBtn onPress={aboutEventModal}>
                                    About Event
                                </LightBtn>
                                <LightPurpleBtn onPress={buyTicketModal}>
                                    Buy Ticket
                                </LightPurpleBtn>
                            </div>
                        </div>
                    </MiniOverlay>
                </div>
                <Introduction />
            </motion.div>
            {/* About Event Modal */}
           <Modal isOpen={aboutModal} closeModal={()=> setAboutModal(false)}>
                <img src="placeholder.jpg" alt="" className="w-9/10 rounded-sm shadow-xl"/>
                <div className="bg-green-30 size-70 w-9/10">
                    <p className="text-md text-white text-center">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ipsam magnam delectus reiciendis. Rerum illum harum distinctio voluptates nisi et at vero iure. Sit corporis nihil, doloribus non similique nesciunt.
                    </p>
                </div>
                <div className="flex gap-8">
                    <PriceContainer>
                        N4,000
                    </PriceContainer>
                    <LightPurpleBtn onPress={handelAboutEventPayBtn}>
                        Buy ticket
                    </LightPurpleBtn>
                </div>
           </Modal>
           <Modal isOpen={aboutPay} closeModal={() => setAboutPay(false)}>
                <PaymentOptions eventData={currentEvent}/>
            </Modal>
           

           {/* Buy Ticket Modal */}
           <Modal isOpen={buyTicket} closeModal={() => setBuyTicket(false)}>
                <PaymentOptions eventData={currentEvent}/>
           </Modal>
        </Card>
    )
}