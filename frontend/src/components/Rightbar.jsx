import { BsFillTelephoneFill } from "react-icons/bs";
import {motion, AnimatePresence} from 'motion/react';
import Overlay from "./Overlay";
import { Link } from "react-router-dom";





export default function Rightbar({isOpen, closeSidebar}) {

    return(
       <AnimatePresence>
            {isOpen && 
                <>
                <Overlay closeOverlay={closeSidebar}/>
                <motion.div 
                    initial={{x: '100%'}}
                    animate={{x:0}}
                    exit={{x: '100%'}}
                    transition={{type: 'spring', damping: 25, stiffness: 200}}
                    onClick={(e) => e.stopPropagation()} 
                    className={`fixed top-0 right-0 h-full w-70 bg-lightPurple z-50 shadow-xl`}>
                {/* Search container */}
                <div className="flex justify-center items-center p-4 ">
                    <input type="text" placeholder="Search events" className="bg-white px-8 py-1 rounded-2xl shadow-lg"/>
                </div>

                <div className="bg-blue-10 flex flex-col mt-10 gap-9 p-2">
                    <Link to='/events' className="outline px-3 outline-darkPurple shadow-md text-lg active:scale-95 transition-all duration-300 ease-in-out">
                        <span>
                            Events
                        </span>
                    </Link>


                    <span className="outline px-3 outline-darkPurple shadow-md text-lg active:scale-95 transition-all duration-300 ease-in-out">
                        Contact Us
                    </span>
                    <span className="outline px-3 outline-darkPurple shadow-md text-lg active:scale-95 transition-all duration-300 ease-in-out flex flex-row py-2 gap-3">
                        <BsFillTelephoneFill className="size-6 text-gray-700"/>
                        +2347010010044
                    </span>
                </div>
                </motion.div>
            </>
            }
       </AnimatePresence>
    )
}