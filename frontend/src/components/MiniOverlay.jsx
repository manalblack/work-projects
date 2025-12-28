


export default function MiniOverlay({children}){


    return(
        <div className="absolute inset-0 bg-black/50 flex shadow-md p-2 rounded-sm">
            {children}
        </div>
    )
}