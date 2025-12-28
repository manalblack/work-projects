import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";
import MiniBox from "./MiniBox";


export default function Footer() {
    
    return(
        <footer className="bg-white md:p-5 p-3 w-full flex flex-col gap-4">
            <div className="flex flex-row gap-3 md:gap-15">
                <div className="bg-blue-30 w-1/2 flex flex-col gap-6">
                    <span className="md:text-2xl text-lg font-bold text-gray-800">Trovelista</span>
                    <p className="leading-7 md:text-lg text-gray-800">
                        Amfanin Girma Plaza, Rijiyar Zaki,
                        opp Markaz Juma'at Mosque
                        <br />
                        Kano State ,nigeria
                    </p>
                </div>

            <div className="bg-green-30 w-3/5 md:p-2 flex flex-col gap-4 mt-8 md:mt-0">
                <div className="flex flex-row md:gap-3 gap-1">
                    <FaLocationDot className="md:size-6 text-darkPurple size-5"/>
                    <p className="font-bold text-sm text-lightPurple">
                        https://maps.google.com/?q=11.972223,8.446694
                    </p>
                </div>
                <div className="flex flex-row md:gap-3 gap-1">
                    <BsFillTelephoneFill  className="md:size-6 size-4 text-darkPurple"/>
                    <p className="font-bold text-lightPurple text-sm">
                       +2347010010044
                    </p>
                </div>
                <div className="flex flex-row md:gap-3 gap-1">
                    <FaEnvelope className="md:size-6 size-4 text-darkPurple"/>
                    <p className="font-bold text-lightPurple text-sm">
                        Travelista.0info@gmail.com
                    </p>
                </div>
                </div>
            </div>

            <div className="bg-amber- flex flex-row justify-between">
              <span className="font-semibold text-darkPurple text-sm">
                All rights reserved &copy;Brand name
              </span>
              <span className="text-black text-xs">Made by Blue</span>
            </div>
        </footer>
    )
}