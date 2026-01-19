import {motion, AnimatePresence} from 'motion/react';
import Overlay from './Overlay'
import { useEffect } from 'react';

export default function Modal({isOpen, children, closeModal}) {


    useEffect(() => {
        if(isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset'
        }

    }, [isOpen])

    return(
            <AnimatePresence>
                {isOpen &&
                    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
                <Overlay closeOverlay={closeModal}/>
                <motion.div
                    initial={{scale: 0.9, opacity: 0, y: 20}}
                    animate={{scale: 1, opacity: 1, y: 0}}
                    exit={{scale:0.9, opacity: 0, y: 20}}
                    transition={{type: 'spring', duration: 0.5}}
                 className="bg-darkPurple w-9/10 md:w-90 h-auto z-999 flex flex-col justify-center items-center p-1 gap-3 rounded-sm ">
                    {children}
                </motion.div>


            </div>
                }
            </AnimatePresence>

    
    )
}