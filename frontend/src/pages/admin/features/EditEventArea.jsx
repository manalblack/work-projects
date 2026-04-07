import { useState, useEffect } from "react"
import axios from 'axios';
import { supabase } from "../../../supabaseConnection";
import MiniLoading from "../../../components/admin-components/MiniLoading";
import AdminDashEvents from "../../../components/AdminDashEvents";
import Input from "../../../components/Input";
import DatePicker from "react-datepicker";
// IMPORTANT: You must import the CSS or the calendar will look broken
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../../../components/Modal";
import Overlay from "../../../components/Overlay";
import {motion, AnimatePresence} from 'motion/react'
import imageCompression from 'browser-image-compression';
import toast from "react-hot-toast";


// keep testing 



export default function EditEventArea() {

    // loading states
    const [loading, setLoading] = useState(true);
    const [loadingEventDetails, setLoadingEventDetails] = useState(false);
    const [initialPageLoad, setInitialPageLoad] = useState(true);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const [allEvents, setAllEvents] = useState([]);
    const [eventId, setEventId] = useState('');
    const [isConfirmationModel, setIsConfirmationModal] = useState(false);
    // states for from editing and image change.
    const [imageFile, setImageFile] = useState(null)
    const [eventDate, setEventDate] = useState('');

    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        eventTitle: '',
        eventDescription: '',
        eventLocation: '',
        totalTickets: 0,
        vipPrice: 0,
        regularPrice: 0
    });
    const [confirmDelete, setConfirmDelete] = useState(false);

    // CHANGE TO THIS BEFORE DEPLOYMENT
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        try {

            const fetchEvents = async () => {
                // change this link to ngrok 
                const response = await axios.get(`${API_URL}/admin/all-events`);

                console.log(response.data);

                setAllEvents(response.data);
                setLoading(false)
                        

            }

            fetchEvents();
        } catch (error) {
            console.error('error when fetching events', error)
            
        }
    }, [])


    const compressImage = async (file) => {
        const options = {
            maxSizeMB: 2,          // Aim for 1MB
            maxWidthOrHeight: 1920, // Resize if it's a massive 4K photo
            useWebWorker: true     // Keeps the UI from freezing during compression
        }
        const compressedFile = await imageCompression(file, options);

        const finalFile = new File([compressedFile], file.name, {
            type: compressedFile.type,
            lastModified: Date.now(),
        });

        setImageFile(finalFile);

        setImagePreview(URL.createObjectURL(finalFile));
    };

    const handelImageFile = async (e) => {

        const selectedFile = e.target.files[0];
        if(selectedFile) {
            compressImage(selectedFile)
        }
        // setImageFile(URL.createObjectURL(e.target.files[0]));
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const openEditingForm = async () => {

        setInitialPageLoad(false);
        setLoadingEventDetails(true);

        console.log(eventId);

        try {

            const response = await axios.get(`${API_URL}/admin/retrieve-event/${eventId}`);

            console.log(response.data);
            
            const pulledEvent = response.data;

            setFormData({
                eventTitle: pulledEvent.title,
                eventDescription: pulledEvent.description,
                eventLocation: pulledEvent.location,
                totalTickets: pulledEvent.total_tickets,
                vipPrice: pulledEvent.vip_price,
                regularPrice: pulledEvent.regular_price
            });

            setImagePreview(pulledEvent.image);

            // setImageFile(pulledEvent.image);

            setEventId(pulledEvent.id);
            

        // date and time processing 
        const combinedDateTime = `${pulledEvent.event_date}T${pulledEvent.time}`
        const initialDate = new Date(combinedDateTime)

        setEventDate(initialDate)


            setLoadingEventDetails(false);
        } catch (error) {
            console.log('error when sending event id to the backend', error);
            
        }
        
    }

    const openConfirmationModel = (e) => {

        e.preventDefault();

        setIsConfirmationModal(true);

    }

    const closeModal = () => {
        setIsConfirmationModal(false)
    };

    const updateEvent = async () => {

        console.log(imageFile);
        console.log(eventId);
        

        setLoadingUpdate(true);

        //  1 slice and format the date and time 
        const updatedDate = eventDate.toISOString().split('T')[0]; // "2026-04-02"
        const updatedTime = eventDate.toTimeString().split(' ')[0].slice(0, 5); // "18:30"
        
        // 2 Process image file 
        let imageUrlToSave = imagePreview;
            // TODO: FIX THE IMAGE UPLOAD PART IT'S ONLY WORKING WITH NEW IMAGES AND NOT THE EXISTING ONE.

            // const fileName = `eventImage-${imageFile.name}`

            if(imageFile) {

                const fileName = `eventImage-${imageFile.name}`;

                const { data, error } = await supabase.storage
                .from('events_images')
                .upload(fileName, imageFile, {
                    contentType: 'img/*'
                });

                if (error) throw error;

                // Get the public url to save image to database
                const { data: publicData } = supabase.storage
                    .from('events_images')
                    .getPublicUrl(fileName);
                    
                imageUrlToSave = publicData.publicUrl;

            }
            

            

        try {

            // create a new object that contains all the updated event data to send it to db
            const updatedEvent = {
                title: formData.eventTitle,
                event_date: updatedDate,
                time: updatedTime,
                location: formData.location,
                image: imageUrlToSave,
                total_tickets: formData.totalTickets,
                regular_price: formData.regularPrice,
                vip_price: formData.vipPrice,
                description: formData.description,
            } 

            const response = await axios.patch(`${API_URL}/admin/edit-event/${eventId}`, {updatedEvent});

            console.log(response);
            
            setIsConfirmationModal(false);

            setLoadingUpdate(false);
            
            console.log('event updated !!!!');
            toast.success('Event updated successfully!')
            
        } catch (error) {
            console.log('error when trying to update event data', error);
            
        }
       
        
    }

    const openConfirmDeleteModal = (e) => {
        e.preventDefault();
        setConfirmDelete(true);
    }

     const closeConfirmDeleteModal = (e) => {
        e.preventDefault();
        setConfirmDelete(false);
    }

    const deleteEvent = async () => {
        setLoadingDelete(true)
        try {
            const response = await axios.delete(`${API_URL}/admin/delete-event/${eventId}`);

            console.log(response);
            if(response.status === 200) {
                setFormData({
                    eventTitle: '',
                    eventDescription: '',
                    eventLocation: '',
                    totalTickets: 0,
                    vipPrice: 0,
                    regularPrice: 0
                })
                setImagePreview(null);
                setImageFile(null);
                setEventDate('');
            }
            setConfirmDelete(false)
            setLoadingDelete(false);

            toast.success('Event deleted successfully!')
            
        } catch (error) {
            console.log('error when deleting event', error);
            
        }
    }

    if (loading) {
        return <MiniLoading />;
    };

    if(loadingEventDetails) {
        return (
            <div>
                <h2>
                    loading event data
                </h2>

                <MiniLoading />
            </div>
        )
        // console.log(eventDetails.title);
    }

    if(loadingDelete) {
        return (
            <div>
                <h2>
                    Deleting event from database
                </h2>
                <MiniLoading />
            </div>
        )
    }

    if (loadingUpdate) {
        return (
            <div className='h-screen w-full flex flex-col justify-center items-center'>
                <h2 className="text-2xl font-bold">
                    updating event
                </h2>
                <MiniLoading />
            </div>
        )
    }



    return(
        <>
            {initialPageLoad ? ( 
                <div className="bg-blue-200 md:w-1/2 w-9/10 h-50 m-auto mt-5 flex flex-col justify-center items-center gap-6 rounded-sm">
                    <label for="countries" class="block mb-2.5 text-sm font-medium text-heading">
                        Select an event to edit
                    </label>
                    {/* initial event id is set */}
                    <select id="countries" value={eventId} onChange={(e) => setEventId(e.target.value)}
                     class="block w-3/4 px-3 py-2 bg-ghostWhite shadow-md rounded-sm placeholder:text-body">
                        <option value="" disabled>Select an event</option>
                        {allEvents.map((event) => (
                            <option key={event.id} value={event.id}>
                                {event.title}
                            </option>
                        ))}
                    </select>
                    {/* This button sends the event id to the endpoint */}
                    <button onClick={openEditingForm}
                     className="bg-blue-300 px-4 py-1 text-white font-bold rounded-lg shadow-md text-xl active:scale-85 hover:bg-white hover:text-blue-300 transition-all duration-300 ease-in-out ">
                        Edit
                    </button>
                </div>) : (

                <div className="m-auto md:w-3/4 h-auto p-3">
                    <form className="bg-amber-00 flex flex-col justify-center items-center w-full">
                        <div className="bg-blue-200 p-4 flex flex-col justify-center items-center gap-5 rounded-sm">
                            <Input value={formData.eventTitle} name='eventTitle' onChange={handleChange}
                                placeholder='event title'
                            />
                            <textarea value={formData.eventDescription} name='eventDescription' onChange={handleChange}
                            placeholder="Description" className="w-9/10 bg-white px-2 py-2 h-30 rounded-sm shrink-0 resize-none shadow-md transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50"/>
                            <div className="flex flex-col gap-2 max-w-sm bg-blue-00">
                                <label className="font-bold text-white">Choose Date & Time</label>
                                <DatePicker selected={eventDate} onChange={(e) => setEventDate(e)}  
                                showTimeSelect withPortal dateFormat="Pp"
                                className="bg-white px-2 rounded-sm shadow-md w-60"/>
                            </div>

                            <Input name='eventLocation' value={formData.eventLocation} onChange={handleChange} placeholder='location'/>

                            <label className="text-white font-bold text-xl">Current image</label>
                            <img src={imagePreview} alt=""  className="w-120 rounded-sm"/>
                            <label htmlFor="" className="text-white font-bold text-xl">Select image</label>
                            <Input type="file" accept='image/*' onChange={handelImageFile} required
                            className="bg-white w-3/4 px-2 shadow-md"/>

                            <label className="text-white font-bold text-xl">Total Tickets</label>
                            <input type="number" name="totalTickets" value={formData.totalTickets} onChange={handleChange}
                            className="bg-white w-1/2 px-2 rounded-sm py-1 transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50" placeholder="Total Tickets"/>

                            <div className="bg-ghostWhite md:w-9/10 w-9/10 flex flex-col gap-2 items-center p-2  rounded-sm shadow-md">
                            <label htmlFor="">Tickets Prices</label>

                            <label htmlFor="vipPrice" className="font-light">Vip Price</label>
                            <input type="number" name="vipPrice" value={formData.vipPrice} onChange={handleChange}
                            placeholder="Vip" className="bg-blue-100 w-1/2 px-1 rounded-sm shadow-md transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50"/>

                            <label htmlFor="regularPrice" className="font-light">Regular price</label>
                            <input type="number" name="regularPrice" value={formData.regularPrice} onChange={handleChange}
                            placeholder="Regular"  className="bg-blue-100 w-1/2 px-1 rounded.sm shadow-lg rounded-sm transition-all outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50"/>
                        </div>

                        <div className="flex gap-5">
                            <button onClick={openConfirmationModel}
                            className="bg-ghostWhite text-gray-800 px-3 py-1 text-lg font-bold rounded-md active:scale-85 hover:bg-blue-300 hover:text-white transition-all duration-300 ease-in-out">
                                submit
                            </button>
                            <button onClick={openConfirmDeleteModal}
                            className="bg-red-300 text-white border border-red-500 px-3 py-1 text-lg font-bold rounded-md active:scale-85 hover:bg-red-400 hover:text-white transition-all duration-300 ease-in-out">
                                Delete
                            </button>
                        </div>

                        </div>
                    </form>
                </div>  

                )
            }
            {isConfirmationModel && 
                <AnimatePresence>
                <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
                    <Overlay closeOverlay={closeModal}/>
                    <motion.div
                        initial={{scale: 0.9, opacity: 0, y: 20}}
                        animate={{scale: 1, opacity: 1, y: 0}}
                        exit={{scale:0.9, opacity: 0, y: 20}}
                        transition={{type: 'spring', duration: 0.5}}
                        className="bg-ghostWhite w-5/6 md:w-1/2 m-auto md:h- h-60 z-999 flex flex-col justify-center items-center p-1 gap-10 rounded-sm mt-4 ">
                        <h2 className="text-l">
                            Are you sure of the changes you just made?
                        </h2>
                        <div className="bg-blue-00 flex gap-12">
                            <button onClick={updateEvent}
                             className="bg-green-200 px-4 py-1.5 border border-green-500 font-bold text-gray-800 rounded-md active:scale-85 hover:bg-green-300 transition-all duration-300 ease-in-out">
                                Confirm
                            </button>
                            <button onClick={closeModal}
                             className="bg-red-200 px-4 py-1.5 border border-red-500 font-bold text-gray-800 rounded-md active:scale-85 hover:bg-red-300 transition-all duration-300 ease-in-out">
                                cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
                </AnimatePresence>
            }
            {confirmDelete &&
              <AnimatePresence>
                <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
                    <Overlay closeOverlay={closeConfirmDeleteModal}/>
                    <motion.div
                        initial={{scale: 0.9, opacity: 0, y: 20}}
                        animate={{scale: 1, opacity: 1, y: 0}}
                        exit={{scale:0.9, opacity: 0, y: 20}}
                        transition={{type: 'spring', duration: 0.5}}
                        className="bg-ghostWhite w-5/6 md:w-1/2 m-auto md:h- h-60 z-999 flex flex-col justify-center items-center p-1 gap-10 rounded-sm mt-4 ">
                        <h2 className="text-l">
                            Are you sure you want to delete this event?
                        </h2>
                        <div className="bg-blue-00 flex gap-12">
                            <button onClick={deleteEvent}
                             className="bg-green-200 px-4 py-1.5 border border-green-500 font-bold text-gray-800 rounded-md active:scale-85 hover:bg-green-300 transition-all duration-300 ease-in-out">
                                Confirm
                            </button>
                            <button onClick={closeConfirmDeleteModal}
                             className="bg-red-200 px-4 py-1.5 border border-red-500 font-bold text-gray-800 rounded-md active:scale-85 hover:bg-red-300 transition-all duration-300 ease-in-out">
                                cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
                </AnimatePresence>
            }

        </>
    )
}