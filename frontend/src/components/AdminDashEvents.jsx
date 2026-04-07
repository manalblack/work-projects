import { useState } from "react"
import { supabase } from "../supabaseConnection";
import ScannedTicketsModal from "../pages/admin/features/ScannedTicketsModal";

export default function AdminDashEvents({allEvents, setAllEvents, id, image, title, description, date, location, time, regular_price, vip_price, current_event}){

    const [isExpanded, setIsExpanded] = useState(false);
    const [scannedTicketsModal, setScannedTickModal] = useState(false);


    // TODO: fix this function....
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

    const openScannedTicketsModal = (eventId) => {
        setScannedTickModal(true)
        // setEventId(eventId)
    }

    


    return (
        <div className="w-full md:w-9/10 px-5">
            <div key={id}
                className="h-auto w-full lg:w bg-ghostWhite shadow-md flex flex-col items-center p-2 gap-6 md:gap-8 lg:gap-4 rounded-sm">
                <div className="w-full bgwhite/50 rounded-sm aspect-video flex justify-center items-center">
                    <img src={image} alt="placeholder image" className="rounded-sm lg:h- h-60 shadow-md"/>
                </div>

                <div className="text-white bg-green-6 flex flex-col gap-3">
                    <h2 className="text-xl font-bold text-gray-700">{title}</h2>
                    <p className={`${isExpanded ? '' : 'line-clamp-4'} text-md text-gray-700`}>
                        {description || <span>No description found</span>}
                    </p>
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`${!description ? 'hidden' : 'flex'} mt-1 text-blue-600 font-medium hover:underline text-sm`}
                    >
                        {isExpanded ? 'Show Less' : 'Read More'}
                    </button>

                    <div className="flex flex-row gap-3 bg-red-00 w-full">
                    
                        <div className="flex flex-col gap-4 bg-red-0 mt-4 relative w-full">
                            <div className="bg-red-0 p-1 flex bg-gren-300 w-full flex-row justify-between gap-10">
                                
                                <span className="bg-white/50 w-1/2 text-gray-800 md:px-1 py-1 rounded-sm px-1 text-sm md:text- shadow-md">
                                    Date: {date}, Time: {time}
                                    <br />
                                    Venue: {location}
                                </span>
                                <div className="flex flex-col font-bold gap-5">
                                    <span className="bg-blue-300 px-1 py-1 rounded-sm">
                                        Regular N{regular_price}
                                    </span>
                                       <span className="bg-blue-300 px-1 py-1 rounded-sm">
                                        VIP N{vip_price || 0}
                                    </span>
                                </div>
                            </div>
                            {/* <div className="p-2 flex flex-row gap-5 ml-auto bg-blue-300 rounded-sm">
                                <label htmlFor="" className="font-bold">
                                    Current event
                                </label>
                                <input type="radio" checked={current_event} name='current-event-selection' onChange={()=> handelOngoingBox(id)}
                                className="w-5 shadow-lg"/>
                            </div> */}
                        </div>
                        {/* <div className="flex flex-col gap-5 mt-8 w-1/2 ">
                            <LightBtn onPress={() => aboutEventModal(event)}>About Event</LightBtn>
                            <LightPurpleBtn onPress={
                                () => buyTicketModal(event)}>
                                Buy Ticket
                            </LightPurpleBtn>
                        </div> */}

                    </div>

                </div>
                <button onClick={() => openScannedTicketsModal(id)}
                    className="px-2 py-1 bg-blue-200 text-white font-bold rounded-md shadow-md active:scale-85 hover:bg-blue-300 transition-all duration-300 ease-in-out">
                    get scanned tickets
                </button>
            </div> 
            {scannedTicketsModal && 
                <ScannedTicketsModal eventId={id} isOpen={scannedTicketsModal} setScannedTickets={setScannedTickModal}/>
            }
        </div>

    )
}