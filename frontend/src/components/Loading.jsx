import { FaCog } from "react-icons/fa";



export default function Loading ({children}) {


    return(
        <div className="h-screen w-full bg-red-00 flex flex-col justify-center items-center gap-20">
            <h2 className="text-2xl text-gray-800 font-bold">
               {children}
            </h2>
            <FaCog  className="size-40 text-darkPurple animate-spin transition-all duration-300 ease-in"/>
        </div>
    )
}