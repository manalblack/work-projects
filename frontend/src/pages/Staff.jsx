import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { supabase } from "../supabaseConnection.js";
import Loading from "../components/Loading.jsx";

// https://p846l2pq-3001.uks1.devtunnels.ms/

export default function Staff() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false)

    const allowAccess = async () => {

        // try {
        //     const response = await axios.post(`${API_URL}/staff/verify-staff`, { password });

        //     if (response.data.accessGranted) {
        //         console.log('access granted !');
                
        //         toast.success('Access granted! welcome staff member', {
        //             position: "top-center",
        //         })
        //         localStorage.setItem('pass', response.data.staffToken);
              
        //         navigate('/successful-login')
        //     } else {
        //         toast.error('Unauthorized access! get out', {
        //             position: "top-center",
        //         })
        //     }
        // } catch (error) {
        //     console.error("Error during access check:", error);
        // }
          setLoading(true);
            try {
                const {error} = await supabase.auth.signInWithPassword({email, password});

                if(error) {
                    // alert('Login failed: ' + error.message);
                    toast.error('Unauthorized access! get out', {
                    position: "top-center",
                })
                    
                } else{
                    navigate('/successful-login')
                    toast.success('Access granted! welcome staff member', {
                    position: "top-center",
                    });
                }
                // setLoading(false)

            } catch (error) {
                console.log('error when admin tries to signup', error);
                
            }
            setLoading(false);
    }


    if(loading) {
        return <Loading>Verifying staff</Loading>
    }


    return(
        <div className="bg-lightPurple h-screen w-full flex flex-col items-center justify-center gap-15">

            <h1 className="text-2xl font-bold text-red-500 animate-pulse">
                Restricted Area!! 
            </h1>

             <div className="bg-darkPurple p-3 w-5/6 md:w-1/2 h-90 rounded-sm shadow-xl">
                <form action="" className="flex flex-col gap-9 justify-center items-center p-3">
                    {/* <input type="text" placeholder="username" onChange={handelFormChange} className="bg-white px-2 py-1 rounded-sm shadow-md"/> */}
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white px-2 py-1 rounded-sm shadow-md w-5/5"/>
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}  className="bg-white px-2 py-1 rounded-sm shadow-md w-5/5"/>
                    <button onClick={allowAccess}  className="bg-white px-3 py-1 text-lg rounded-xl shadow-md active:scale-85 hover:bg-lightPurple transition-all duration-300 ease-in-out">
                        Login
                    </button>
                </form>
            </div>


            {/* <div className="bg-red-0 h-70 w-9/10 flex flex-col items-center gap-15">
                <input type="text" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}  className="bg-white w-3/4 px-2 py-2 rounded-sm"/>
                <button onClick={allowAccess} className="bg-green-500 text-lg px-5 text-white font-bold rounded-xl shadow-lg active:scale-85 transition-all duration-300 ease-in-out">
                    Gain access
                </button>
            </div> */}
        </div>
    )
}