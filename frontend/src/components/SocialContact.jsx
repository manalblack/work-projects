import Card from './Card'
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import MiniBox from './MiniBox';


export default function SocialContact(){

    return(
        <Card>
            <div className='size-60 bg-green-10 w-5/6 flex justify-center items-center gap-25'>
                <MiniBox>
                    <FaInstagram className='size-18'/>
                </MiniBox>
                <MiniBox>
                    <FaTiktok className='size-18'/>
                </MiniBox>
                <MiniBox>
                    <FaWhatsapp className='size-18'/>
                </MiniBox>
            </div>
        </Card>
    )
}