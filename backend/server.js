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
import axios from 'axios';


//  COMMIT THE LAST CHANGES AND MERGE AND UPDATE DROPLET

// testing table schema 
// id, created_at, type, ticket_qr, is_scanned, customer_email, paymentRef, scanned_at, event_id, customer_name, event_name


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

 
dotenv.config();

const app = express();
// Absolute route for testing
// app.use((req, res, next) => {
//   console.log("HEADERS RECEIVED:", JSON.stringify(req.headers, null, 2));
//   next();
// });

// OPAY DETAILS
const MERCHANT_ID = process.env.OPAY_MERCHANT_ID;

const PUBLIC_KEY= process.env.OPAY_PUBLIC_KEY


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

app.use(cors(corsOptions));
// app.use(express.json({
//     verify: (req, res, buf) => {
//         req.rawBody = buf.toString();
//     }
// }));

app.use(express.json())
app.use(express.static('public'));

// ROUTES 

/* IMPORTANT: when testing locally add the api prefix, 
BUT remove it before deployment */

app.use('/staff', staffRoutes);
app.use('/admin', adminRoutes);


function createTestTicket(req, res) {

    const ref = req.body.payload.reference;
    const cart = req.ticketData;

    console.log('create test ticket function');
    console.log(cart);

    try {

        cart.isProcessed = true;
        console.log(cart);
        
    } catch (error) {
        cart.isProcessed = false;
        console.log(error);
        
    }
    
    
};



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


// 1. Helper function to sort object keys alphabetically
const sortObject = (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(sortObject);
    
    return Object.keys(obj)
        .sort()
        .reduce((result, key) => {
            result[key] = sortObject(obj[key]);
            return result;
        }, {});
};

function verifyOpaySignature(req, res, next) {
    // the signature we receive from opay's webhook
    const sign = req.body.sha512;
    const payload = req.body.payload;
    const SECRET_KEY = process.env.OPAY_SECRET_KEY;

    // first guard / gate
    if(!sign || !payload) {
        console.log('missing payload or sign not found');
        // return res.status(400).send('Missing data');
    } 
   
    

    const amount = payload.amount;
    const currency = payload.currency;
    const reference = payload.reference;
    const refunded = payload.refunded ? "t" : "f"; // PHP: $refunded?"t":"f"
    const status = payload.status;
    const timestamp = payload.timestamp;
    const token = payload.token;
    const transactionId = payload.transactionId;

    const body = req.body;
    console.log('cart from map object');
    const cartData = webhookCache.get(body.payload.reference)
    console.log(cartData);

    // duplicate prevention 1
    if(!cartData) {
        return res.status(200).send('Already processed')
    };

    if(cartData.isProcessed) {
        console.log('duplicate webhook detected');
        return res.status(200).send("OK")
    };


    req.ticketData = cartData;

    // opay does not accept json strings, so we construct it based on wht they did in the docs
    const authJson = `{Amount:"${amount}",Currency:"${currency}",Reference:"${reference}",Refunded:${refunded},Status:"${status}",Timestamp:"${timestamp}",Token:"${token}",TransactionID:"${transactionId}"}`;
   

    // const test1 = crypto.createHmac('sha512', SECRET_KEY)
    //     .update(testingStr)
    //     .digest('hex');

    const computedHash =  crypto.createHmac('sha3-512', SECRET_KEY).update(authJson).digest('hex');


    if(computedHash === sign) {
        console.log('match found');
        next();
    } else {
        console.log('match not found !!');
        console.log("My Constructed String:", authJson);
        console.log("My Hash:", computedHash);
        console.log("Their Sig:", sign)
        // return res.status(401).send('invalid Signature')
    }

};



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


const webhookCache = new Map();

// TESTING WITH OPAY checkout system
app.post('/api/checkout/opay', async (req, res) => {
    // send the amount and the rest of the details in the req.body
    const {amount, email, ticketType, reference, product, ticketData} = req.body;
    // this might be used
    const ticketReference = `TIX-${Date.now()}`

    const productObj = req.body.product;

    webhookCache.set(ticketReference, productObj);

    console.log('checkout endpoint');
    console.log('product object');
    
    console.log(productObj);
    // console.log(req.body);
    
    // delete the cache after 1 hour to save memory !!
    setTimeout(() => webhookCache.delete(ticketReference), 60 * 60 * 1000);


    const payload = {
    amount: amount, // Integer (e.g., 1000 for 1000 NGN)
    currency: "NGN",
    country: "NG",
    reference: ticketReference,
    returnUrl: "http://localhost:5173/",
    callbackUrl: "https://3w9cnvpn-3001.uks1.devtunnels.ms/webhook/opay", // This is where QR is triggered
    userEmail: email,
    productDesc: `Ticket for ${ticketType}`,
    product: product,
    // ticketData: ticketData
  }; 

  try {
    // using axios to send the http request
    const response = await axios.post('https://testapi.opaycheckout.com/api/v1/international/cashier/create', payload, 
        {
        headers: {
          'Authorization': `Bearer ${PUBLIC_KEY}`,
          'MerchantId': MERCHANT_ID,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json(response.data);
    
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to initialize OPay" });
  }


});


app.post('/webhook/opay', (req,res) => {


    res.status(200).json({code: '00000', message: 'SUCCESS'});

    console.log('opay payload');
    console.log(req.headers);  
    
    console.log(req.body);
    console.log('opay headers');

    const paymentRef = req.body.payload.reference;
    // console.log(req.body.sha512);

    // const body = req.body;
    // console.log('cart from map object');
    // const cartData = webhookCache.get(body.payload.reference)
    // console.log(cartData);

    // const cartSummery = eventData.metaData.cart_summery;

    // const parsedCart = JSON.parse(cartSummery);

    if(req.body.payload.status === "SUCCESS") {
        console.log('payment done');
        verifyOpaySignature(req, res, () => {
            console.log('webhook verify function');
            const cartItems = req.ticketData;
            console.log(req.ticketData);

             try {

                // const cartSummery = eventData.metaData.cart_summery;
                // the parsed cart is an array of objects, each object contains one ticket.
                
                const worker = new Worker(path.join(__dirname, 'pdfWorker2.js'), {
                    workerData: {
                        cartItems,
                        paymentRef
                    }
                });

                worker.on('message', (result) => {
                console.log('✅ Ticket Process Finished:', result);
                // Since the worker did the DB insert, we can just respond to Monnify here
                });

                worker.on('error', (err) => {
                    console.error('❌ Worker Process Error:', err);
                    res.status(500).send("error");
                });
                            
            } catch (error) {
                console.log('opay webhook error: ', error);
                
            }

        })
        
    };
    
});


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
    
   };
})

app.get('/api/test', (req, res) => {
    res.status(200).json({message: 'Backend is talking to Nginx'})
})


app.listen(3001, () => {
    console.log('server running on port 3001');
    
});