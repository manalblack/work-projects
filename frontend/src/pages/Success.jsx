import { FaCheckCircle } from "react-icons/fa";



export default function Success() {

    return (
        <div className="h-screen w-full bg-green-100 flex flex-col justify-center items-center gap-20">
            <h1 className="text-3xl font-extrabold text-gray-700">
                Ticket Scanned 
            </h1>
            <FaCheckCircle className="size-35 text-green-600 animate-bounce "/>
            <h3 className="text-2xl ">
                
            </h3>
        </div>
    )
}