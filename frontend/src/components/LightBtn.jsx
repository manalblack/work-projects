


export default function LightBtn({children, onPress, disableBtn}) {

    return (
        <button onClick={onPress}
         className="bg-white text-gray-800 px-1 md:px-4 py-1 rounded-2xl font-bold text-sm md:text-lg shadow-md active:scale-95 hover:bg-lightPurple hover:text-white transition-all duration-300 ease-in-out" disabled={disableBtn}>
            {children}
        </button>
    )
}