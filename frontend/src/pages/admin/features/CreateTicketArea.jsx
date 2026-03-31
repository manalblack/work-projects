import Input from "../../../components/Input";
import { useState, useEffect } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import MiniLoading from "../../../components/admin-components/MiniLoading";


export default function CreateTicketArea() {

    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] =  useState('')
    const [pdfUrl, setPdfUrl] = useState('');

    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        ticketType: '',
        eventId: '',
    })

     // getting event name /id
    const selectedEvent = events.find(e => e.id === selectedEventId);
    const eventName = selectedEvent ? selectedEvent.title: '';

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

    const handelFormChange = (e) => {
        const {name, value} = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
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


    const copyToClipboard = () => {
        navigator.clipboard.writeText(pdfUrl);
        toast.success('Link copied to clipboard')
    }


    if (loading) {
        return <MiniLoading />
    }

    return(
       <div className="w-full mt-5 p-3 flex flex-col md:flex-row justify-center items-center gap-20 bg-green00">
            <form action="" className="md:w-1/2 lg:w-110 w-9/10 p-3 flex items-center justify-center bg-blue-200 shadow-md rounded-sm mb-5">
                <div className="flex flex-col justify-center items-center gap-5 h- w-9/10 pb-10">
                    <Input 
                        label="Email Address"
                        type="email"
                        placeholder="admin@dashboard.com"
                        value={formData.customerEmail}
                        onChange={handelFormChange}
                        name="customerEmail"
                    />
                    <Input 
                        label="Name"
                        type="text"
                        placeholder="admin@dashboard.com"
                        value={formData.customerName}
                        onChange={handelFormChange}
                        name='customerName'
                    />
                    <select name="ticketType" id="" className="bg-white px-2 rounded-md shadow-md text-gray-700 py-1" value={formData.ticketType} onChange={handelFormChange}>
                        <option value="" disabled>Ticket type</option>
                        <option value='vip'>Vip</option>
                        <option value='regular'>Standard</option>
                    </select>
                    <label htmlFor="" className="text-white font-bold">
                        Choose an event
                    </label>
                    <select name="eventId" id="" className="bg-white px-2 text-gray-700 rounded-md shadow-md" value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)}>
                        <option value="" disabled>Select an event</option>
                        {events.map((event) => (
                            <option key={event.id} value={event.id}>{event.title}</option>
                        ))}
                    </select>
                    <button onClick={handelTicketCreation}  
                    className="bg-ghostWhite px-4 py-1.5 rounded-lg font-bold shadow-md text-gray-800 active:scale-85 hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out">
                        Create
                    </button>

                </div>
            </form>

            {pdfUrl && 
                <div className="bg-ghostWhite shadow-md w-75 h-100 md:w-100 md:h-80 flex flex-col justify-center items-center gap-4 p-3 rounded-sm">
                <button onClick={copyToClipboard}  className="bg-blue-300 font-bold text-white px-3 py-1 rounded-xl active:scale-85 hover:bg-blue-200 transition-all duration-300 ease-in-out">
                    Copy to clipboard
                </button>
                <div className="relative w-full aspect-video sm:aspect-square md:aspect-video p-3">
                    <iframe src={pdfUrl} frameborder="0" className="absolute top-0 left-0 w-full h-full rounded-md"/>
                </div>
                <a href={pdfUrl} download className="bg-blue-300 px-2 py-1 rounded-xl font-bold active:scale-85 hover:bg-blue-200 text-white transition-all duration-300 ease-in-out">
                    Download ticket pdf
                </a>
            </div>
            }
       </div>
        
    )
} 