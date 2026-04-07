import { useState, useEffect } from "react"
import axios from 'axios';
import { supabase } from "../../../supabaseConnection";
import MiniLoading from "../../../components/admin-components/MiniLoading";
import AdminDashEvents from "../../../components/AdminDashEvents";
import ScannedTicketsModal from "./ScannedTicketsModal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


/* 
  TODO: 
    1- make sure every api endpoint is changed to the deployed version
    2- test everything, 
    3- handover to client is tomorrow
*/

export default function MainDash() {

    const [allEvents, setAllEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [soldOut, setSoldOut] = useState(false);
    const [eventPassed, setEventPassed] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [scannedTicketsModal, setScannedTickModal] = useState(false)
    const [eventId, setEventId] = useState('');
    const [scannedTicketsCount, setScannedTicketsCount] = useState(0)

    const API_URL = import.meta.env.VITE_API_URL;


    useEffect(() => {
            try {
                const fetchEvents = async () => {
                    // change this link to ngrok 
                    const response = await axios.get(`${API_URL}/admin/all-events`);

                    
                    setAllEvents(response.data);
                    const ongoingEvent = response.data.find(event => event.current_event === true);
    
                   console.log(ongoingEvent);
                    // local testing
                    //  const scannedTicketsResponse = await axios.get(`http://localhost:3001/admin/scanned-tickets/${ongoingEvent.id}`);

                    // Hosted endpoint
                    const scannedTicketsResponse = await axios.get(`${API_URL}/admin/scanned-tickets/${ongoingEvent.id}`);

                   const NumberOfScannedTickets = scannedTicketsResponse.data.ticketsData;

                   setScannedTicketsCount(NumberOfScannedTickets.length)
                   console.log(NumberOfScannedTickets);
                   
                    
                    //  Find the sold out / finished event
                    
                    if(response.data.length > 0) {
                        const soldOutEvent = response.data.filter(event => event.total_tickets === 0);
    
                        const eventStatus = soldOutEvent[0]?.total_tickets <= 0 ? true : false;
                        console.log(eventStatus);
                        setSoldOut(eventStatus);
                   
                    } else {
                        setSoldOut(null)
                    }
                    setLoading(false)

                }
    
                // Cleanup Current event id date passed
                const cleanupCurrentEvent = async () => {
                    const {data, error} = await supabase.rpc('update_expired_events')
    
                    if(error)  {
                        console.log('rpc function error', error);
                    }
                    console.log('rpc function data', data);
                }
    
                cleanupCurrentEvent();
                fetchEvents();
    
            } catch (error) {
                console.error('error when fetching events', error)
                
            }
        }, [])

    
    const openScannedTicketsModal = (eventId) => {
        setScannedTickModal(true)
        setEventId(eventId)
    }



    const ongoingEvent = allEvents.find(event => event.current_event === true);
    


    // loading state in the main content area only
    if(loading) {
        return <MiniLoading />
    }

    return (
        // parent 
        <div className="flex flex-col justify-center items-center gap-3 relative">
            {/* hero section */}
            <h1 className="text-3xl font-bold mb-3 absolute top-2 left-4">
                Current Event
            </h1>
            <div className="w-full bg-amber-00 flex flex-col justify-center items-center p-1 gap-10 mt-15">
                <div className="flex gap-10 lg:gap-20 bg- w-full flex-row flex-wrap justify-center items-center">
                    <div className="md:size-45 lg:w-70 size-35 bg-ghostWhite rounded-sm flex flex-col justify-center items-center gap-10 shadow-md hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out">
                        <h2 className="md:text-xl lg:text-3xl text-sm font-semibold text-gray-0">
                            Total tickets
                        </h2>
                        <h3 className="md:text-4xl lg:text-5xl text-2xl font-bold text-blue-00">
                            {ongoingEvent.total_tickets || 0}
                        </h3>
                    </div>

                   <div className="md:size-45 lg:w-70 size-35 bg-ghostWhite rounded-sm flex flex-col justify-center items-center gap-10 shadow-md hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out">
                        <h2 className="md:text-xl lg:text-3xl text-sm font-semibold text-gray-0">
                            sold tickets
                        </h2>
                        <h3 className="md:text-4xl lg:text-5xl text-2xl font-bold text-blue-00">
                            {ongoingEvent.sold_tickets || 0}
                        </h3>
                    </div>


                    {/* <div className="md:size-45 size-25 bg-ghostWhite rounded-sm flex flex-col justify-center items-center gap-10 shadow-md hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out">
                        <h2 className="md:text-xl font-semibold text-sm text-gray-0">
                            Scanned Tickets
                        </h2>
                        <h3 className="md:text-4xl text-2xl font-bold text-blue-00">
                            56
                        </h3>
                    </div> */}

                     <div className="md:size-45 lg:w-70 size-35 bg-ghostWhite rounded-sm flex flex-col justify-center items-center gap-10 shadow-md hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out">
                        <h2 className="md:text-xl lg:text-3xl text-sm font-semibold text-gray-0">
                            Scanned tickets
                        </h2>
                        <h3 className="md:text-4xl lg:text-5xl text-2xl font-bold text-blue-00">
                           {!scannedTicketsCount ? <AiOutlineLoading3Quarters className='size-7 animate-spin'/> : scannedTicketsCount}
                        </h3>
                    </div>

                
            </div>
               {ongoingEvent && 
                <div className="h-auto w-9/10 bg-ghostWhite flex  md:flex-row flex-col gap-3 p-2 rounded-sm shadow-md justify-between">

                    <div className="bg-red-40 flex justify-center items-center pt-">
                        <img src={ongoingEvent.image} alt="event image" className="rounded-sm lg:w-90 shadow-md"/>
                    </div>
                    
                    <div className="bg-blue-00 md:w-1/2 flex flex-col justify-center">

                       <div className="flex flex-col md:gap-4 gap">
                            <h2 className="md:text-2xl font-bold">
                                {ongoingEvent.title}
                            </h2>
                            <p className={`text-sm md:text-lg ${isExpanded ? 'line-clamp-none' : 'line-clamp-4'}`}>
                                {ongoingEvent.description}
                            </p>
                            <button onClick={() => setIsExpanded()}  className="mt-3 lg:mt-1 text-blue-600 font-semibold hover:text-blue-700 text-sm lg:text-lg flex items-center gap-1">
                                {isExpanded ? 'Show Less' : 'Read More'}
                            </button>
                       </div>

                       <div className="flex md:gap-10 gap-3 md:p-3">
                            <span className="text-sm lg:w-65 bg-red-00">
                                {ongoingEvent.event_date}
                                <br />
                                {ongoingEvent.location}
                            </span>

                            <ul className="flex flex-col gap-3 md:w-50 lg:w-40 bg-amber-60">
                                <li className="flex justify-between bg-blue-300 p-0.5 rounded-sm text-white font-bold">
                                    Regular 
                                    <span>
                                        {ongoingEvent.regular_price}
                                    </span>
                                    
                                </li>

                                <li className="flex justify-between bg-blue-300 text-white font-bold p-0.5 rounded-sm">
                                    VIP 
                                    <span>
                                        {ongoingEvent.vip_price}
                                    </span>
                                </li>
                            </ul>
                            {/* <span>
                                Regular {ongoingEvent.regular_price}
                                <br />
                                VIP {ongoingEvent.vip_price}
                            </span> */}
                       </div>
                       <div className="bg-green-00 w-full mt-3 flex justify-center items-center rounded-sm ">
                           <button onClick={() => openScannedTicketsModal(ongoingEvent.id)}
                            className="px-2 py-1 bg-blue-200 text-white font-bold rounded-md shadow-md active:scale-85 hover:bg-blue-300 transition-all duration-300 ease-in-out">
                                get scanned tickets
                           </button>
                       </div>

                    </div>
               </div>
               }

                
            </div>
            <div className="bg-red-0 grid grid-cols-1 md:grid-cols-2 md:place-items-center w-9/10 md:w-9/9 gap-10 mt-5">
                {allEvents.map((event) => (
                   <AdminDashEvents 
                    id={event.id} 
                    title={event.title}
                    description={event.description}
                    location={event.location}
                    date={event.date}
                    time={event.time}
                    regular_price={event.regular_price}
                    vip_price={event.vip_price}
                    image={event.image}
                    allEvents={allEvents}
                    setAllEvents={setAllEvents}
                    current_event={event.current_event}
                    />
                                
                ))}
            </div>
            {scannedTicketsModal && 
                <ScannedTicketsModal eventId={eventId} isOpen={scannedTicketsModal} setScannedTickets={setScannedTickModal}/>
            }
        </div>
    )
}