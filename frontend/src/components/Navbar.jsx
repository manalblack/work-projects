import { FaShoppingCart } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";

// menu icon <CiMenuBurger />


export default function Navbar() {

    return(
        <nav className="bg-lightPurple/50 w-full p-4 flex flex-row justify-between items-center fixed shadow-md z-99 top-0">
            <div className="flex gap-20">
                <div>logo</div>
                <div>
                    <span className="p-1 text-gray-800 font-bold text-xl">Events</span>
                </div>
            </div>
            <div className="flex flex-row gap-10">
                <FaShoppingCart className="size-8 text-gray-800"/>
                <div className="flex gap-6">
                    <button className="bg-green-400 text-white px-3 rounded-xl font-bold shadow-md">
                        Whatsapp
                    </button>
                    <button className="bg-darkPurple text-white px-3 rounded-xl font-bold shadow-md">
                        Contact us
                    </button>
                </div>
            </div>
        </nav>
    )
}