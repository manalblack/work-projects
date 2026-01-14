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

router.post('/scan-tickets', async (req, res) => {

    const {ticketId, bouncerId} = req.body;
    const secretKey = process.env.ADMIN_SECRET_KEY;

    const todaysDate = new Date().toISOString();

    try {
        
        if(bouncerId === secretKey) {
            const {data, error} = await supabase.from('tickets').update({
                is_scanned: true,
                scanned_at: todaysDate
            }).eq('id', ticketId).eq('is_scanned', false).select();

            if(error) {
                console.log('error when updating ticket status in db, ', error);
                
            }

            console.log(data);
        }

    
 
    } catch (error) {
        console.log('error when checking ticket status in the database', error);
        
    }

    res.status(200).json({message: 'SUCCESS'})
})

export default router;

