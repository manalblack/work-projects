import LightBtn from "./LightBtn";
import LightPurpleBtn from "./LightPurpleBtn";
import MiniOverlay from "./MiniOverlay";
import PriceContainer from "./PriceContainer";
import DUMMY_EVENTS from "../testData";

// Create a header component

/* 
    id: 4,
    title: "Startup Founders Brunch",
    description: "Intimate networking session for early-stage startup founders.",
    date: "2026-03-05",
    time: "11:00",
    location: "The Metaphor, Lagos",
    price: 25000,
    category: "Networking",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    availableTickets: 85,
    totalTickets: 100

*/



export default function EventCard() {

    return(
        <div className="w-120 bg-lightPurple flex flex-col justify-center items-center gap-2 p-2 rounded-sm shadow-lg flex-none h-80">

            <div className="relative flex justify-center items-center ">
                <img src="/placeholder.jpg" alt="" className="w-auto rounded-sm shadow-lg"/>
            <MiniOverlay>

                <div className="bg-black/40 absolute bottom-0 left-0 w-full h-40 flex flex-row justify-between gap-8">

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
                    <div className="flex flex-col justify-center items-center p-2 gap-8">
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
           {/* <div className="w-full p-2 flex flex-row gap-6">
                <div className="bg-white p-1 w-5/5 h- flex flex-col gap-6 justify-center items-center rounded-sm">
                    <h2 className="text-4xl font-bold">Chocolate Day</h2>
                    <p className="text-lg font-light">
                        Event description
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, incidunt?
                    </p>
                    <PriceContainer>
                        N2,000
                    </PriceContainer>
                </div>
                <div className="bg-blue-3 w-1/2 flex flex-col justify-center items-center gap-10">
                    <LightPurpleBtn>
                        About Event
                    </LightPurpleBtn>

                   <LightBtn>
                        Book Ticket
                   </LightBtn>
                </div>
           </div> */}
        </div>
    )
}