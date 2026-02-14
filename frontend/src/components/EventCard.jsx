import LightBtn from "./LightBtn";
import LightPurpleBtn from "./LightPurpleBtn";
import MiniOverlay from "./MiniOverlay";
import PriceContainer from "./PriceContainer";
import DUMMY_EVENTS from "../testData";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import PaymentOptions from "./PaymentOptions";
import { supabase } from "../supabaseConnection";







export default function EventCard() {

    const [aboutModal, setAboutModal] = useState(false);
    const [buyTicket, setBuyTicket] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState([])
    const [aboutPay, setAboutPay] = useState(false);
    const [allEvents, setAllEvents] = useState([])



    useEffect(() => {

        const testConnection = async () => {
            const { data, error } = await supabase
                .from('events')
                .select('*');

            console.log(data);

            setAllEvents(data); 
            
        }

        testConnection();
    }, [])

    const buyTicketModal = (eventData) => {
        console.log(eventData);
        setBuyTicket(true)
        setSelectedEvent(eventData)
    }

    const aboutEventModal = (eventData) => {
        console.log(eventData);
        setSelectedEvent(eventData)
        setAboutModal(true)
    }

    const handelAboutEventPayBtn = () => {
        setAboutPay(true)
    }
    

    return(
       <>
        {allEvents.map((event) => (
            <div key={event.id}
             className="md:w-120 w-90 bg-lightPurple flex flex-col justify-center items-center gap-2 p-2 rounded-sm shadow-lg flex-none h-80 md:h-100">

            <div className="relative flex justify-center items-center h-auto w-full md:h-120">
                <img src={event.image} alt="" className="w-auto rounded-sm shadow-lg h-75 md:h-70 w-full"/>
                <MiniOverlay>

                    <div className="bg-black/50 absolute bottom-0 left-0 w-full h-full flex flex-row justify-between md:gap-4 md:h ">

                        <div className="bg-blue-0 w-5/6 flex flex-col items-start p-2 gap-4 md:gap-2 mt-6 md:mt-18 pt-12 md:pt-15">
                            <h2 className="md:text-2xl  text-white font-bold">
                                {event.title}
                            </h2>
                            <p className="text-white font-light line-clamp-2">
                            {event.description}
                            </p>
                            <PriceContainer>
                                N{event.regular_price}
                            </PriceContainer>
                            {/* <span className="bg-white/50 text-gray-800 md:px-4 py-1 rounded-2xl px-2 text-sm md:text-lg ">
                                Remaining tickets: {event.total_tickets}
                            </span> */}
                            <span className="bg-white/50 text-gray-800 md:px-4 py-1 rounded-sm px-2 text-sm md:text-xl ">
                                {event.date}, {event.time}
                                <br />
                                Venue: 1234 Event center
                            </span>
                            
                        </div>
                        <div className="flex flex-col justify-center items-center p-2 gap-5 mt-20 bg-amber00 md:gap-8  md:mt-15">
                            <LightPurpleBtn onPress={() => aboutEventModal(event)}>
                                AboutEvent
                            </LightPurpleBtn>
                            <LightBtn onPress={() => buyTicketModal(event)}>
                                Book ticket
                            </LightBtn>
                        </div>

                    </div>

                </MiniOverlay>

            </div>
           
        </div> 
            ))}
        

            <div className="relative flex justify-center items-center overflow-hidden">
                <img src="/placeholder.jpg" alt="" className="w-auto h-80 md:h-auto md: w-5/6 rounded-sm shadow-lg"/>
            <MiniOverlay>

                <div className="bg-black/40 absolute bottom-0 left-0 w-full h-60  flex flex-row justify-between md:gap-8">

                    <div className="bg-blue- w-5/6 flex flex-col items-start p-2 gap-2">
                        <h2 className="text-2xl text-white font-bold">
                            Event name
                        </h2>
                        <p className="text-white font-light">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, ut.
                        </p>
                        <PriceContainer>
                            N2,000
                        </PriceContainer>
                        <div className="bg-red-0 p-1 flex flex-row gap-2">
                            <span className="bg-white/50 text-gray-800 md:px-4 py-1 rounded-sm px-2 text-sm md:text-lg ">
                                Date: Oct/10, Time: 10:00am
                                <br />
                                Venue: 1234 Event center
                            </span>
                            

                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center p-2 gap-5 mt-15 bg-gr-300 md:mt-0 md:gap-8">
                        <LightPurpleBtn onPress={aboutEventModal}>
                            AboutEvent
                        </LightPurpleBtn>
                        <LightBtn onPress={buyTicketModal}>
                            Book ticket
                        </LightBtn>
                    </div>

                </div>
            </MiniOverlay>

            </div>
        

            {/* modals section */}
            <Modal isOpen={aboutModal} closeModal={()=> setAboutModal(false)}>
                <img src={selectedEvent.image} alt="" className="w-9/10 rounded-sm shadow-xl"/>
                <div className="bg-green-30 size-65 w-9/10">
                    <p className="text-md text-white text-center">
                       {selectedEvent.description}
                    </p>
                </div>
                <div className="flex gap-8 mb-3">
                    <PriceContainer>
                       {selectedEvent.regular_price}
                    </PriceContainer>
                    <LightPurpleBtn onPress={handelAboutEventPayBtn}>
                        Buy ticket 
                    </LightPurpleBtn>
                </div>
            </Modal>

            <Modal isOpen={aboutPay} closeModal={() => setAboutPay(false)}>
                <PaymentOptions eventData={selectedEvent}/>
            </Modal>


            <Modal isOpen={buyTicket} closeModal={() => setBuyTicket(false)}>
                <PaymentOptions eventData={selectedEvent}/>
            </Modal>
       </>

    )
}