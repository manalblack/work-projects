import Input from "../../../components/Input";
import { Link } from "react-router-dom"
import { useState } from "react";
import axios from 'axios';


export default function FindTicketArea() {

    const [ticketInfo, setTicketInfo] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;

    const handelTicketSearch = async () => {

        setLoading(true);
        const response = await axios.get(`${API_URL}/admin/find-ticket`, {
            params: {
                query: searchQuery,
            }
        });

        
        console.log(response.data);
        setTicketInfo(response.data);
        setLoading(false);
    }




    return(
        <div className="bg-blue-0 flex flex-col md:flex-row md:justify-center items-center gap-30 w-full">
            <div className="bg-blue-200 w-9/10 mt-10 md:w-100 h-70 md:mt-5 shadow-lg rounded-md flex flex-col justify-center items-center gap-10">
                <h2 className="md:text-2xl">
                    Enter customer name or Email
                </h2>
                <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}  />
                <button onClick={handelTicketSearch}
                    className="bg-ghostWhite text-gray-700 px-2 py-1 rounded-sm font-bold hover:bg-blue-300 hover:text-white shadow-md active:scale-85 transition-all duration-300 ease-in">
                    search
                </button>
            </div>
            <div className="bg-gren-300 flex flex-col justify-center items-center gap-10 mt-5">
                {ticketInfo.map((ticket) => (
                <div key={ticket.id} className="bg-white p-2 flex flex-col gap-3 rounded-sm shadow-md md:w-auto w-9/10 h-70">
                    <h3 className="text-lg font-light">Customer Name: <span className="font-bold">
                        {ticket.customer_name}
                        </span></h3>
                     <p className="text-lg font-light">Event name: <span className="font-bold">{ticket.event_name}</span></p>


                    <p className="text-lg font-light">Customer Email: <span className="font-bold">{ticket.customer_email}</span></p>

                    <p className="text-lg font-light">Ticket status: <span className="font-bold">{ticket.is_scanned ? 'Ticket Scanned' : 'Not Scanned'}</span></p>

                    <p className="text-lg font-light">Ticket Type: <span className="font-bold">{ticket.type}</span></p>
                    {/* <p className="font-light text-lg">
                        Scanned at: <span className="font-bold">{ticket.scanned_at ? `
                        ${ticket.scanned_at}` : 'Not scanned'} </span> 
                    </p> */}

                </div>
                ))}
            </div>
        </div>
    )
}