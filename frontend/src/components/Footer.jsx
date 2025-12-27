import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";
import MiniBox from "./MiniBox";


export default function Footer() {
    
    return(
        <footer className="bg-white p-5 w-full flex flex-col gap-6">
            <div className="flex flex-row gap-15">
                <div className="bg-blue-30 w-1/2 flex flex-col gap-6">
                    <span className="text-2xl font-bold text-gray-800">Trovelista</span>
                    <p className="leading-7 text-lg text-gray-800">
                        Amfanin Girma Plaza, Rijiyar Zaki,
                        opp Markaz Juma'at Mosque
                        <br />
                        Kano State ,nigeria
                    </p>
                </div>

            <div className="bg-green-30 w-3/4 p-2 flex flex-col gap-4 ">
                <div className="flex flex-row gap-3">
                    <FaLocationDot className="size-6 text-darkPurple"/>
                    <p className="font-bold text-lightPurple">
                        https://maps.google.com/?q=11.972223,8.446694
                    </p>
                </div>
                <div className="flex flex-row gap-3">
                    <BsFillTelephoneFill  className="size-6 text-darkPurple"/>
                    <p className="font-bold text-lightPurple">
                       +2347010010044
                    </p>
                </div>
                <div className="flex flex-row gap-3">
                    <FaEnvelope className="size-6 text-darkPurple"/>
                    <p className="font-bold text-lightPurple">
                        Travelista.0info@gmail.com
                    </p>
                </div>
                </div>
            </div>

            <div className="bg-amber- flex flex-row justify-between">
              <span className="font-semibold text-darkPurple">
                All rights reserved &copy;Brand name
              </span>
              <span className="text-black">Made by Blue</span>
            </div>
        </footer>
    )
}