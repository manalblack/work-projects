import Card from "./Card";
import EventCard from "./EventCard";
import Header from "./Header";
import {motion} from 'motion/react'
import { FaArrowRight } from "react-icons/fa";


/*  VERY IMPORT NOTE
    ADD ANIMATION TO THE REST OF THE COMPONENTS
*/

export default function UpcomingEvents(){

    return (
        <div id="upcomingEvents"
            
        className="flex flex-col overflow-x-auto gap-6 scrollbar-hide snap-x bg-darkPurple w-full items-center p-5 px-4 overflow-y-hidden">
           
           <div className="bg-bl flex flex-row gap-5 items-center overflow-hidden">
                <span className="text-white font-light">
                    Swipe to see all events
                </span>
                <FaArrowRight className="size-6 text-white animate-bounce"/>
           </div>
            <motion.div 
                initial={{opacity:0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{amount: 0.3 }}
            className="flex flex-row overflow-x-auto gap-6 scrollbar-hide snap-x bg-darkPurple w-full items-center h-100 p-5 px-4">
                <EventCard />
            </motion.div>
        </div>
    )
};