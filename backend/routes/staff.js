import express from 'express';
import { supabase } from '../databaseConnection.js';
import dotenv from 'dotenv'
import { verify } from 'crypto';


dotenv.config();


const router = express.Router();


const verifyStaff = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'No token provided' });

  // 1. Validate the user via the token
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // 2. Check the database for Admin or Staff status
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin, is_staff')
    .eq('id', user.id)
    .single();

  if (profile?.is_admin || profile?.is_staff) {
    req.user = user; // Attach user to request
    next(); // Move to the next function
  } else {
    res.status(403).json({ error: 'Unauthorized: Staff only' });
  }
};



router.post('/verify-staff', (req, res) => {
    const {password} = req.body;

    const staffPass = process.env.ADMIN_PASS;

    if(password === staffPass) {
        res.json({accessGranted: true, staffToken: "EVENT_STAFF_TOKEN_2026"});
        console.log('Match');
        
    } else {
        res.json({accessGranted: false});
    }
});

router.post('/scan-tickets', verifyStaff, async (req, res) => {

    const {ticketId} = req.body;
    // const secretKey = process.env.ADMIN_SECRET_KEY;

    const todaysDate = new Date().toISOString();

    if(!token) {
        res.status(404).json({error: 'No token provided'});
    }
    try {
        
        const {data, error} = await supabase.from('tickets').update({
            is_scanned: true,
            scanned_at: todaysDate
        }).eq('id', ticketId).eq('is_scanned', false).select();

        if(error) {
            console.log('error when updating ticket status in db, ', error);
        }
    
 
    } catch (error) {
        console.log('error when checking ticket status in the database', error);
        
    }

    res.status(200).json({message: 'SUCCESS'})
})

export default router;

