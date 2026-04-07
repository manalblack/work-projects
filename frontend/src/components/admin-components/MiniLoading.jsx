import { AiOutlineLoading3Quarters } from "react-icons/ai";



export default function MiniLoading () {

    return(
        <div className="bg-gray-100 flex flex-col justify-center items-center pt-30">
            <AiOutlineLoading3Quarters className="size-20 text-blue-300 animate-spin transition-all "/>
        </div>
    )
}