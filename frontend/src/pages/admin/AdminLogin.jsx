import { useState } from "react"
import { useNavigate, Outlet } from "react-router-dom";
import { supabase } from "../../supabaseConnection.js";
import { IoSwapVertical } from "react-icons/io5";
import Loading from "../../components/Loading.jsx";

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
                navigate('/admin/dashboard')
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
            <h1 className="mt-10">Admin login </h1>
            <div className="bg-darkPurple p-3 w-5/6 md:w-1/2 h-90 rounded-sm shadow-xl">
                <form action="" className="flex flex-col gap-9 justify-center items-center p-3">
                    <input type="text" placeholder="username" onChange={handelFormChange} className="bg-white px-2 py-1 rounded-sm shadow-md "/>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white px-2 py-1 rounded-sm shadow-md"/>
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}  className="bg-white px-2 py-1 rounded-sm shadow-md"/>
                    <button onClick={handelLogin}  className="bg-white px-3 py-1 text-lg rounded-xl shadow-md active:scale-85 hover:bg-lightPurple transition-all duration-300 ease-in-out">
                        Login
                    </button>
                </form>
            </div>
       </div>
    )
}

