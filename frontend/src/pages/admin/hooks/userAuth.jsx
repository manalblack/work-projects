import { useState, useEffect } from "react";
import { supabase } from '../../../supabaseConnection';


export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // 1. Check active sessions on load
        const getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        setLoading(false);
    };

    getSession();

    // 2. Listen for changes (sign in, sign out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();

    }, [])

    
    return { user, loading };




};





