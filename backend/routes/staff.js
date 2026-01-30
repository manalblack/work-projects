import express from 'express';
import { supabase } from '../databaseConnection.js';
import dotenv from 'dotenv'
import { verify } from 'crypto';
import { log } from 'console';


dotenv.config();


const router = express.Router();


const verifyStaff = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    
  if (!token) return res.status(401).json({ error: 'No token provided' });

  // 1. Validate the user via the token
  const { data: { user }, error } = await supabase.auth.getUser(token);

//   console.log('get session, ', data);
  
  if (error || !user) {
    return res.status(401).json({ error: 'Invalid token' });
  }

//   2. Check the database for Admin or Staff status
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin, is_staff')
    .eq('id', user.id)
    .single();
  console.log('users from profiles tb: ', profile);
  

  if (profile?.is_staff) {
    req.user = user; // Attach user to request
    console.log('use obj: ', user);
    
    next(); // Move to the next function
  } else {
    res.status(403).json({ error: 'Unauthorized: Staff only' });
  }


};

// pm2 restart all && pm2 logs


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

router.post('/scan-tickets', async (req, res) => {
    const {ticketId} = req.body;
    console.log('scanning route');
    
    verifyStaff(req, res, async () => {
         // const secretKey = process.env.ADMIN_SECRET_KEY;

    const todaysDate = new Date().toISOString();

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
    });
    
   
})

router.get('/find-ticket', async (req, res) => {
    const {query} = req.query;
    console.log('route hit')

    try {
        const {data, error} = await supabase.from('tickets').select('*').or(`customer_name.ilike.%${query}%, customer_email.ilike.%${query}%`);

        if (error) {
            console.log(error);
            
            return res.status(500).json({error: error.message});
        }

        res.json(data)
    } catch (error) {
        
    }
})


export default router;

