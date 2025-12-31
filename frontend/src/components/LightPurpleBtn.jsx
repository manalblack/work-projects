


export default function LightPurpleBtn({children, onPress}){

    return (
        <button onClick={onPress}
         className="bg-lightPurple text-gray-800 px-2 md:px-4 py-1 rounded-2xl font-bold text-sm md:text-lg active:scale-95 transition-all duration-300 ease-in-out">
            {children}
        </button>
    )
}