import Card from "./Card";
import Introduction from "./Introduction";
import MiniOverlay from "./MiniOverlay";
import LightBtn from './LightBtn';
import LightPurpleBtn from './LightPurpleBtn'
import PriceContainer from './PriceContainer'
import { useState, useEffect } from "react";
import Modal from "./Modal";
import {useNavigate} from 'react-router-dom'
import PaymentOptions from "./PaymentOptions";
import {motion} from 'motion/react'
import {supabase} from '../supabaseConnection.js'


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
    const [ongoingEvent, setOngoingEvent] = useState([])
    

    const aboutEventModal = () => {
        setAboutModal(true)
    }

    const buyTicketModal = () => {
        setBuyTicket(true)
    }

    const handelAboutEventPayBtn = () => {
        setAboutPay(true)
    }

     useEffect(() => {
        try {
            const fetchCurrentEvent = async () => {
                const {data, error} = await supabase.from('events').select('*').eq('current_event', true)

                if(error){
                    console.error('error fetching current event', error)
                }

                setOngoingEvent(data[0])
                console.log(data[0])
                
            }

            fetchCurrentEvent();


        } catch (error) {
            console.log('error fetching current even from db', error);
            
        }
     }, [])




    return(
        <Card>
            <motion.div
                initial={{opacity:0, y: 50}}
                whileInView={{opacity: 1, y: 0}}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{amount: 0.2 }}
             className="bg-red-0 w-full md:w-9/10 h-auto flex flex-col justify-center items-center p-2 md:p-6 gap-10">

                <div className="relative w-full md:w-9/10 group rounded-xl">
                    <img src={ongoingEvent.image} alt="" className="w-full rounded-sm shadow-lg h-90 md:h-150"/>
                    <p>
                        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam quae, rem suscipit inventore aliquid, animi tempore ut quas nostrum totam cupiditate. Natus ipsa quo aut voluptatibus numquam odit, tempore eius! */}
                    </p>
                    <MiniOverlay>
                        <div className="bg-black text-white absolute bottom-0 left-0 w-full h-full md:h-90 flex flex-row justify-between gap-4">
                            <div className="w-5/6 flex flex-col items-start gap-5 md:gap-5 bg-gray-4 h-80 p-1 mt-15 md:mt-0 bg-green-00">
                               <h2 className="md:text-4xl font-bold text-lg">
                                    {ongoingEvent.title}
                                </h2> 
                                <p className="md:text-xl font-light text-sm line-clamp-2 text-white">
                                   {ongoingEvent.description}
                                </p>
                                <PriceContainer>
                                    {ongoingEvent.regular_price}
                                </PriceContainer>
                                <span className="bg-white/50 text-gray-800 md:px-4 py-1 rounded-sm px-2 text-sm md:text-xl ">
                                {ongoingEvent.date}, {ongoingEvent.time}
                                <br />
                                Venue: 1234 Event center
                            </span>
                            <span className="bg-white/50 text-gray-800 md:px-4 py-1 rounded-2xl px-2 text-sm md:text-lg md:w-3/4 w-full">
                                Remaining tickets: {ongoingEvent.total_tickets}
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
                <div className="bg-green-30 size-70 w-5/6">
                    <p className="text-md text-white text-center ">
                        {ongoingEvent.description}
                    </p>
                </div>
                <div className="flex gap-8 mb-2">
                    <PriceContainer>
                        N4,000
                    </PriceContainer>
                    <LightPurpleBtn onPress={handelAboutEventPayBtn}>
                        Buy ticket
                    </LightPurpleBtn>
                </div>
           </Modal>
           <Modal isOpen={aboutPay} closeModal={() => setAboutPay(false)}>
                <PaymentOptions eventData={ongoingEvent}/>
            </Modal>
           

           {/* Buy Ticket Modal */}
           <Modal isOpen={buyTicket} closeModal={() => setBuyTicket(false)}>
                <PaymentOptions eventData={ongoingEvent}/>
           </Modal>
        </Card>
    )
}