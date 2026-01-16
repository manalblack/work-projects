import { FaShoppingCart } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";
import Overlay from "./Overlay";
import Rightbar from "./Rightbar";
import { useNavigate, Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

// menu icon <CiMenuBurger />


export default function Navbar() {

    const [openSidebar, setOpenSidebar] = useState(false)

    const navigate = useNavigate();

    const handelOpenSidebar = () => {
        setOpenSidebar(true)
    }



    return(
        <nav className="bg-lightPurple/70 w-full h-15 md:h-auto md:p-4 flex flex-row justify-between items-center fixed shadow-md z-99 top-0">
            <div className="flex md:gap-0 gap-20 bg-red-0">
                <div >
                    <Link to='/'>
                        <img src="TRAVLISTA-logo.png" alt="" className="size-16"/>
                    </Link>
                </div>
                <div>
                    <Link to='/events'>
                        <span className="p-1 text-gray-800 font-extrabold text-xl hidden md:flex active:scale-95 transition-all duration-300 ease-in-out">Events</span>
                    </Link>
                </div>
            </div>
            <div className="flex flex-row gap-6 mr-5 bg-amber-00">

                <Link to='/cart'>
                    <FaShoppingCart className="size-6 text-gray-800"/>
                </Link>

                <button onClick={handelOpenSidebar} className="md:hidden flex">
                    <CiMenuBurger className="size-6"/>
                </button>

                <div className="hidden md:flex gap-4">
                    <button className="bg-green-400 text-white px-3 rounded-xl font-bold shadow-md active:scale-95 transition-all duration-300 ease-in-out">
                        <a href="https://wa.me/2347010010044">
                            Whatsapp
                        </a>    
                    </button>
                    <ScrollLink to='socials' smooth={true} duration={500} offset={-100}>
                        <button className="bg-darkPurple text-white px-3 rounded-xl font-bold shadow-md active:scale-95 transition-all duration-300 ease-in-out">
                            Contact us
                        </button>
                    </ScrollLink>
                </div>

            </div>
            <Rightbar isOpen={openSidebar} closeSidebar={() => setOpenSidebar(false)}/>
            {/* <Overlay isOpen={openSidebar} closeOverlay={setOpenSidebar}>
                <Rightbar isOpen={openSidebar}/>
            </Overlay> */}
        </nav>
    )
}