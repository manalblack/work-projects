import Overlay from "../../../components/Overlay";
import {motion, AnimatePresence} from 'motion/react'
import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";




export default function ScannedTicketsModal({eventId, isOpen, setScannedTickets}) {

    const[loading, setLoading] = useState(false);
    const[numberOfScannedTickets, setNumberOfScannedTickets] = useState(0);
    const[eventName, setEventName] = useState('');
 
    
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {

        const getScannedTickets = async () => {

            try {
                if(eventId && isOpen) {
                    const response = await axios.get(`${API_URL}/admin/scanned-tickets/${eventId}`);
    
                    console.log(response.data);
                    
                    const ticketsList = response.data.ticketsData;

                   if (ticketsList.length > 0) {

                        setNumberOfScannedTickets(response.data.ticketsData.length);

                        // setEventName(ticketsList.event_name[0]);
                   }

                    // console.log(ticketsList.event_name[0]);
                

                    console.log(ticketsList.length);

                };

                setLoading(true);

            } catch (error) {
                console.log('error when trying to fetch scanned tickets', error);
                
            }
        }

        getScannedTickets();
    }, [])

    const closeModal = () => {
        setScannedTickets(false);
    };



    // if(loading) {
    //     return <div className="bg-green-200 h-screen">
    //         <h2>...fetching scanned tickets</h2>
    //         <MiniLoading />
    //     </div>
    // }

    return (
        <AnimatePresence>
            <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
                <Overlay closeOverlay={closeModal}/>
                <motion.div
                    initial={{scale: 0.9, opacity: 0, y: 20}}
                    animate={{scale: 1, opacity: 1, y: 0}}
                    exit={{scale:0.9, opacity: 0, y: 20}}
                    transition={{type: 'spring', duration: 0.5}}
                    className="bg-ghostWhite w-5/6 md:w-1/2 m-auto md:h- h-60 z-999 flex flex-col justify-center items-center p-1 gap-10 rounded-sm">
                    {/* <h2 className="text-l">
                        Are you sure of the changes you just made?
                    </h2>
                    <div className="bg-blue-00 flex gap-12">
                        <button
                            className="bg-green-200 px-4 py-1.5 border border-green-500 font-bold text-gray-800 rounded-md active:scale-85 hover:bg-green-300 transition-all duration-300 ease-in-out">
                            Confirm
                        </button>
                        <button
                            className="bg-red-200 px-4 py-1.5 border border-red-500 font-bold text-gray-800 rounded-md active:scale-85 hover:bg-red-300 transition-all duration-300 ease-in-out">
                            cancel
                        </button>
                    </div> */}
                    {!loading ? 
                    <div className="bg-ghostWhite flex flex-col justify-center items-center w-full h-full">
                        <h2>
                            Loading scanned Tickets
                        </h2>
                        <AiOutlineLoading3Quarters className="size-20 text-blue-300 animate-spin transition-all"/>
                    </div> : 
                    <div className="bg-blue-00 w-full h-full flex flex-col justify-center items-center gap-12">
                        <h2 className="text-2xl">
                            Number of scanned Tickets: 
                        </h2>
                        <span className="text-4xl font-extrabold">
                            {numberOfScannedTickets}
                        </span>
                    </div>}
                </motion.div>
            </div>
        </AnimatePresence>
    )
}