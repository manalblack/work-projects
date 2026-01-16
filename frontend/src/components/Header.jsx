


export default function Header({children}){

// Add the current event here using the current event column in the db


    return(
        <h2 className="text-gray-900 font-bold text-4xl md:text-7xl">
            {children}
        </h2>
    )
}