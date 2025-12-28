import LightBtn from "./LightBtn";
import LightPurpleBtn from "./LightPurpleBtn";
import MiniOverlay from "./MiniOverlay";
import PriceContainer from "./PriceContainer";
import DUMMY_EVENTS from "../testData";



/* 
     <div className="md:w-120 w-100 bg-lightPurple flex flex-col justify-center items-center gap-2 p-2 rounded-sm shadow-lg flex-none h-70">

            <div className="relative flex justify-center items-center">
                <img src="/placeholder.jpg" alt="" className="w-auto rounded-sm shadow-lg"/>
            <MiniOverlay>

                <div className="bg-black/40 absolute bottom-0 left-0 w-full h-40 flex flex-row justify-between md:gap-8">

                    <div className="bg-blue-0 w-5/6 flex flex-col items-start p-2 gap-4">
                        <h2 className="text-2xl text-white font-bold">
                            Event name
                        </h2>
                        <p className="text-white font-light">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, ut.
                        </p>
                        <PriceContainer>
                            N2,000
                        </PriceContainer>
                    </div>
                    <div className="flex flex-col justify-center items-center p-2 gap-5 mt-5 md:mt-0 md:gap-8">
                        <LightPurpleBtn>
                            AboutEvent
                        </LightPurpleBtn>
                        <LightBtn>
                            Book ticket
                        </LightBtn>
                    </div>

                </div>

            </MiniOverlay>

            </div>
           
        </div>

*/


export default function EventCard() {

    return(
       <>
        {/* {DUMMY_EVENTS.map((event) => (
            <div key={event.id}
             className="md:w-120 w-100 bg-lightPurple flex flex-col justify-center items-center gap-2 p-2 rounded-sm shadow-lg flex-none h-80">

            <div className="relative flex justify-center items-center h-auto">
                <img src={event.image} alt="" className="w-auto rounded-sm shadow-lg"/>
            <MiniOverlay>

                <div className="bg-black/40 absolute bottom-0 left-0 w-full h-50 flex flex-row justify-between md:gap-8">

                    <div className="bg-blue-0 w-5/6 flex flex-col items-start p-2 gap-4">
                        <h2 className="md:text-2xl  text-white font-bold">
                            {event.title}
                        </h2>
                        <p className="text-white font-light">
                           {event.description}
                        </p>
                        <PriceContainer>
                            N2,000
                        </PriceContainer>
                        
                    </div>
                    <div className="flex flex-col justify-center items-center p-2 gap-5 mt-5 md:mt-0 md:gap-8">
                        <LightPurpleBtn>
                            AboutEvent
                        </LightPurpleBtn>
                        <LightBtn>
                            Book ticket
                        </LightBtn>
                    </div>

                </div>

            </MiniOverlay>

            </div>
           
        </div>
            ))} */}
         <div className="md:w-120 w-90 bg-lightPurple flex flex-col justify-center items-center gap-2 p-2 rounded-sm shadow-lg flex-none h-90 md:h-60">

            <div className="relative flex justify-center items-center">
                <img src="/placeholder.jpg" alt="" className="w-auto h-80 md:h-0 rounded-sm shadow-lg"/>
            <MiniOverlay>

                <div className="bg-black/40 absolute bottom-0 left-0 w-full h-60  flex flex-row justify-between md:gap-8">

                    <div className="bg-blue- w-5/6 flex flex-col items-start p-2 gap-2">
                        <h2 className="text-2xl text-white font-bold">
                            Event name
                        </h2>
                        <p className="text-white font-light">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, ut.
                        </p>
                        <PriceContainer>
                            N2,000
                        </PriceContainer>
                        <div className="bg-red-0 p-1 flex flex-row gap-2">
                            <span className="bg-white/50 text-gray-800 md:px-4 py-1 rounded-sm px-2 text-sm md:text-lg ">
                                Date: Oct/10, Time: 10:00am
                                <br />
                                Venue: 1234 Event center
                            </span>
                             {/* <span className="bg-white/50 text-gray-800 md:px-4 py-1 rounded-2xl px-2 text-sm md:text-lg ">
                                Date: Oct/10
                            </span> */}
                            
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center p-2 gap-5 mt-5 md:mt-0 md:gap-8">
                        <LightPurpleBtn>
                            AboutEvent
                        </LightPurpleBtn>
                        <LightBtn>
                            Book ticket
                        </LightBtn>
                    </div>

                </div>

            </MiniOverlay>

            </div>
           
        </div>

       </>

    )
}