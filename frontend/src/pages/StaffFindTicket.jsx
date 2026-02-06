import { Link } from "react-router-dom"
import { useState } from "react";
import axios from 'axios';
import Loading from ".././components/Loading";



export default function StaffFindTicket() {

    const [ticketInfo, setTicketInfo] = useState([]);
        const [searchQuery, setSearchQuery] = useState('');
        const [loading, setLoading] = useState(false);
         const API_URL = import.meta.env.VITE_API_URL;
    
    
        const handelTicketSearch = async () => {
            setLoading(true);
            // const response = await axios.get(`${API_URL}/staff/find-ticket`, {
            //     params: {
            //         query: searchQuery,
            //     }
            // });

            const response = await axios.get(`http://localhost:3001/staff/find-ticket`, {
                params: {
                query: searchQuery,
            }
            });
        
    
            console.log(response.data);
            setTicketInfo(response.data);
            setLoading(false);
        }
    
    
    
        if(loading) {
            return <Loading>Searching for ticket</Loading>
        }

    return (
        <>
            <div className="mt-10 flex flex-col justify-center items-center gap-8 ">
                <h1 className="text-2xl font-bold">Enter customer name or email</h1>
                <div className='flex flex-col md:flex-row gap-15 md:gap-20 bg-blue-00 w-9/10  items-center pb-5'>
                    {/* search container */}
                
                    <div className="bg-darkPurple h-30 w-9/10 md:w-5/6 flex flex-col justify-center items-center rounded-sm shadow-md gap-5 mt-5">
                        <input type="text" placeholder="Search for a Ticket" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}  className="bg-white px-3 py-1 rounded-sm w-3/4 shadow-md text-lg"/>
                        <button onClick={handelTicketSearch}  className="bg-lightPurple px-2 py-1 rounded-xl shadow-md font-bold active:scale-85 transition-all duration-300 ease-in-out">
                            Find ticket
                        </button>
                    </div>

                    {/* result container */}
                    {/* <h3 className="text-2xl font-bold">Customer info</h3> */}
                    <div className="w-9/10 bg-gren-300 flex flex-col gap-20">
                       {ticketInfo.map((ticket) => (
                        <div key={ticket.id} className="bg-white p-2 flex flex-col gap-3 rounded-sm shadow-md md:w-5/5 h-50">
                            <h3 className="text-lg font-light">Customer Name: <span className="font-bold">
                                {ticket.customer_name}
                                </span></h3>

                            <p className="text-lg font-light">Customer Email: <span className="font-bold">{ticket.customer_email}</span></p>

                            <p className="text-lg font-light">Ticket status: <span className="font-bold">{ticket.is_scanned ? 'Ticket Scanned' : 'Not Scanned'}</span></p>

                            <p className="text-lg font-light">Ticket Type: <span className="font-bold">{ticket.type}</span></p>
                            <p className="font-light text-lg">
                                Scanned at: <span className="font-bold">{ticket.scanned_at ? `
                                ${ticket.scanned_at}` : 'Not scanned'} </span> </p>
                        </div>
                       ))}
                    </div>
                </div>
            </div>
        </>

    )
}