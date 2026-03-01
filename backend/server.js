import express from 'express'
import cors from 'cors'
import crypto from 'crypto'
import dotenv from 'dotenv'
import { supabase } from './databaseConnection.js';
import staffRoutes from  './routes/staff.js'
import adminRoutes from './routes/adminRoutes.js'
import {dirname} from 'path';
import { fileURLToPath } from 'url'
import { Worker } from 'worker_threads';
import path from 'path';


//  COMMIT THE LAST CHANGES AND MERGE AND UPDATE DROPLET


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

 
dotenv.config();

const app = express();
// Absolute route for testing
// app.use((req, res, next) => {
//   console.log("HEADERS RECEIVED:", JSON.stringify(req.headers, null, 2));
//   next();
// });


// middleware setp
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'https://ticket-hub-xwhv.onrender.com', 
        'https://troveista.com'],
        allowedHeaders: ['Content-Type', 'Authorization'], 
        credentials: true
    // origin: 'https://ticket-hub-xwhv.onrender.com',
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static('public'));

// ROUTES 
// IMPORTANT: when testing locally add the api prefix, BUT remove it before deployment
app.use('/staff', staffRoutes);
app.use('/admin', adminRoutes);


function verifyMonnifySignature (req, res, next) {

    const sign = req.headers['x-monnify-signature'] || req.headers['monnify-signature']
    
    const requestBody = JSON.stringify(req.body, null, 2);

    const requestMetadata = JSON.parse(requestBody).requestMetadata || {};
    

    const secretKey = process.env.MONNIFY_SECRET_KEY;

    const hash = crypto.createHmac('sha512', secretKey).update(JSON.stringify(req.body)).digest('hex')

    // compare the hash with the signature
    if(hash === sign) {
        next();

    } else {
        console.error('Security Alert, invalid signature');
        return res.status(401).send('invalid Signature');
        
    }
}


// TODO: ADD THE OPAY CHECKOUT GATE
app.post('/webhook/monnify', (req, res) => {
     const { eventData } = req.body;

    res.status(200).send("Webhook received by Express")
    // the line below send a response immediately yo monnify
    const sign = req.headers['x-monnify-signature'] || req.headers['monnify-signature']
   

    const cartSummery = eventData.metaData.cart_summery;

    const parsedCart = JSON.parse(cartSummery);

    if (!sign) {
        console.log('No signature found');
        return res.status(400).send("Missing Signature");
    }

    if(eventData.paymentStatus === 'PAID' && sign) {
        verifyMonnifySignature(req, res, () => {        
        console.log('METADATA');
        console.log(eventData.metaData);

            try {

                // const cartSummery = eventData.metaData.cart_summery;
                // the parsed cart is an array of objects, each object contains one ticket.
                

                console.log('parsed cart from metadata', parsedCart);



                const worker = new Worker(path.join(__dirname, 'pdfWorker.js'), {
                    workerData: {
                        eventData
                    }
                });

                worker.on('message', (result) => {
                console.log('✅ Ticket Process Finished:', result);
                // Since the worker did the DB insert, we can just respond to Monnify here
                });

                worker.on('error', (err) => {
                    console.error('❌ Worker Process Error:', err);
                    res.status(500).send("error"); // Tell Monnify it failed
                });
                            
            } catch (error) {
                console.log('webhook error: ', error);
                
            }

        });
   
    } else {
        console.log('nothing found in header');
    }
    

    
})


// When testing locally add the api prefix before the route name
app.post('/api/check-tickets-quantity', async (req, res) => {

    console.log('Checking tickets quantity');
    
    const {eventId} = req.body;

   try {
        const {data, error} = await supabase.from('events').select('total_tickets, sold_tickets').eq('id', eventId).single();

        if(error) console.log('error when checking ticket quantity', error);
    
    /* This var is the gatekeeper to prevent overselling tickets */
        let isAvailable;
        if (data.total_tickets === 0) {
            isAvailable = false;
        } else {
            console.log('ava');
            isAvailable = true;
        }

        return res.status(200).json({isAvailable});

   } catch (error) {
    
   }
})

app.get('/api/test', (req, res) => {
    res.status(200).json({message: 'Backend is talking to Nginx'})
})


app.listen(3001, () => {
    console.log('server running on port 3001');
    
});