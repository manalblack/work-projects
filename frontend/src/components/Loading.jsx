import { FaCog } from "react-icons/fa";
import { LoaderCircle } from 'lucide-react';



export default function Loading ({children}) {


    return(
        <div className="h-screen w-full bg-red-00 flex flex-col justify-center items-center gap-20">
            <h2 className="text-2xl text-white font-semibold">
               {children}
            </h2>
            {/* <FaCog  className="size-40 text-gold animate-spin transition-all duration-300 ease-in"/> */}
            <LoaderCircle className="size-20 text-gold animate-spin transition-all duration-300 ease-in"/>
        </div>
    )
}