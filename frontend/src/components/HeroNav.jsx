import {motion} from 'motion/react'
import { Link } from 'react-router-dom';
import {Link as ScrollLink} from 'react-scroll'


export default function HeroNav(){

    // motion set up
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            duration: 1,
            ease: 'easeOut'
        },
        },
  };

    return(
        <motion.div variants={containerVariants}
        initial='hidden'
        animate='visible'

        className="bg-green-4 h- w-9/10 mt-10 flex flex-col justify-center items-center gap-8">

            <div className="flex md:w-5/6 md:justify-between items-center justify-center gap-6 w-full bg-green-0 mt-2">
               <ScrollLink to='upcomingEvents' smooth={true} duration={500} offset={-100}>
                    <button className="bg-white text-gray-700 font-bold w-/1-2 md:px-4 py-1 rounded-2xl md:text-lg shadow-md px-2 active:scale-85 active:bg-darkPurple active:text-white hover:bg-darkPurple hover:text-white transition-all duration-300 ease-in-out">
                        Upcoming Events
                    </button>
               </ScrollLink>

                <ScrollLink>
                    <button className="bg-white text-gray-700 font-bold w-/1-2 md:px-4 py-1 rounded-2xl md:text-lg shadow-md px-2 active:scale-85 active:bg-darkPurple active:text-white hover:bg-darkPurple hover:text-white transition-all duration-300 ease-in-out">
                        Previous Events
                    </button>
                </ScrollLink>
            </div>
            
        </motion.div>

    )
}