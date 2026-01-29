import { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios';
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";


export default function CreateTicket(){

    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        ticketType: '',
        eventId: '',
    })
    const [selectedEventId, setSelectedEventId] =  useState('')
    const [pdfUrl, setPdfUrl] = useState('');
    const [loading, setLoading] = useState(false)

    // getting event name /id
    const selectedEvent = events.find(e => e.id === selectedEventId);
    const eventName = selectedEvent ? selectedEvent.title: '';

    const handelFormChange = (e) => {
        const {name, value} = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const API_URL = import.meta.env.VITE_API_URL;



    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/all-events`);

                console.log(response.data);
                setEvents(response.data)

            } catch (error) {
                console.log('error when fetching events: ', error);
                
            }
        }

        fetchEvents();
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(pdfUrl);
        toast.success('Link copied to clipboard')
    }

    const handelTicketCreation = async (e) => {
        e.preventDefault();

        if(formData.customerName == '' && formData.customerEmail == '' && formData.eventId == '' && formData.ticketType == '') {
            toast.error('Please fill out the form', {
                duration: 8000
            });
            return;
        }

        setLoading(true);

        const newTicket = {
            customerName: formData.customerName,
            customerEmail: formData.customerEmail,
            type: formData.ticketType,
            eventId: selectedEventId,
            eventName: eventName

        };

        // checking if inputs are empty 
        

        try {
            const response = await axios.post(`${API_URL}/admin/create-ticket`, {ticketInfo:
                newTicket});

                console.log(response);
                setPdfUrl(response.data);
               
                setLoading(false);
                setFormData({
                    customerName: '',
                    customerEmail: '',
                    ticketType: '',
                    eventId: '',
                });
                 toast.success('Ticket Created Successfully', {
                    duration: 6000
                })

        } catch (error) {
            console.log('Error when creating a ticket!: ', error);
            
        }

        console.log(newTicket);
        
        
    }

    if(loading) {
        return <Loading>Creating Ticket</Loading>
    }

    return( 
        // main wrapper 
        <div>
            {/* inner wrapper */}
                <div>
                    <nav className="bg-lightPurple p-2 flex flex-row shadow-md">
                    <div className="flex flex-row justify-center items-center gap-10 md:justify-between bg-green-00 md:w-3/4 md:">

                        <button className="bg-darkPurple text-white px-3 rounded-xl py-1">
                           <Link to='/admin/dashboard'>
                              Dashboard
                           </Link>
                        </button>
                        {/* <h2>Create Ticket</h2> */}
                    </div>
                </nav>
                <div className="flex flex-col justify-center items-center w-full gap-5 pb-5">
                    <h2 className="text-3xl mt-10">Create Ticket</h2>
                    <form action="" className="w-full flex justify-center items-center">
                        <div className='flex flex-col bg-darkPurple justify-center items-center gap-8 p- w-5/6 md: h-100 mt-10 md:w-110 rounded-sm shadow-md'>
                            <input type="text" className="bg-white px-3 py-1 rounded-sm shadow-md w-5/6" placeholder='Customer Name' name='customerName' value={formData.customerName} onChange={handelFormChange}/>

                            <input type="Email" className="bg-white px-3 py-1 rounded-sm shadow-md w-5/6" placeholder='Customer Email' name='customerEmail' value={formData.customerEmail} onChange={handelFormChange}/>

                           {/* <input type="text" className="bg-white px-3 py-1 rounded-sm" placeholder='Ticket type'/> */}
                           <select name="ticketType" id="" className="bg-white px-2 rounded-md shadow-md text-gray-700 py-1" value={formData.ticketType} onChange={handelFormChange}>
                                <option value="" disabled>Ticket type</option>
                                <option value='vip'>Vip</option>
                                <option value='regular'>Standard</option>
                           </select>

                            {/* <input type="text" className="bg-white px-3 py-1 rounded-sm" placeholder='Customer Name'/> */}
                            <label htmlFor="" className="text-white font-bold">
                                Choose an event
                            </label>
                            <select name="eventId" id="" className="bg-white px-2 text-gray-700 rounded-md shadow-md" value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)}>
                                <option value="" disabled>Select an event</option>
                                {events.map((event) => (
                                    <option key={event.id} value={event.id}>{event.title}</option>
                                ))}
                            </select>
                            <button onClick={handelTicketCreation}  className="bg-lightPurple px-2 py-0.5 rounded-xl font-bold shadow-md text-gray-800 active:scale-85 hover:bg-white transition-all duration-300 ease-in-out">
                                Create
                            </button>
                           
                        </div>
                    </form>
                    {pdfUrl && 
                        <div className="bg-darkPurple w-9/10 h-60 md:w-110 md:h-60 flex flex-col justify-center items-center gap-4 p-2 rounded-sm">
                        <button onClick={copyToClipboard}  className="bg-lightPurple font-bold text-gray-800 px-3 rounded-xl active:scale-85 hover:bg-white transition-all duration-300 ease-in-out">
                            Copy to clipboard
                        </button>
                        <iframe src={pdfUrl} frameborder="0" />
                        <a href={pdfUrl} download className="bg-white px-2 rounded-xl font-bold active:scale-85 hover:bg-lightPurple transition-all duration-300 ease-in-out text-gray-800">
                            Download ticket pdf
                        </a>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}