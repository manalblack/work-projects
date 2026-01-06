import LightBtn from "../components/LightBtn";
import LightPurpleBtn from "../components/LightPurpleBtn";
import Navbar from "../components/Navbar";
import PriceContainer from "../components/PriceContainer";
import DUMMY_EVENTS from "../testData";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import PaymentOptions from "../components/PaymentOptions";
import Footer from '../components/Footer'
import { supabase } from "../supabaseConnection";



export default function Events() {

    // const [aboutModal, setAboutModal] = useState(false);
    const [buyTicket, setBuyTicket] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
   
    const [allEvents, setAllEvents] = useState([]); 


    useEffect(()=> {
        const fetchEvents = async () => {
            const { data, error } = await supabase
                .from('events')
                .select('*');   
                // TODO: add error handling
                setAllEvents(data);
            }


            fetchEvents();
    }, [])

    const buyTicketModal = (eventData) => {
        setBuyTicket(true)
        setSelectedEvent(eventData)
        
    }


    return(
       <>
        <Navbar />

        <div className="w-full bg-lightPurple flex flex-col gap-5">
              
           <div className="mt-14 pt-5 grid grid-cols-1 place-items-center gap-6 md:grid-cols-2">
                {/* Temporarily use this div as an event container Make the Event Card component Re-usable */}
                {allEvents.map((event) => (
                    <div key={event.id}
                     className="md:h-120 lg:h-150 h-130 w-9/10 md:w-5/6 lg:w-3/4 bg-darkPurple flex flex-col items-center p-2 gap-6 md:gap-8 rounded-sm ">
                    <div className="w-full md:w-9/10 bg-white/50 rounded-sm aspect-video">
                        <img src={event.image} alt="placeholder image" className="rounded-sm"/>
                    </div>
                    <div className="text-white w-full h-50 flex flex-col gap-4">
                        <h2 className="text-xl">{event.title}</h2>
                        <p>
                            {event.description}
                        </p>
                        <div className="flex flex-row gap-2 bg-red-3 ">
                           <div>
                                <PriceContainer>
                                    N{event.regular_price}
                                </PriceContainer>
                           </div>

                            <div className="flex flex-row gap-3">
                                {/* <LightBtn>About Event</LightBtn> */}
                                <LightPurpleBtn onPress={
                                    () => buyTicketModal(event)}>
                                    Buy Ticket
                                </LightPurpleBtn>
                            </div>
                        </div>

                        <div className="flex flex-row gap-2 bg-red-0">
                            <div className="bg-red-0 p-1 flex flex-row gap-2">
                            <span className="bg-white/50 text-gray-800 md:px-4 py-1 rounded-sm px-2 text-sm md:text-lg ">
                                Date: {event.date}, Time: {event.buyTicketModal}
                                <br />
                                Venue: {event.location}
                            </span>
                             {/* <span className="bg-white/50 text-gray-800 md:px-4 py-1 rounded-2xl px-2 text-sm md:text-lg ">
                                Date: Oct/10
                            </span> */}
                            
                        </div>
                        </div>
                    </div>
                </div> 
               
                ))}
           </div>
           {/* Modals sections */}
                <Modal isOpen={buyTicket} closeModal={() => setBuyTicket(false)}>
                    <PaymentOptions eventData={selectedEvent}/>
                </Modal>
            <Footer/>
        </div>
       </>
    )
}