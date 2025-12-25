

export default function HeroNav(){

    return(
        <div className="bg-green-00 h-100 w-9/10 mt-20 p-5 flex flex-col justify-center items-center gap-8">

            <div className="bg-red-00 w-5/6 flex justify-center items-center p-6">
                <input type="text" placeholder="Search Events"
                    className="bg-gray-100 w-5/6 p-2 rounded-2xl"
                />
            </div>
            <div className="flex w-5/6 justify-between items-center">
                <button className="bg-white text-gray-800 font-bold px-4 py-1 rounded-2xl text-lg">
                Upcoming Events
            </button>
            <button className="bg-white text-gray-800 font-bold px-4 py-1 rounded-2xl text-lg">
                Previous Events
            </button>
            </div>
            
        </div>
    )
}