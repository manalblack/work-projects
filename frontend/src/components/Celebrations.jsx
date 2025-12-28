import Card from "./Card";
import LightPurpleBtn from "./LightPurpleBtn";
import MiniOverlay from "./MiniOverlay";


// Style this component ASAP

export default function Celebrations(){

    return(
        <Card>
            <div className="relative">
                <img src="/placeholder.jpg" alt=""/>
                <MiniOverlay>
                    <div className="bg-black/0 absolute bottom-0 left-0 w-full h-60 p-2 md:h-70 flex flex-col  md:gap-10 md:p-4">
                        <div className="bg-darkBg w-3/4 p-5 flex flex-col justify-center items-center rounded-4xl md:px-6 m-auto">
                            <span className="bg-amber-0 md:px-10 md:text-3xl text-sm md:py-2 px-4 rounded-sm font bold outline outline-lightPurple text-white">
                                Buy Your Tickets Now
                            </span>
                        </div >

                        <div className="items-start flex flex-col md:gap-8 gap-3">
                            <h2 className="font-bold text-white md:text-3xl text-xl">
                                Experience the Festival like never before
                            </h2>

                            <p className="text-white text-sm md:text-xl">
                                Join us for an unforgettable Weekend of entertainment
                            </p>
                        </div>
                    </div>
                </MiniOverlay>
            </div>
        </Card>
    )
}