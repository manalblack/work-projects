import axios from 'axios';
import { useEffect } from 'react';


export default function AllEvents({allEvents}) {

// base ngrok tunnel url: 'https://organological-shaunta-exceptionably.ngrok-free.dev/' CHANGE TO THIS URL BEFORE DEPLOYMENT.


    

    return (
        <>
            {allEvents.map((event) => {
                <div className="bg-red00 w-full py-5 flex flex-col justify-center items-center gap-8">
                       
            <div className="w-9/10 h- bg-darkPurple flex flex-col gap-4 p-2 rounded-sm">
                <div>
                    <img src={event.image} alt=""  className="rounded-sm"/>
                </div>
                {/* inside this we need, title, description, date, location, time, the two tickets prices, remaining tickets */}
                <div className="bg-red-0 flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-white">Title: {event.title}</h2>
                    <p className="leading-6 text-white">
                        {event.description}
                    </p>
                    <div className="bg-white/60 flex flex-row w-full justify-between gap-10 p-2 rounded-sm">
                        <div className="flex flex-col gap-2.5 p-">
                            Tickets Prices:
                            <span className="font-bold">
                                Vip: <span className="bg-darkPurple text-white px-2 rounded-xl py-1 font-extrabold text-lg">
                                    6500
                                </span>
                            </span>
                            <span className="font-bold">
                                Regular: <span className="bg-darkPurple text-white px-2 rounded-xl py-1 font-extrabold text-lg">
                                    2200
                                </span>
                            </span>
                        </div>

                        <div className="bg-amber-2 flex flex-col justify-center items-center gap-3">
                            <h3 className="font-bold">
                                Remaining tickets
                            </h3>
                            <span className="font-extrabold bg-darkPurple text-white px-3 py-1 rounded-xl text-lg">101</span>
                        </div>
                    </div>
                    
                    <div className="bg-lightPurple rounded-sm flex flex-row gap-4 p-2">
                        <span className="font-semibold"> 
                            location: 1234, event center
                        </span>
                        <span className="font-semibold">
                            Date: oct/1
                        </span>
                    </div>
                </div>
                
            </div>
                       

            {/* <input type="file" accept="image/*" onChange={handelImageFile} id="file-input"  className='bg-gray-300 hidden w-5/6'/>
            <label htmlFor="">choose an image</label> */}
        </div>
            })}
        </>
    )
}