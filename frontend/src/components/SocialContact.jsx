import Card from './Card'
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import MiniBox from './MiniBox';
import {motion} from 'motion/react'


// Whatsapp link: https://wa.me/2347010010044
// Tiktok link: https://www.tiktok.com/@trv.ev?_r=1&_t=ZS-92goKd7e6dt
// Instagram Link: https://www.instagram.com/trv.ev?igsh=MWJrZ3RoaG5kbTdraw%3D%3D&utm_source=qr

export default function SocialContact(){



    return(
        <Card>
            <motion.div id='socials' 
                initial={{opacity:0, y: 50}}
                whileInView={{opacity: 1, y: 0}}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{once: true ,amount: 0.4 }}
            className='size-60 bg-green-10 w-5/6 flex justify-center items-center gap-10 md:gap-25'>
                <MiniBox>
                    <a href=" https://www.instagram.com/trv.ev?igsh=MWJrZ3RoaG5kbTdraw%3D%3D&utm_source=qr">
                        <FaInstagram className='md:size-18 size-12'/>
                    </a>
                </MiniBox>
                <MiniBox>
                    <a href="https://www.tiktok.com/@trv.ev?_r=1&_t=ZS-92goKd7e6dt">
                        <FaTiktok className='md:size-18 size-12'/>
                    </a>
                </MiniBox>
                <MiniBox>
                    <a href="https://wa.me/2347010010044">
                        <FaWhatsapp className='md:size-18 size-12'/>
                    </a>
                </MiniBox>
            </motion.div>
        </Card>
    )
}