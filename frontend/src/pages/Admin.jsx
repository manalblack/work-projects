import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';

export default function Admin() {

    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const testId = '41446b84-e713-4cbc-9a5d-e14a5029cbcb';

    const allowAccess = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/verify-staff', { password });

            if (response.data.accessGranted) {
                console.log('access granted !');
                // alert('welcome staff member');
                toast.success('Access granted! welcome staff member', {
                    position: "top-center",
                })
                localStorage.setItem('pass', response.data.staffToken);
                // navigate(`/verify/${testId}?type=vip`);
                navigate('/successful-login')
            } else {
                // alert('get out of here unauthorized access !! ');
                toast.error('Unauthorized access! get out', {
                    position: "top-center",
                })
            }
        } catch (error) {
            console.error("Error during access check:", error);
        }
    }

    return(
        <div className="bg-lightPurple h-screen w-full flex flex-col items-center justify-center gap-15">

            <h1 className="text-2xl font-bold text-red-500 animate-pulse">
                Restricted Area!! 
            </h1>

            {/* <h3 className="text-xl font-bold">
                Organizers only
            </h3> */}


            <div className="bg-red-0 h-70 w-9/10 flex flex-col items-center gap-15">
                {/* <h3>Enter password</h3> */}
                <input type="text" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}  className="bg-white w-3/4 px-2 py-2 rounded-sm"/>
                <button onClick={allowAccess} className="bg-green-500 text-lg px-5 text-white font-bold rounded-xl shadow-lg active:scale-85 transition-all duration-300 ease-in-out">
                    Gain access
                </button>
            </div>
        </div>
    )
}