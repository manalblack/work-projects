import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";


// This page should only open when a staff member scans a ticket



export default function Verify() {


    const [isStaff, setIsStaff] = useState(false);
    const ticketIsScanned = false;

    const { ticketId } = useParams();
    const [searchParams] = useSearchParams();
    const ticketType = searchParams.get('type');

    // const pass = localStorage.getItem('pass')
    const passKey = 'EVENT_STAFF_TOKEN_2026';

    useEffect(() => {
        const pass = localStorage.getItem('pass');
        if (pass === passKey){
            setIsStaff(true);
            // database query here to check if a ticket is scanned or not
        } else {
            setIsStaff(false);
        }
    }, [])

    const isVip = ticketType === 'vip';

    {/* when the verify button is clicked, 1 it will mark the ticket as scanned in the db and then decrease the number of available tickets in the events table*/}
    const handelTicketVerification = () => {
        console.log('ticket scanned !!');
        
    }

    return(
        // <div className={`h-screen w-full p-4 ${isVip ? 'bg-gray-600 text-yellow-400' : 'bg-white text-blue-800' } flex flex-col items-center justify-center gap-12`}>            
        //     
        // </div>

        <>
            {ticketIsScanned ? (
                <div className="bg-white flex flex-col">
                    <p className="text-green-500 font-bold text-4xl">Ticket already scanned</p>
                    <p className="">Scanned at: 20:12</p>
                    
                </div>) : (
                    <div className={`h-screen w-full p-4 ${isVip ? 'bg-gray-600 text-yellow-400' : 'bg-white text-blue-800' } flex flex-col items-center justify-center gap-12`}>
                        <h1 className='text-4xl font-bold'>verify ticket</h1>
                            <p className="text-2xl">category: <span className="font-extrabold">{ticketType.toUpperCase()}
                            </span>
                        </p>

                        <p className='text-sm font-light'>Ticket id: {ticketId}</p>
                        {isStaff && 
                            <button onClick={handelTicketVerification}
                            className="bg-green-500 text-white px-6 text-lg py-1 rounded-2xl font-bold">
                                Verify
                            </button>
                        }
                    </div>
                )
            }

        </>
    )


}