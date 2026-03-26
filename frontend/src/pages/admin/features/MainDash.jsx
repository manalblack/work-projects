import { useState, useEffect } from "react"
import axios from 'axios';
import { supabase } from "../../../supabaseConnection";
import MiniLoading from "../MiniLoading";

// query tickets based on two conditions if paid to admin or bought from the website

export default function MainDash() {
    const [allEvents, setAllEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [soldOut, setSoldOut] = useState(false);
    const [eventPassed, setEventPassed] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;


    useEffect(() => {
            try {
                const fetchEvents = async () => {
                    // change this link to ngrok 
                    const response = await axios.get(`${API_URL}/admin/all-events`);
    
                    console.log(response.data);
                    setAllEvents(response.data);
                const ongoingEvent = response.data.find(event => event.current_event === true);
    
                   console.log(ongoingEvent);
                   
                    
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



    const ongoingEvent = allEvents.find(event => event.current_event === true);



    // loading state in the main content area only
    if(loading) {
        return <MiniLoading />
    }

    return (
        // parent 
        <div>
            {/* hero section */}
            <h1 className="text-3xl font-light mb-3">Current Event</h1>
            <div className="w-full h bg-amber-30 flex flex-col justify-center items-center p-1 gap-10">
                <div className="flex gap-6 bg-red-00 w-5/6 flex-row flex-wrap justify-center items-center">
                    <div className="md:size-45 size-35 bg-ghostWhite rounded-sm flex flex-col justify-center items-center gap-10 shadow-md hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out">
                        <h2 className="md:text-xl font-semibold text-gray-0">
                            Total tickets
                        </h2>
                        <h3 className="md:text-4xl text-2xl font-bold text-blue-00">
                            {ongoingEvent.total_tickets || 0}
                        </h3>
                    </div>

                    <div className="md:size-45 size-35 bg-ghostWhite rounded-sm flex flex-col justify-center items-center gap-10 shadow-md hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out">
                        <h2 className="md:text-xl font-semibold text-gray-0">
                            Sold Tickets
                        </h2>
                        <h3 className="md:text-4xl text-2xl font-bold text-blue-00">
                            {ongoingEvent.sold_tickets}
                        </h3>
                    </div>

                    <div className="md:size-45 size-35 bg-ghostWhite rounded-sm flex flex-col justify-center items-center gap-10 shadow-md hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out">
                        <h2 className="md:text-xl font-semibold text-gray-0">
                            Scanned Tickets
                        </h2>
                        <h3 className="md:text-4xl text-2xl font-bold text-blue-00">
                            {/* Create an endpoint and calculate it */}
                            56
                        </h3>
                    </div>

                    <div className="md:size-45 size-35 bg-ghostWhite rounded-sm flex flex-col justify-center items-center gap-10 shadow-md hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out">
                        <h2 className="md:text-xl font-semibold text-gray-0">
                            paid to admin
                        </h2>
                        <h3 className="md:text-4xl font-bold text-blue-00">
                            {/* Create an endpoint and calculate it from the tickets table */}
                            56
                        </h3>
                    </div>
                
            </div>
               {ongoingEvent && 
                <div className="h-auto w-9/10 bg-ghostWhite flex  md:flex-row flex-col gap-3 p-2 rounded-sm shadow-md justify-between">

                    <div className="bg-red-40 flex justify-center items-center pt-">
                        <img src={ongoingEvent.image} alt="event image" className="rounded-sm w-60"/>
                    </div>
                    
                    <div className="bg-blue-00 md:w-3/4 flex flex-col justify-center">

                       <div className="flex flex-col gap-6">
                            <h2 className="text-2xl font-bold">
                                {ongoingEvent.title}
                            </h2>
                            <p className={`text-sm ${isExpanded ? 'line-clamp-none' : 'line-clamp-4'}`}>
                                {ongoingEvent.description}
                            </p>
                            <button onClick={() => setIsExpanded(!isExpanded)}  className="mt-3 text-blue-600 font-semibold hover:text-blue-700 text-sm flex items-center gap-1">
                                {isExpanded ? 'Show Less' : 'Read More'}
                            </button>
                       </div>

                       <div className="flex gap-10 p-3">
                            <span className="text-sm">
                                {ongoingEvent.event_date}
                                <br />
                                {ongoingEvent.location}
                            </span>

                            <ul className="flex flex-col gap-3 w-50 bg-amber-60">
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

                            <span>
                                current button
                            </span>

                            {/* <span>
                                Regular {ongoingEvent.regular_price}
                                <br />
                                VIP {ongoingEvent.vip_price}
                            </span> */}
                       </div>

                    </div>
               </div>
               }

           
                
            </div>
        </div>
    )
}