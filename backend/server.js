import express from 'express'
import cors from 'cors'
import crypto from 'crypto'
import dotenv from 'dotenv'
import QRCode from 'qrcode'
import PDFDocument from 'pdfkit';
import { supabase } from './databaseConnection.js';

import staffRoutes from  './routes/staff.js'
import adminRoutes from './routes/adminRoutes.js'
import fs from 'fs';
import {dirname, join} from 'path';
import { fileURLToPath } from 'url'
import { Worker } from 'worker_threads';
import path from 'path';
import { PassThrough } from 'stream'

//  TESTING WORKER THREADS



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

 
dotenv.config();

const app = express();
// Absolute route for testing
// app.use((req, res, next) => {
//   console.log("HEADERS RECEIVED:", JSON.stringify(req.headers, null, 2));
//   next();
// });


// Resend setup


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

// IMPORTANT: when testing locally add the api prifxe
app.use('/api/staff', staffRoutes);
app.use('/api/admin', adminRoutes);






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

// this function is working, test against the db and it updates the sold tickets count
// async function updateDb(eventId) {

//     const {error: rpcError} = await supabase.rpc('handle_ticket_sale', {
//         target_event_id: eventId
//     })

//     if(rpcError) {
//         console.log('updating db failed', rpcError);
    
//     }
// }


async function generatePdfTicket({customerName, ticketId, verifyUrl, type, eventName, imageBuffer}) {

  return new Promise(async (resolve, reject) => {
      // creating a unique design for each ticket

    const isVip = type === 'vip';
    const themeColor = isVip ? '#D4AF37' : '#2E5BFF';
    const secondaryColor = isVip ? '#000000' : '#FFFFFF';

    const qrBuffer = await QRCode.toBuffer(verifyUrl, {
        color: {
            dark: isVip ? '#000000' : '#000000',
            light: '#FFFFFF' 
        },
        width: 200,
    });

    const ticketType = isVip ? '#fbbf24' : '#2563eb';


    // break point

    const doc = new PDFDocument({size: [420, 420],
        margins: {top:0, left:0, right:0, bottom:0}
    });

    let chunks = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)))

    // 1 background image
    const imagePath = join(__dirname, './public/event-sample.jpeg');

    // Adding event image as the ticket background 
    doc.image(imageBuffer, 0, 0, {
        width: doc.page.width,
        height: doc.page.height
    });

    // 2 Overlay 
    doc.save().rect(0,0, doc.page.width, doc.page.height).fillColor('#000000').fillOpacity(0.4).fill().restore();


    const rowTop = 100;       // Vertical position of both cards
    const cardGap = 11;       // Space between the two cards
    
    const leftCardX = 20;
    const leftCardWidth = 260;
    const leftCardHeight = 120;

    const rightCardX = leftCardX + leftCardWidth + cardGap;
    const rightCardSize = 130; // Square
    const qrSize = 120

    // Trying to center the two sections
    const totalWidth = leftCardWidth + cardGap + rightCardSize
    const startX = (doc.page.width - totalWidth) / 2;
    const rowY = (doc.page.height - leftCardHeight) / 2;

     doc.image(qrBuffer, rightCardX, 110, {width: qrSize - 20})

    // Ticket info section/ left side 
    doc.save()
        .rect(leftCardX, rowTop, leftCardWidth, leftCardHeight, 10)
        .fillColor('white').fillOpacity(0.9).fill()
        .restore();
    

        // light gray color: '#1a1a1a'
       // Left Card Text
        doc.fillColor('#1a1a1a').font('Helvetica-Bold').fontSize(16)
        .text(eventName, leftCardX + 20, rowTop + 20);
        
        doc.fontSize(12).font('Helvetica').fillColor('#444444')
        .text(`Holder: ${customerName}`, leftCardX + 20, rowTop + 100)
        .text(`Date: jan 12`, leftCardX + 20, rowTop + 50)
        .text(`Location: 123 event center, kano`, leftCardX + 20, rowTop + 75)

        doc.fillColor(ticketType).fontSize(10).text(`${type.toUpperCase()} TICKET`, leftCardX + 170, rowTop + 10).fillColor(ticketType);
         
   

    doc.fontSize(15).fillColor('gray').text(`ID: ${ticketId}`, 0, 340, {align: 'center'})

    doc.end();
  })
}




/*SAVE THE PAYMENT REF TO THE DB  */


// app.get('/webhook/monnify', (req, res) => {
//     res.send("The tunnel is working! Now send a POST request via Monnify or Postman.");
// });

// this rote is working and the ticket is being saved to db in storage and the tickets table. BUG: THIS ROUTE IS NOT RETURNING ANYTHING fix it before you try to do anything else
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


    // looking for the monnify signature header
   
    

   
       
        // debugging logs
        console.log(`signature found: ${sign}`);   
        console.log('event data object')
        console.log(eventData);
    } else {
        console.log('nothing found in header');
    }
    

    
})

// file:///C:/Users/king/Downloads/ticket_e03537c0-1af9-4bfc-a3fb-cec082827ed6.pdf


// 
// When testing locally add the api prefix before the route name
app.post('/api/check-tickets-quantity', async (req, res) => {

    const {eventId} = req.body;

   try {
        console.log(eventId);

    
        const {data, error} = await supabase.from('events').select('total_tickets, sold_tickets').eq('id', eventId).single();

        if(error) console.log('error when checking ticket quantity', error);
    
    /* This var is the gatekeeper to prevent overselling tickets */
        let isAvailable;
        if (data.total_tickets === 0) {
            console.log('sold out');
            isAvailable = false;
        } else {
            console.log('ava');
            isAvailable = true;
        }

        console.log('isAvaliable var');
        console.log(isAvailable);
        
        

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