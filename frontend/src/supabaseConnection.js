import {createClient} from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_PROJECT_URL;
const supabaseAnonKey = import.meta.env.VITE_ANAO_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 

// Connection to database is now established