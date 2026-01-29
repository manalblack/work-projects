import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {supabase} from '../supabaseConnection.js'
import Loading from "../components/Loading";
import { CiWarning } from "react-icons/ci";
import axios from 'axios'
import { useAuth } from "./admin/hooks/userAuth.jsx";


// This page should only open when a staff member scans a ticket



export default function Verify() {


    const [isLoggedStaff, setIsLoggedStaff] = useState(false);
    const [ticketStatus, setTicketStatus] = useState(true)
    const [isScanned, setIsScanned] = useState(false);
    const [verifyTicket, setVerifyTicket] = useState(false);
    const [scanningTime, setScanningTime] = useState(null)
    const [eventName, setEventName] = useState('')

    const { ticketId } = useParams();
    const [searchParams] = useSearchParams();
    const ticketType = searchParams.get('type');
    const {isStaff} = useAuth();
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const passKey = import.meta.env.VITE_ADMIN_PASS;


    const formatDate = (isoString) =>{

        const date = new Date(isoString)

        return new Intl.DateTimeFormat('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(date).replace(',', '@');


}

    useEffect(() => {
        // const pass = localStorage.getItem('pass');

        if (isStaff){
            setIsLoggedStaff(true);
        } else {
            setIsLoggedStaff(false);
        }

        // query the database to check the is_scanned and scanned_at columns 
         const checkTicketStatus = async () => {
            try {
                const {data, error} = await supabase.from('tickets').select('is_scanned, scanned_at, event_name').eq('id', ticketId).single();

                if(error) {
                    console.log('error checking ticket status in the db', error);
                }

                setScanningTime(data.scanned_at);
                setEventName(data.event_name);
                // checking ticket validity
                
                if(data.is_scanned === false) {
                    setTicketStatus(false);
                    
                } else if(data.is_scanned === true) {
                   setIsScanned(true);
                }

                setTicketStatus(false);
                
                console.log(data);   


            } catch (error) {
                console.log('error when checking ticket status', error);
                
            }
        }

        checkTicketStatus();
        
    }, [isLoggedStaff])

    const isVip = ticketType === 'vip';

    
    const handelTicketVerification = async () => {
            setVerifyTicket(true)
            try {
                  const response = await axios.post(`${API_URL}/staff/scan-tickets`, {
                    ticketId: ticketId,
                    bouncerId: passKey
                })
                if(response.data.message === 'SUCCESS'){
                    navigate('/success')
                };

                console.log(response);
                 
            } catch (error) {
                console.log('error when checking ticket status', error)
            };
    }
        
        
    

    if(ticketStatus) {
        return <Loading>Verifying Ticket Status</Loading>
    }
     if(verifyTicket) {
        return <Loading>Verifying Ticket validity</Loading>
    }

    return(
        <>
            
            {isScanned ? (
                <div className="bg-white flex flex-col justify-center items-center h-screen w-full gap-15">
                    <p className="text-red-400 font-bold text-3xl !!">
                        Ticket already scanned
                    </p>
                    <CiWarning className="size-35 text-red-500 animate-pulse"/>

                    <p className="text-2xl font-extrabold text-gray-700 underline">
                        Scanned at: {formatDate(scanningTime)}
                    </p>
                    
                </div>) : (
                    <div className={`h-screen w-full p-4 ${isVip ? 'bg-gray-600 text-yellow-400' : 'bg-white text-blue-800' } flex flex-col items-center justify-center gap-12`}>
                        <div className=" flex flex-col gap-15 md:w-3/4 w-full h-130 p-3 justify-center items-center shadow-xl">
                            <h1 className='text-4xl font-extrabold'>Verify Ticket</h1>
                            <h3 className=" text-2xl">Event Name: {eventName}</h3>
                            <p className="text-2xl">Category: <span className="font-extrabold">{ticketType.toUpperCase()}
                            </span>
                            </p>
 
                        <p className='text-sm'>Ticket id: {ticketId}</p>
                        {isLoggedStaff && 
                            <button onClick={handelTicketVerification}
                            className="bg-green-500 text-white px-6 text-lg py-1 rounded-2xl font-bold active:scale-85 transition-all duration-300 ease-in-out">
                                Verify
                            </button>
                        }
                        </div>
                    </div>
                )
            }

        </>
    )


}