


export default function PriceContainer({children}){

    return (
        <span className="bg-white/50 text-gray-800 md:px-4 py-1 rounded-2xl px-2 text-sm md:text-lg shadow-md ">
            Ticket: {children}
        </span>
    )
}