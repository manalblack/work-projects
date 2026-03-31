



export default function Input({label, type, error, name, value, onChange, className = "", placeholder = "", icon: Icon}) {


    return(
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label className="text-sm font-semibold text-gray-500 ml-1">
                {label}
                </label>
            )}

               <div className="flex justify-center items-center relative w-full">

                    {/* 3. The Input - Styled for your Ghost White Dashboard */}
                <input value={value} onChange={onChange} type={type} name={name}
                    className={`
                        px-2 py-1.5 w-9/10 rounded-md border transition-all outline-none shadow-md
                        ${Icon ? 'pl-10' : 'pl-4'}
                        ${error 
                        ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-100' 
                        : 'border-stone-200 bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-50'}
                        placeholder:text-stone-400 text-stone-800`}/>
                </div>
            {/* 4. Error Message */}
                {error && (
                    <span className="text-xs font-medium text-red-500 ml-1 mt-0.5">
                    {error}
                    </span>
                )}  
        </div>
    )

}