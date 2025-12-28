import { FaShoppingCart } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";
import Overlay from "./Overlay";
import Rightbar from "./Rightbar";

// menu icon <CiMenuBurger />


export default function Navbar() {
    const [openSidebar, setOpenSidebar] = useState(false)

    const handelOpenSidebar = () => {
        setOpenSidebar(true)
    }

    return(
        <nav className="bg-lightPurple/70 w-full p-4 flex flex-row justify-between items-center fixed shadow-md z-99 top-0">
            <div className="flex gap-20">
                <div>logo</div>
                <div>
                    <span className="p-1 text-gray-800 font-bold text-xl hidden md:flex">Events</span>
                </div>
            </div>
            <div className="flex flex-row gap-6">
                <FaShoppingCart className="size-6 text-gray-800"/>
                <button onClick={handelOpenSidebar}>
                    <CiMenuBurger className="size-6"/>
                </button>
                <div className="hidden md:flex gap-4">
                    <button className="bg-green-400 text-white px-3 rounded-xl font-bold shadow-md">
                        Whatsapp
                    </button>
                    <button className="bg-darkPurple text-white px-3 rounded-xl font-bold shadow-md">
                        Contact us
                    </button>
                </div>
            </div>
            <Rightbar isOpen={openSidebar} closeSidebar={setOpenSidebar}/>
            {/* <Overlay isOpen={openSidebar} closeOverlay={setOpenSidebar}>
                <Rightbar isOpen={openSidebar}/>
            </Overlay> */}
        </nav>
    )
}