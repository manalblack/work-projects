import { FaWhatsapp } from "react-icons/fa";



export default function MiniBox({children}) {

    return(
    <div className="outline-2 outline-lightPurple p-3 shadow-lg rounded-sm text-lightPurple active:scale-95 active:bg-lightPurple active:text-darkPurple transition-all duration-500">
           {children}
        </div>
    )
}