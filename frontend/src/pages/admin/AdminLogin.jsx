import { useState } from "react"
import { useNavigate, Outlet } from "react-router-dom";
import { supabase } from "../../supabaseConnection.js";
import { IoSwapVertical } from "react-icons/io5";
import Loading from "../../components/Loading.jsx";
import { motion } from "framer-motion";
import {useLanguage} from '../../hooks/LanguageContext.jsx'




export default function AdminLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
     const API_URL = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const handelFormChange = (e) => {
        const {name, value} = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }
        ));
        // navigate('/dashboard')
    }


    const handelLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const {error} = await supabase.auth.signInWithPassword({email, password});

            if(error) {
                alert('Login failed: ' + error.message);
            } else{
                navigate('/admin/dashboard/main')
            }
            setLoading(false)

        } catch (error) {
            console.log('error when admin tries to signup', error);
            
        }
    }

    if(loading) {
        return <Loading>Verifying Admin</Loading>
    };

    // FIX THE WIDTH OF THE INPUTS

    return(
       <div className="flex flex-col gap-10 justify-center items-center">
            {/* <h1 className="mt-10">Admin login </h1> */}
            <div className="bg-white p-3 md:w-70 h-90 mt-20 rounded-sm shadow-xl">
                <motion.div 
                    //   variants={fadeIn} 
                    className="inline-flex items-center gap-2 rounded-full bg-forestGreen border border-white/80 px-3.5 py-1.5 shadow-sm max-w-full">
                    <span className="flex h-2 w-2 relative shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                    </span>
                    <span className="text-[11px] sm:text-[12px] font-bold text-white tracking-wide leading-tight truncate sm:whitespace-normal">
                        {/* {isRtl 
                        ? 'تروفيستا: حيث تلتقي الرحلات الاستثنائية بالمناسبات الفاخرة' 
                        : 'Troviesta: Where Extraordinary Escapes Meet Unforgettable Occasions'} */}
                    </span>
                </motion.div>
                <form action="" className="flex flex-col gap-9 justify-center items-center p-3">
                    {/* <input type="text" placeholder="username" onChange={handelFormChange} className="bg-white px-2 py-1 rounded-sm shadow-md"/> */}
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white border border-gold/50 px-2 py-1 rounded-md shadow-md"/>
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}  className="bg-white px-2 py-1 border border-gold/50 rounded-md shadow-md"/>
                    <button onClick={handelLogin}  className="bg-forestGreen text-white px-4 py-1 text- rounded-full border border-forestGreen shadow-md active:scale-85 hover:bg-white hover:text-forestGreen transition-all duration-300 ease-in-out">
                        Login
                    </button>
                </form>
            </div>
       </div>
    )
}

