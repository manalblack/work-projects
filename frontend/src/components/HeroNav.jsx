

export default function HeroNav(){

    return(
        <div className="bg-green-4 h- w-9/10 mt-8 flex flex-col justify-center items-center gap-8">

            {/* <div className="bg-red-00 w-5/6 flex justify-center items-center p-6">
                <input type="text" placeholder="Search Events"
                    className="bg-gray-100 w-5/6 p-2 rounded-2xl shadow-md"
                />
            </div> */}
            <div className="flex md:w-5/6 md:justify-between items-center justify-center gap-6 w-full bg-green-0 mt-2">
                <button className="bg-white text-gray-700 font-bold w-/1-2 md:px-4 py-1 rounded-2xl md:text-lg shadow-md px-2 active:scale-95 active:bg-darkPurple active:text-white transition-all duration-300 ease-in-out">
                Upcoming Events
            </button>
            <button className="bg-white text-gray-700 font-bold w-/1-2 md:px-4 py-1 rounded-2xl md:text-lg shadow-md px-2 active:scale-95 active:bg-darkPurple active:text-white transition-all duration-300 ease-in-out">
                Previous Events
            </button>
            </div>
            
        </div>
    )
}