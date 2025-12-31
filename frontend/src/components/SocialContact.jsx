import Card from './Card'
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import MiniBox from './MiniBox';
import {motion} from 'motion/react'



export default function SocialContact(){



    return(
        <Card>
            <motion.div 
                initial={{opacity:0, y: 50}}
                whileInView={{opacity: 1, y: 0}}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{once: true ,amount: 0.4 }}
            className='size-60 bg-green-10 w-5/6 flex justify-center items-center gap-10 md:gap-25'>
                <MiniBox>
                    <FaInstagram className='md:size-18 size-12'/>
                </MiniBox>
                <MiniBox>
                    <FaTiktok className='md:size-18 size-12'/>
                </MiniBox>
                <MiniBox>
                    <FaWhatsapp className='md:size-18 size-12'/>
                </MiniBox>
            </motion.div>
        </Card>
    )
}