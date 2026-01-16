import { FaCheckCircle } from "react-icons/fa";





export default function StaffSuccessfulLogin() {


    return (
        <div className="bg-white mt-20 flex flex-col justify-center items-center gap-20 h-screen w-full">
            <h1 className="text-gray-700 font-extrabold text-2xl">
                you can now use your phone scanner to scan tickets
            </h1>
            <FaCheckCircle className="text-green-400 size-30"/>

        </div>
    )
}