import { Link } from "react-router-dom";
import LightBtn from "./LightBtn";
import LightPurpleBtn from "./LightPurpleBtn";



export default function Introduction(){

    return(
        <div className="bg-darkPurple w-full flex flex-col md:gap-8 gap-5 items-start">

            <h2 className="md:text-6xl text-3xl text-white">
                Welcome to Troveista Events
            </h2>
            {/* make this line wider */}
            <hr className="text-lightPurple"/>
            <p className="md:text-3xl text-xl text-white md:leading-12 leading-8">
                Your go to platform  for securing tickets to the hottest shows, sports events, and festivals, all in one place.
            </p>
            {/* This button redirect you to the Events page */}
            {/* <LightBtn>
                Discover
            </LightBtn> */}
            <Link to='/events'>
                <span className="bg-lightPurple px-4 py-1 rounded-3xl font-bold md:px-6 md:text-2xl active:scale-95 transition-all duration-300 ease-in-out">
                    Discover
                </span>
            </Link>
        </div>
    )
}