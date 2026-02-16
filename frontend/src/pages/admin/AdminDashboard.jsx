import Modal from "../../components/Modal"
import { useState, useEffect } from "react"
import { IoEllipsisVerticalCircle } from "react-icons/io5";
import { Link} from "react-router-dom";
import DUMMY_EVENTS from "../../testData";
import AllEvents from "../../components/admin-components/AllEvents";
import axios from 'axios';
import Loading from "../../components/Loading";
import { supabase } from "../../supabaseConnection";



// Add the event to the database and work on the number input fields they nee fixing

export default function AdminDashboard() {

    const [addEventModal, setAddEventModal] = useState(false);
    const [allEvents, setAllEvents] = useState([])
    const [loading, setLoading] = useState(true);
    // const [currentEvent, setCurrentEvent] = useState([]);
    const [soldOut, setSoldOut] = useState(false);
    const [eventPassed, setEventPassed] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    // fetching all events from database
    useEffect(() => {
        // setLoading(true);
        const todaysDate = new Date();

        try {
            const fetchEvents = async () => {
                // change this link to ngrok 
                const response = await axios.get(`${API_URL}/admin/all-events`);

                console.log(response.data);
                setAllEvents(response.data);
                // set the current event logic

            //    const ongoingEvent = response.data.filter(event => event.current_event === true) || [];
            //    setCurrentEvent(ongoingEvent[0]);
            const ongoingEvent = response.data.find(event => event.current_event === true);
            

            // check if the current event is passed or not

            // if(ongoingEvent[0]) {
            //     const eventDate = new Date(ongoingEvent[0].event_date);
            //     todaysDate.setHours(0, 0, 0, 0);

            //     if(eventDate < todaysDate) {
            //         setEventPassed(true);
            //     }
            // }
            

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



    const handelOngoingBox = async (eventId) => {

        console.log(eventId);
        
        const updatedEvents = allEvents.map((ev) => ({
            ...ev,
            current_event: ev.id === eventId // True for the one clicked, false for others
        }));

        try {
            const { error } = await supabase.rpc('set_single_current_event', { target_id: eventId });

                if(error) {
                    alert('failed to update current event');
                    console.log(error);
                    
                }
                setAllEvents(updatedEvents);
        } catch (error) {
            console.log('error when updating current event: ', error);
            
        }
    }



     const ongoingEvent = allEvents.find(event => event.current_event === true);
            


   if(loading) {
    return <Loading>
        Fetching data
    </Loading>
   }

    return (
        <>
            {/* wrapper */}
            <div className="h-screen w-full bg-lightPurple flex flex-col gap-3">

                <nav className="bg-lightPurple p-2  flex justify-center items-center shadow-md">
                    <div className="flex flex-row justify-center items-center gap-10 md:justify-between bg-green-00 md:w-3/4 md: pt-4 md:pb-2">
                        <button
                        className="bg-white px-3 py-1 font-bold rounded-2xl active:scale-85 hover:bg-darkPurple hover:text-white transition-all duration-300 ease-in shadow-md">
                           <Link to='/admin/add-events'>
                                Add Events
                           </Link>
                        </button>

                        <button
                        className="bg-white px-3 py-1 font-bold rounded-2xl active:scale-85 hover:bg-darkPurple hover:text-white transition-all duration-300 ease-in shadow-md">
                           <Link to='/admin/create-ticket'>
                                Create Ticket
                           </Link>
                        </button>


                        {/* Work on this button FUCKING fix it ASAP */}
                        <button
                        className="bg-white px-3 py-1 font-bold rounded-2xl active:scale-85 hover:bg-darkPurple hover:text-white transition-all duration-300 ease-in shadow-md">
                            <Link to='/admin/search-tickets'>
                                Find Ticket
                            </Link>
                        </button>
                        {/* <button className="bg-white px-3 py-1 font-bold rounded-2xl active:scale-85 transition-all duration-300 ease-in">
                            Add event
                        </button> */}
                        
                    </div>
                </nav>
                {/* parent component */}
                <div className="bg-lightPurple flex flex-col justify-center items-center gap-6 md:gap-10">
                    <h2 className="text-2xl text-gray-900 md:text-4xl font-bold">
                        Current Event 
                       
                    </h2>

                   {ongoingEvent && 
                     <div className="bg-darkPurple flex md:flex-row flex-col gap-8 w-9/10  md:w-3/4 p-3 rounded-sm items-center"> 
                     {/* <IoEllipsisVerticalCircle className="size-8 ml-auto text-white md:mr-auto self-start"/> */}
                        <div className="md:w-5/6 flex flex-col gap-2 justify-center items-center md:gap-8 md:h-full bg-red-30">
                            {/* <div className="bg-green-200 w-full flex md:mr-auto items-start">
                                <IoEllipsisVerticalCircle className="size-8 ml-auto text-white md:mr-auto"/>
                            </div> */}
                            <img src={ongoingEvent.image} alt="" className="rounded-sm shadow-md w-9/11 md:h-110"/>
                            <h3 className="text-white text-2xl">
                                Title: {ongoingEvent.title}
                            </h3>
                             {eventPassed && <span className="bg-white text-red-500 px-5 text-lg font-bold rounded-sm">Passed !</span>}
                            {ongoingEvent.total_tickets <= 0 && 
                                <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold uppercase">
                                    Sold Out / Finished
                                </span>}
                        </div>
                        {/* 2nd container */}
                        <div className="md:w-3/4 flex flex-col gap-3 justify-center items-center bg-green-00 md:gap-6">
                           
                            <p className="text-white leading-7 text-lg md:text-center"> Description: {ongoingEvent.description}
                            </p>
                            {/* Price / ticket count container */}
                            <div className="bg-white/70 flex flex-row justify-between p-2 rounded-sm shadow-lg ">
                                <div className="flex flex-col gap-2">
                                    <span className="font-bold">Vip Price: {ongoingEvent.vip_price}</span> 
                                    <span className="font-bold">
                                        Regular price: {ongoingEvent.regular_price}</span> 
                                </div>

                                <div className="flex flex-col gap-2 ">
                                    <span className="font-bold">
                                        Remaining Tickets: {ongoingEvent.total_tickets}
                                    </span>
                                    <span className="font-bold md:ml-5">
                                        Sold Tickets: {ongoingEvent.sold_tickets}
                                    </span>
                                </div>       
                            </div>
                            <div className="bg-white/70 flex flex-row justify-between p-2 rounded-sm shadow-md">
                                <span className="w-1/2 font-bold">
                                    Location: {ongoingEvent.location}
                                </span>
                                <div className="flex flex-col">
                                    <span className="font-bold">
                                        Time: {ongoingEvent.time}
                                    </span>
                                    <span className="font-bold">Date:     {ongoingEvent.event_date}</span>
                                </div>
                            </div>

                        </div>

                    </div>
                   }
                    <h3 className="text-3xl font-bold md:text-4xl">All Events</h3>
                    <div className="bg-red00 w-full py-5 grid grid-cols-1 md:grid-cols-2 place-items-center gap-6">
                    {allEvents.map((event) => (
                        <div key={event.id}  className="w-9/10 md:w- h- bg-darkPurple flex flex-col gap-4 p-2 rounded-sm shadow-lg">
                            <div>
                                <img src={event.image} alt=""  className="rounded-sm"/>
                            </div>
                            {/* inside this we need, title, description, date, location, time, the two tickets prices, remaining tickets */}
                            <div className="bg-red-0 flex flex-col gap-2">
                                <h2 className="text-xl font-bold text-white">Title: {event.title}</h2>
                                {event.total_tickets <= 0 && 
                                <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold uppercase">
                                    Sold Out / Finished
                                </span>}
                                <p className="leading-6 text-white">
                                    Description: {event.description}
                                </p>
                                <div className="bg-white/60 flex flex-row w-full justify-between gap-10 p-2 rounded-sm">
                                    <div className="flex flex-col gap-2.5 p-">
                                        Tickets Prices:
                                        <span className="font-bold">
                                            Vip: <span className="bg-darkPurple text-white px-2 rounded-xl py-1 font-extrabold text-lg">
                                                {event.vip_price}
                                            </span>
                                        </span>
                                        <span className="font-bold">
                                            Regular: <span className="bg-darkPurple text-white px-2 rounded-xl py-1 font-extrabold text-lg">
                                                {event.regular_price}
                                            </span>
                                        </span>
                                    </div>

                                    <div className="bg-amber-00 flex flex-col justify-center items-center gap-2 w-1/3">
                                       <div className="bg-green-00 flex flex-col justify-center items-center gap-1">
                                            <h3 className="font-bold">
                                                Remaining
                                            </h3>
                                            <span className="font-extrabold bg-darkPurple text-white px-3 py-1 rounded-xl text-lg">
                                                {event.total_tickets}
                                            </span>
                                        </div>

                                        <div className="flex flex-row gap-2">
                                            <label htmlFor="">Ongoing</label>
                                            <input type="radio" checked={event.current_event} name='current-event-selection' onChange={()=> handelOngoingBox(event.id)}  className="h-5 w-5"/>
                                        </div>
                                    </div>


                                </div>
                                
                                <div className="bg-lightPurple rounded-sm flex flex-row gap-4 p-2">
                                    <span className="font-semibold"> 
                                        location: {event.location}
                                    </span>
                                    <span className="font-semibold">
                                        Date: {event.event_date}
                                    </span>
                                </div>
                            </div>
                            
                        </div>
                    ))
                    }
                </div>
                </div>

            </div>
            <Modal isOpen={addEventModal} closeModal={() => setAddEventModal(false)}>
                
            </Modal>
        </>
    )
}