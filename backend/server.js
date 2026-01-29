import express from 'express'
import cors from 'cors'
import crypto from 'crypto'
import dotenv from 'dotenv'
import QRCode from 'qrcode'
import PDFDocument from 'pdfkit'
import { supabase } from './databaseConnection.js';
import { Resend } from 'resend'
import staffRoutes from  './routes/staff.js'
import adminRoutes from './routes/adminRoutes.js'
import fs from 'fs';
import {dirname, join} from 'path';
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

 

// vs code ports tunnel:  https://p846l2pq-3001.uks1.devtunnels.ms/

// Ngrok Url: https://organological-shaunta-exceptionably.ngrok-free.dev
dotenv.config();

const app = express();

// Resend setup
const resend = new Resend(process.env.RESEND_KEY)

// middleware setp
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'https://ticket-hub-xwhv.onrender.com', 
        'https://troveista.com/']
    // origin: 'https://ticket-hub-xwhv.onrender.com',
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static('public'));


// ROUTES 

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

// this function is working test against the db and it updates the sold tickets count
async function updateDb(eventId) {

    const {error: rpcError} = await supabase.rpc('handle_ticket_sale', {
        target_event_id: eventId
    })

    if(rpcError) {
        console.log('updating db failed', rpcError);
    
    }
}

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

    // doc.on('end', async () => {
    //     const finalPdfBuffer = Buffer.concat(chunks);   

    //     // sending to supabse storage bucket
    //     const {data: uploadedData, error: uploadError} = await supabase.storage.from('tickets_qr_codes').upload(`ticket_${ticketId}.pdf`, finalPdfBuffer, {
    //         contentType: 'application/pdf',
    //         upsert: true
    //     })

    //     if(uploadError) return uploadError;

    //     // fetching the pdf url to store it in the tickets table 
    //     const {data: urlData, error: urlError} = supabase.storage.from('tickets_qr_codes').getPublicUrl(`ticket_${ticketId}.pdf`)
    //     updateDb(eventId)

    //     console.log('error when fetching the url', urlError)

    //     const {error: insertToTableError} = await supabase.from('tickets').insert([{
    //         id: ticketId,
    //         customer_email: customerEmail,
    //         customer_name: customerName,
    //         paymentRef: paymentRef,
    //         type: type,
    //         ticket_qr: urlData.publicUrl,
    //         is_scanned: false,
    //         event_name: eventName,
    //         event_id: eventId,
    //     }]);

    //     if(insertToTableError) {
    //         console.log('ticket was not saved to database', insertToTableError);
    //     }

    //     // const { error: countError } = await supabase.rpc('increment_sold_count', { 
    //     //     target_event_id: eventId 
    //     // });

    //     // if(countError) console.log('could not update count', countError);
    // })


    // 1 background image
    const imagePath = join(__dirname, './public/event-sample.jpeg');

    // Adding event image as the ticket background 
    doc.image(imageBuffer, 0, 0, {
        width: doc.page.width,
        height: doc.page.height
    });

    // 2 Overlay 
    doc.save().rect(0,0, doc.page.width, doc.page.height).fillColor('#000000').fillOpacity(0.4).fill().restore();

    // Header Text
    // doc.fillColor(isVip ? 'white' : 'white').fontSize(20).text(`${type.toUpperCase()} PASS`, 0, 15, {align: 'center'})

    // doc.fillColor(isVip? 'white': 'white').fontSize(16).text(`Holder: ${customerName}`, 0, 75, {align: 'center'})

    // doc.fillColor(isVip? 'white': 'white').fontSize(16).text(`Event Name: ${eventName}`, 10, 100, {align: 'center'})

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

    // right square qr box
    // doc.save()
    //    .roundedRect(startX + leftCardWidth + cardGap, rowY, rightCardSize, leftCardHeight, 10) // Same height as left card for symmetry
    //    .fillColor('white').fillOpacity(1).fill()
    //    .fill();

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
         
    // The qr code image

    // const qrSize = 150
    // const pageWidth = doc.page.width;
    // const pageHeight = doc.page.height;
    // const centerX = (pageWidth - qrSize) / 2;
    // const gap = 20;

    // const centerY = 100 + 30 + gap;
    // doc.image(qrBuffer, rightCardX + 15, rowTop+ 25, {width: qrSize - 20})
    
    // Ticket ID for manual backup

    doc.fontSize(15).fillColor('gray').text(`ID: ${ticketId}`, 0, 340, {align: 'center'})

    doc.end();
  })
    // doc.text('This is your ticket');
    // doc.image(qrBuffer);
    // doc.end();
    // console.log('ticket pdf file saved to database')

}

async function createImageBuffer(url) {
    const response = await fetch(url);
    if(!response.ok) throw new Error('Failed to fetch image, ', response.statusText);
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer)
} 


/*SAVE THE PAYMENT REF TO THE DB  */
async function createTicket(eventData){
    const cartSummery = eventData.metaData.cart_summery;
    // the parsed cart is an array of objects, each object contains one ticket.
    const cart = JSON.parse(cartSummery);


    const customerName = eventData.metaData.customer_name;
    const customerEmail = eventData.metaData.customer_email;
    const paymentRef = eventData.paymentReference;

    const attachments = [];
    for(const item of cart) {
        const type = item.type;
        const quantity = item.qty;
        const itemId = item.eventId;
        const eventName = item.title;
        const image = item.image;
        console.log('--- start the ticket generation process ---');
        // creating an event image buffer
       const imageBuffer = await createImageBuffer(image);

        // let ticketId;
        for(let i = 0; i < quantity; i++) {
            const ticketId = crypto.randomUUID();

            const verUrl = `http://localhost:5173/verify/${ticketId}?type=${type}`;
            // const verUrl = `https://ticket-hub-xwhv.onrender.com/verify/${ticketId}?type=${type}`
             // {customerName, ticketId, verifyUrl, type, eventName}
            const pdfBuffer = await generatePdfTicket({
                customerName: customerName,
                ticketId: ticketId,
                verifyUrl: verUrl,
                type: type,
                eventName: eventName,
                imageBuffer: imageBuffer
            });


            const {data: uploadedData, error: uploadError} = await supabase.storage.from('tickets_qr_codes').upload(`ticket_${ticketId}.pdf`, pdfBuffer, {
            contentType: 'application/pdf',
            upsert: true
        })

        if(uploadError) return uploadError;

        // fetching the pdf url to store it in the tickets table 
        const {data: urlData, error: urlError} = supabase.storage.from('tickets_qr_codes').getPublicUrl(`ticket_${ticketId}.pdf`);


        updateDb(itemId)

        console.log('error when fetching the url', urlError)

        const {error: insertToTableError} = await supabase.from('tickets').insert([{
            id: ticketId,
            customer_email: customerEmail,
            customer_name: customerName,
            paymentRef: paymentRef,
            type: type,
            ticket_qr: urlData.publicUrl,
            is_scanned: false,
            event_name: eventName,
            event_id: itemId,
        }]);

        if(insertToTableError) {
            console.log('ticket was not saved to database', insertToTableError);
            }

            attachments.push({
                filename: `ticket_${eventName}.pdf`,
                content: pdfBuffer
            })

            console.log(`creating ${type} Ticket #${i + 1} with: Ticket_Id:${itemId}`);
        };
           

            // const finalPdfBuffer = Buffer.concat(chunks);   

        
    };

    

    const {data: resendData, error} = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'green.engil13@gmail.com',
        subject: 'Hello from Resend!',
        html: '<p>This email was sent using Resend!, see your ticket</p>',
        attachments: attachments
    });

        if(error) {
            return console.log('error sending email', error);
        };
        // RESEND IS NOT WORKING FIX IT
};


// this rote is working and the ticket is being saved to db in storage and the tickets table. BUG: THIS ROUTE IS NOT RETURNING ANYTHING fix it before you try to do anything else
app.post('/webhook/monnify', (req, res) => {
    const { eventData } = req.body;
    // the line below send a response immediately yo monnify
    res.status(200).send("Webhook received by Express")

    console.log('METADATA');
    console.log(eventData.metaData);

    const cartSummery = eventData.metaData.cart_summery;
    // the parsed cart is an array of objects, each object contains one ticket.
    const parsedCart = JSON.parse(cartSummery);

    console.log('parsed cart from metadata', parsedCart);
    
   
    // looking for the monnify signature header
    const sign = req.headers['x-monnify-signature'] || req.headers['monnify-signature']
    

    if(eventData.paymentStatus === 'PAID' && sign) {

        verifyMonnifySignature(req, res, () => {
            createTicket(eventData);
        });

        // debugging logs
        console.log(`signature found: ${sign}`);   
        console.log('event data object')
        console.log(eventData);
    } else {
        console.log('nothing found in header');
    }

    
})

// file:///C:/Users/king/Downloads/ticket_e03537c0-1af9-4bfc-a3fb-cec082827ed6.pdf



app.post('/api/check-tickets-quantity', async (req, res) => {

    const {eventId} = req.body;

    console.log(eventId);

    
    const {data, error} = await supabase.from('events').select('total_tickets, sold_tickets').eq('id', eventId).single();

    if(error) console.log('error when checking ticket quantity', error);
    
    /* This var is the gatekeeper to prevent overselling tickets */
    const isAvailable = data.sold_tickets < data.total_tickets;

    return res.status(200).json({isAvailable});

})

app.get('/api/test', (req, res) => {
    res.status(200).json({message: 'Backend is talking to Nginx'})
})


app.listen(3001, () => {
    console.log('server running on port 3001');
    
});