import Card from "./Card";
import LightPurpleBtn from "./LightPurpleBtn";
import MiniOverlay from "./MiniOverlay";


// Style this component ASAP

export default function Celebrations(){

    return(
        <Card>
            <div className="relative">
                <img src="/placeholder.jpg" alt="" />
                <MiniOverlay>
                    <div className="bg-black/0 absolute bottom-0 left-0 w-full h-70 flex flex-col  gap-10 p-4">
                        <div className="bg-darkBg w-3/4 p-5 flex flex-col justify-center items-center rounded-4xl px-6 m-auto">
                            <span className="bg-amber-0 px-10 text-3xl py-2 rounded-sm font bold outline outline-lightPurple text-white">
                                Buy Your Tickets Now
                            </span>
                        </div >

                        <div className="items-start flex flex-col gap-8">
                            <h2 className="font-bold text-white text-3xl">
                                Experience the Festival like never before
                            </h2>

                            <p className="text-white text-xl">
                                Join us for an unforgettable Weekend of entertainment
                            </p>
                        </div>
                    </div>
                </MiniOverlay>
            </div>
        </Card>
    )
}