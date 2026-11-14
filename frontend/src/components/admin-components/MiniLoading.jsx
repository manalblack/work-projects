import { AiOutlineLoading3Quarters } from "react-icons/ai";



export default function MiniLoading () {

    return(
        <div className="bg-gray-00 flex flex-col justify-center items-center pt-30">
            <AiOutlineLoading3Quarters className="size-15 text-gold animate-spin transition-all "/>
        </div>
    )
}