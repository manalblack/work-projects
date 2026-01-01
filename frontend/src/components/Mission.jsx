import {motion} from 'motion/react';


export default function Mission () {


    return(
        <div className="bg-lightPurple w-full p-5 flex flex-col gap-10 items-center justify-center">
            <div className="w-9/10 flex flex-col gap-6">
                <p className="md:leading-10 leading-7 md:text-2xl text-gray-800">
                    We strive to connect fans with unforgettable experiences by providing access to the best events around the world, ensuring that every ticket purchased leads to a memorable moment.
                </p>
                <p className="md:leading-10 leading-7 md:text-2xl text-gray-800">
                    We are dedicated to bringing you the latest events, ensuring you never miss out on the experiences that matter most to you.
                </p>
            </div>
            <div className="md:w-5/5 w-9/10 m-auto">
                <motion.img 
                    initial={{ opacity: 0, scale: 1.1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                src="/placeholder.jpg" alt="" className="rounded-sm"/>
            </div>
        </div>
    )
}