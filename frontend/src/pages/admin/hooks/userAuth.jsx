import { useState, useEffect } from "react";
import { supabase } from '../../../supabaseConnection';


export function useAuth() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isStaff, setIsStaff] = useState(false);



    useEffect(() => {

        // check if admin 
        const getProfile = async () => {
            const {data: {user}} = await supabase.auth.getUser();
            if (user) {
                setUser(user);

                // fetch admin status from tdb table
                const {data, error} = await supabase.from('profiles').select('is_admin, is_staff').eq('id', user.id).single();

                if(error) {
                    console.log('Error when checking admin');
                }

                if(data) {
                    setIsAdmin(data.is_admin);
                    setIsStaff(data.is_staff)
                }
            }
            setLoading(false);

        }

        getProfile();


        // 1. Check active sessions on load
    //     const getSession = async () => {
    //     const { data: { session } } = await supabase.auth.getSession();
    //     setUser(session?.user ?? null);
    //     setLoading(false);
    // };

    // getSession();

    // 2. Listen for changes (sign in, sign out)
    // const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    //   setUser(session?.user ?? null);
    //   setLoading(false);
    // });

    // return () => subscription.unsubscribe();

    }, [])

    
    return { user, loading, isAdmin, isStaff };




};





