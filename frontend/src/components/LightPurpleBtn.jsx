


export default function LightPurpleBtn({children, onPress}){

    return (
        <button onClick={onPress}
         className="bg-lightPurple text-gray-800 px-2 md:px-4 py-1 rounded-2xl font-bold text-sm md:text-lg shadow-md active:scale-95 hover:bg-white hover:text-lightPurple transition-all duration-300 ease-in-out">
            {children}
        </button>
    )
}