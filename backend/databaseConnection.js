import {createClient} from '@supabase/supabase-js'
import dotenv from 'dotenv';
import ws from 'ws'

dotenv.config();

globalThis.WebSocket = ws;

const supabaseUrl = process.env.PROJECT_URL

const supabaseKey = process.env.SECRET_KEY

// update
export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: false,
    },
    realtime: {
        transport: ws, // <--- Provide the WebSocket transport for Node < 22
    },
})