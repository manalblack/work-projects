import {motion} from 'motion/react'
import {Link} from 'react-scroll'


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

            {/* <div className="bg-red-00 w-5/6 flex justify-center items-center p-6">
                <input type="text" placeholder="Search Events"
                    className="bg-gray-100 w-5/6 p-2 rounded-2xl shadow-md"
                />
            </div> */}
            <div className="flex md:w-5/6 md:justify-between items-center justify-center gap-6 w-full bg-green-0 mt-2">
               <Link to='upcomingEvents' smooth={true} duration={500} offset={-100}>
                    <button className="bg-white text-gray-700 font-bold w-/1-2 md:px-4 py-1 rounded-2xl md:text-lg shadow-md px-2 active:scale-95 active:bg-darkPurple active:text-white transition-all duration-300 ease-in-out">
                        Upcoming Events
                    </button>
               </Link>

                <button className="bg-white text-gray-700 font-bold w-/1-2 md:px-4 py-1 rounded-2xl md:text-lg shadow-md px-2 active:scale-95 active:bg-darkPurple active:text-white transition-all duration-300 ease-in-out">
                    Previous Events
                </button>
            </div>
            
        </motion.div>

    )
}