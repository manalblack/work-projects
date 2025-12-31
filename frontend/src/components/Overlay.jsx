import {motion} from 'motion/react'


export default function Overlay({closeOverlay}){


    return(
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity:1}}
        exit={{opacity: 0}}
        onClick={closeOverlay}
        className={`bg-black/50 h-screen w-full fixed inset-0 $`}>

        </motion.div>
    )
}