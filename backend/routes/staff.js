import express from 'express';
import { supabase } from '../databaseConnection.js';
import dotenv from 'dotenv'


dotenv.config();


const router = express.Router();


router.post('/verify-staff', (req, res) => {
    const {password} = req.body;
    const staffPass = process.env.ADMIN_PASS;
    
        if(password === staffPass) {
            res.json({accessGranted: true, staffToken: "EVENT_STAFF_TOKEN_2026"});
            console.log('Match');
            
        } else {
            res.json({accessGranted: false});
        }
    
        console.log(password);
})

export default router;

