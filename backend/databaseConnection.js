import {createClient} from '@supabase/supabase-js'
import dotenv from 'dotenv';

dotenv.config();


const supabaseUrl = process.env.PROJECT_URL
const supabaseKey = process.env.ANAO_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)