import { useState } from "react"
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
// IMPORTANT: You must import the CSS or the calendar will look broken
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { supabase } from "../../supabaseConnection";
import PriceContainer from "../../components/PriceContainer";
import LightBtn from "../../components/LightBtn";
import LightPurpleBtn from "../../components/LightPurpleBtn";
import toast from 'react-hot-toast'
import Loading from "../../components/Loading";


/** FIX THE LAYOUT OF THIS SCREEN ON LG SCREEN
 *  AND WORK ON THE SEARCH TICKET FUNCTIONALITY */


export default function AddEvents () {


    const [eventDate, setEventDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [eventTime, setEventTime] = useState(null);
    const [eventData, setEventData] = useState({
        eventTitle: '',
        eventDescription: '',
        eventLocation: '',
        totalTickets: 0,
        vipPrice: 0,
        regularPrice: 0
    });

    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null);

    const handelFormChange = (e) => {
        const {name, value} = e.target;

        setEventData((prevData) => ({
            ...prevData,
            [name]: value
        }
        ))
    }

    const handelImageFile = (e) => {
        const selectedFile = e.target.files[0];
        if(selectedFile) {
            setImageFile(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile));
        }
        // setImageFile(URL.createObjectURL(e.target.files[0]));
    }

//    TEST this function
    const addEventToDb = async (e) => {
        e.preventDefault();
        setLoading(true);

       const formattedDate = eventDate.toISOString().split('T')[0];
       const formattedTime = eventDate.toTimeString([], {
        hour: 'numeric',
        minutes: '2-digit',
        hour12: true 
       }).split(' ')[0];
     
    //    setEventDate(formattedDate);
       setEventTime(formattedTime);
        
        try {
            // upload image to a storage bucket first before adding to database table
            const fileName = `eventImage-${imageFile.name}`

            const {data, error} = await supabase.storage.from('events_images').upload(fileName, imageFile);

            if(error) throw error;

            // Get the public url to save to table
            const {data: uploadedImage} = supabase.storage.from('events_images').getPublicUrl(fileName);
            

            const newEvent = {
                title: eventData.eventTitle,
                description: eventData.eventDescription,
                location: eventData.eventLocation,
                totalTickets: eventData.totalTickets,
                vipPrice: eventData.vipPrice,
                regularPrice: eventData.regularPrice,
                time: formattedTime,
                date: formattedDate,
                image: uploadedImage.publicUrl,
            }

            const response = await axios.post(' https://organological-shaunta-exceptionably.ngrok-free.dev/api/admin/add-events', newEvent);
            console.log(response);
            if(response.data.message === 'SUCCESS') {
                toast.success("event added to database", {
                duration: 6000,
                position: 'top-center',
                });
                setLoading(false);
            }

        } catch (error) {
            console.error('err when trying to add event to db', error);
            
        }
    }
    // preview section dat / time 
    const formatDatePreview = (date) => {
        if (!date) return "Select Date";
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const formatTimePreview = (date) => {
        if (!date) return "Select Time";
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    if(loading) {
        return <Loading>Adding event to Database</Loading>
    }

    return(
        <>
            <nav className="bg-lightPurple shadow-md py-2 px-5 flex flex-row justify-between">
                <button className="bg-darkPurple text-white px-3 font-bold rounded-xl py-1 shadow-md active:scale-85 transition-all duration-300 ease-in-out">
                    <Link to='/admin/dashboard'>
                        Dashboard
                    </Link>
                </button>
                <h1 className="text-center text-3xl">Add Event</h1>
            </nav>
           <div className="flex flex-col gap-10 pb-5 md:flex-row md:mt-5 md:p-5">
              {/* <h2 className="text-xl">Add Event</h2> */}
                
                <form action="" className="w-full md: w-1/2 flex justify-center items-center">
                    <div className="w-9/10 flex pt- flex-col gap-7 justify-center items-center p-1 h- bg-red-0 min-h-0 flex-1 pb-2 bg-darkPurple rounded-sm">
                        <input type="text"  placeholder="title" name="eventTitle" value={eventData.eventTitle} onChange={handelFormChange}
                        className="bg-white w-9/11 px-2 py-2 rounded-sm mt-5 shadow-md"/>
                        <textarea placeholder="Description" name='eventDescription' value={eventData.eventDescription} onChange={handelFormChange}
                        className="w-9/10 bg-white px-2 py-2 h-30 rounded-sm shrink-0 resize-none shadow-md"/>

                        <div className="flex flex-col gap-2">
                            <label className="font-bold text-white">Choose Date & Time</label>
                            <DatePicker selected={eventDate} onChange={(e) => setEventDate(e)}  showTimeSelect withPortal dateFormat="Pp"  className="bg-white px-2 rounded-sm shadow-md"/>
                        </div>
                        
                        <input type="text" placeholder="Location" name='eventLocation' value={eventData.eventLocation} onChange={handelFormChange}
                        className="bg-white px-2 py-1 rounded-sm shadow-md" />



                        <label htmlFor="" className="text-white font-bold text-xl">Select image</label>
                        <input type="file" accept='image/*' onChange={handelImageFile} required
                         className="bg-white w-3/4 px-2 shadow-md"/>



                        <label className="text-white font-bold text-xl">Total Tickets</label>
                        <input type="number" name="totalTickets" value={eventData.totalTickets === 0? '': eventData.totalTickets} onChange={handelFormChange}
                         className="bg-white w-1/2 px-2 rounded-sm py-1" placeholder="Total Tickets"/>
                        <div className="bg-lightPurple flex flex-col gap-2 items-center p-2 rounded-sm shadow-md">
                            <label htmlFor="">Tickets Prices</label>

                            <label htmlFor="vipPrice" className="font-light">Vip Price</label>
                            <input type="number" name="vipPrice" value={eventData.vipPrice === 0 ? '' : eventData.vipPrice} onChange={handelFormChange}
                            placeholder="Vip" className="bg-white w-1/2 px-1 rounded-sm"/>

                            <label htmlFor="regularPrice" className="font-light">Regular price</label>
                            <input type="number" name="regularPrice"
                            placeholder="Regular" value={eventData.regularPrice === 0 ? '' : eventData.regularPrice} onChange={handelFormChange}  className="bg-white w-1/2 px-1 rounded.sm shadow-lg rounded-sm"/>
                        </div>
                        
                        
                        <button onClick={addEventToDb}
                            className="bg-lightPurple text-darkPurple px-2 py-1 rounded-sm font-bold active:scale-85 transition-all duration-300 ease-in">
                            Add Event
                        </button>
                        
                    </div>
                </form>
                
                <div className="bg-b pt-5 pb-5 w-full flex flex-col justify-center items-center ">
                    <h3 className='text-2xl text-center font-bold'>Ticket Preview</h3>
                   <div className="flex flex-col justify-center items-center w-9/10 bg-darkPurple p-2 rounded-sm shadow-md">
                        <div className="">
                            {imageFile && <img src={imagePreview} alt='Preview' className='rounded-sm'/>}
                        </div>
                        <div className="text-white bg-green-6 w-full  flex flex-col gap-3">
                            <h2 className="text-xl font-bold">{eventData.eventTitle}</h2>
                            <p className="line-clamp-2 text-lg">
                                {eventData.eventDescription}
                            </p>
                            <div className="flex flex-row gap-8 bg-red-70">
                                
                                <div className="flex flex-col gap-3 bg-red-">
                                    <div className="bg-red-0 p-1 flex flex-col gap-6">
                                        <div>
                                        <PriceContainer>
                                            N{eventData.regularPrice}
                                        </PriceContainer>
                                    </div>
                                        <span className="bg-white/50 text-gray-800 md:px-4 py-1 rounded-sm px-1 text-sm md:text-lg ">
                                            Date: {formatDatePreview(eventDate)}, Time: {formatTimePreview(eventDate)}
                                            <br />
                                            Venue: {eventData.eventLocation}
                                        </span>
                                        
                                    </div>
                                    <span className="bg-white/50 md:w-1/2 text-gray-800 md:px-2 py-1 rounded-2xl px-2 text-sm md:text-lg">
                                        Total tickets: {eventData.totalTickets}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-5 mt-12 w-1/2">
                                    <LightBtn>About Event</LightBtn>
                                    <LightPurpleBtn>
                                        Buy Ticket
                                    </LightPurpleBtn>
                                </div>

                            </div>
                        
                        </div>
                    </div>

                </div>
           </div>
        </>
    )
}