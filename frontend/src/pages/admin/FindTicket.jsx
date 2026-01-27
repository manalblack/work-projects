import { Link } from "react-router-dom"
import { useState } from "react";
import axios from 'axios';
import Loading from "../../components/Loading";



export default function FindTicket() {

    const [ticketInfo, setTicketInfo] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);


    const handelTicketSearch = async () => {
        setLoading(true);
        const response = await axios.get('https://p846l2pq-3001.uks1.devtunnels.ms/api/admin/find-ticket', {
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
            <nav className="bg-lightPurple shadow-md py-2 px-5 flex flex-row justify-between">
                <button className="bg-darkPurple text-white px-3 font-bold rounded-xl py-1 shadow-md active:scale-85 transition-all duration-300 ease-in-out">
                    <Link to='/admin'>
                        Dashboard
                    </Link>
                </button>
            </nav>
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

                            <p className="text-lg font-light">Ticket status: <span className="font-bold">{ticket.is_scanned ? 'Ticket Scanned' : 'NotScanned'}</span></p>

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