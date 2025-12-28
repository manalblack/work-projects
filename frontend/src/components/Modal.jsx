import {motion, AnimatePresence} from 'motion/react';
import Overlay from './Overlay'

export default function Modal({isOpen, children}) {

    return(
            <AnimatePresence>
                {isOpen &&
                    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
                <Overlay />
                <motion.div
                    initial={{scale: 0.9, opacity: 0, y: 20}}
                    animate={{scale: 1, opacity: 1, y: 0}}
                    exit={{scale:0.9, opacity: 0, y: 20}}
                    transition={{type: 'spring', duration: 0.5}}
                 className="bg-white w-9/10 h-110 z-50">
                    {children}
                </motion.div>


            </div>
                }
            </AnimatePresence>

    
    )
}