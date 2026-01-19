import Modal from "../../components/Modal"
import { useState } from "react"
import DatePicker from "react-datepicker";
// IMPORTANT: You must import the CSS or the calendar will look broken
import "react-datepicker/dist/react-datepicker.css";

// Add the event to the database and work on the number input fields they nee fixing

export default function AdminDashboard() {

    const [addEventModal, setAddEventModal] = useState(false);
    // const [eventDate, setEventDate] = useState(new Date());
    const [eventData, setEventData] = useState({
        eventTitle: '',
        eventDescription: '',
        eventDate: new Date(),
        eventImage: '',
        eventLocation: '',
        totalTickets: 0,
        vipPrice: 0,
        regularPrice: 0
    })
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null);

    const handelFormChange = (e) => {
        const {name, value} = e.target;

        setEventData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handelImageFile = (e) => {
        const selectedFile = e.target.file[0];
        if(selectedFile) {
            setImageFile(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile));
        }
    }

    const formatDate = (date) => {

        const offset = date.getTimezoneOffset() * 60000;   

        const localISOTime = new Date(date - offset).toISOString();

        const eventDateStr = localISOTime.split('T')[0];
        const eventTime = localISOTime.split('T')[1].slice(0, 5);

        console.log('formatted Date', eventDateStr);
        console.log('formatted Time', eventTime);
        
        
        // console.log(eventDate);
    }

    const handelAddEventModal = () => {
        setAddEventModal(true)
    }

    const addEventToDb = (e) => {
        e.preventDefault();
        // formatDate(eventDate)
     
        console.log(eventData);
        
    }

    /*
        title, date, time, location, image, regular_price, vip_price
        description, total tickets
    */

    return (
        <>
            {/* wrapper */}
            <div className="h-screen w-full bg-white flex flex-col gap-3">

                <nav className="bg-lightPurple p-2">
                    <div className="flex flex-row justify-center items-center gap-10">
                        <button onClick={handelAddEventModal}
                        className="bg-white px-3 py-1 font-bold rounded-2xl active:scale-85 transition-all duration-300 ease-in">
                            Add event
                        </button>
                        {/* <button className="bg-white px-3 py-1 font-bold rounded-2xl active:scale-85 transition-all duration-300 ease-in">
                            Add event
                        </button> */}
                        
                    </div>
                </nav>
                {/* parent component */}
                <div className="bg-lightPurple flex flex-col justify-center items-center gap-8">
                    <h2 className="text-2xl text-gray-700">
                        Current Event: <span className="font-bold">Black lights</span>
                    </h2>

                    <div className="bg-lightPurple flex flex-row gap-2 p-3">
                        <div className="size-40 outline outline-darkPurple flex flex-col justify-center items-center gap-10">
                            <p className="text-2xl text-red-500 font-bold ">Sold Tickets</p>
                            <span className="font-bold underline text-white text-3xl">89</span>
                        </div>

                         <div className="size-40 bg-darkPurple flex flex-col justify-center items-center gap-10">
                            <p className="text-2xl text-white font-bold">Remaining</p>
                            <span className="font-bold underline text-white text-3xl">21</span>
                        </div>
                    </div>

                    <div className="bg-red-300 size-50">
                       
                        <input type="file" accept="image/*" onChange={handelImageFile} id="file-input"  className='bg-gray-300 hidden w-5/6'/>
                        <label htmlFor="">choose an image</label>
                    </div>
                </div>

            </div>
            <Modal isOpen={addEventModal} closeModal={() => setAddEventModal(false)}>
                <form action="" className="w-full">
                    <div className="w-full flex pt-30 flex-col gap-7 justify-center items-center p-1 h-140 overflow-y-auto bg-red-0 min-h-0 flex-1 pb-2">
                        <input type="text"  placeholder="title" name="eventTitle" value={eventData.eventTitle} onChange={handelFormChange}
                        className="bg-white w-9/11 px-2 py-2 rounded-sm mt-15 shadow-md"/>
                        <textarea placeholder="Description" name='eventDescription' value={eventData.eventDescription} onChange={handelFormChange}
                        className="w-9/10 bg-white px-2 py-2 h-30 rounded-sm shrink-0 resize-none shadow-md"/>

                        <div className="flex flex-col gap-2">
                            <label className="font-bold text-white">Choose Date & Time</label>
                            {/* <DatePicker selected={eventDate} onChange={(date) => setEventDate(date)} showTimeSelect withPortal dateFormat='Pp' className="bg-white px-2 rounded-sm shadow-md"/> */}
                        </div>
                        
                        <input type="text" placeholder="Location" name='eventLocation' value={eventData.eventLocation} onChange={handelFormChange}
                        className="bg-white px-2 py-1 rounded-sm shadow-md" />

                        <label htmlFor="" className="text-white font-bold text-xl">Select image</label>
                        <input type="file" name='eventImage' value={eventData.eventImage} onChange={handelFormChange}
                         className="bg-white w-3/4 px-2 shadow-md"/>

                        <input type="number" name="totalTickets" value={eventData.totalTickets} onChange={handelFormChange}
                         className="bg-white w-1/2 px-2 rounded-sm" placeholder="Total Tickets"/>
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
            </Modal>
        </>
    )
}