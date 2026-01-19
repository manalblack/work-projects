import express from 'express'
import cors from 'cors'
import crypto from 'crypto'
import dotenv from 'dotenv'
import QRCode from 'qrcode'
import PDFDocument from 'pdfkit'
import { supabase } from './databaseConnection.js';
import { Resend } from 'resend'
import staffRoutes from  './routes/staff.js'

/*
    Monnify Webhook is connecting to the server through vs code ports
*/
 

// vs code ports tunnel:  https://p846l2pq-3001.uks1.devtunnels.ms/

// Ngrok Url: https://organological-shaunta-exceptionably.ngrok-free.dev
dotenv.config();

const app = express();

// Resend setup
const resend = new Resend(process.env.RESEND_KEY)

// middleware setp
const corsOptions = {
    origin: ['http://localhost:5173', 'https://ticket-hub-xwhv.onrender.com']
    // origin: 'https://ticket-hub-xwhv.onrender.com',
}
app.use(cors(corsOptions))
app.use(express.json())


// ROUTES 
app.use('/api', staffRoutes)


/* ADD these line to debug and check what the webhook 
    console.log('monnify webhook');

    console.log('BODY');
    console.log(JSON.stringify(req.body, null, 2));

    console.log('ALL HEADERS');
    console.log(req.headers); 

*/

function verifyMonnifySignature (req, res, next) {

    const sign = req.headers['x-monnify-signature'] || req.headers['monnify-signature']
    
    const requestBody = JSON.stringify(req.body, null, 2);

    const requestMetadata = JSON.parse(requestBody).requestMetadata || {};

    console.log('sign var from verification function', sign);

    console.log('BODY');
    console.log(req.body);
    
    

    const secretKey = process.env.MONNIFY_SECRET_KEY;

    const hash = crypto.createHmac('sha512', secretKey).update(JSON.stringify(req.body)).digest('hex')

    // compare the hash with the signature
    if(hash === sign) {
        console.log('Signature verified');
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

async function generatePdfTicket({customerName, customerEmail, ticketId, verifyUrl, type, eventId, paymentRef, eventName}) {

    // creating a unique design for each ticket

    const isVip = type === 'vip';
    const themeColor = isVip ? '#D4AF37' : '#2E5BFF';
    const secondaryColor = isVip ? '#000000' : '#FFFFFF';

    const qrBuffer = await QRCode.toBuffer(verifyUrl, {
        color: {
            dark: isVip ? '#000000' : '#000000',
            light: '#FFFFFF' 
        },
        width: 200
    });


    const doc = new PDFDocument({size: [400, 400],
        margins: {top:0, left:0, right:0, bottom:0}
    });

    let chunks = [];

    doc.on('data', (chunk) => chunks.push(chunk));

    doc.on('end', async () => {
        const finalPdfBuffer = Buffer.concat(chunks);   

        // sending to supabse storage bucket
        const {data: uploadedData, error: uploadError} = await supabase.storage.from('tickets_qr_codes').upload(`ticket_${ticketId}.pdf`, finalPdfBuffer, {
            contentType: 'application/pdf',
            upsert: true
        })

        if(uploadError) return uploadError;

        // fetching the pdf url to store it in the tickets table 
        const {data: urlData, error: urlError} = supabase.storage.from('tickets_qr_codes').getPublicUrl(`ticket_${ticketId}.pdf`)
        updateDb(eventId)

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
            event_id: eventId,
        }]);

        if(insertToTableError) {
            console.log('ticket was not saved to database', insertToTableError);
        }

        // const { error: countError } = await supabase.rpc('increment_sold_count', { 
        //     target_event_id: eventId 
        // });

        // if(countError) console.log('could not update count', countError);
    })

    


    /* PDF DESIGN */

    // Background and border
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(secondaryColor);
    doc.rect(0, 0, doc.page.width, 45).fill(themeColor);

    // Header Text
    doc.fillColor(isVip ? 'white' : 'white').fontSize(20).text(`${type.toUpperCase()} PASS`, 0, 15, {align: 'center'})

    // Customer Name
    doc.fillColor(isVip? 'white': 'black').fontSize(16).text(`Holder: ${customerName}`, 0, 75, {align: 'center'})

    doc.fillColor(isVip? 'white': 'black').fontSize(16).text(`Event Name: ${eventName}`, 50, 100, {align: 'center'})
    // The qr code image

    const qrSize = 150
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const centerX = (pageWidth - qrSize) / 2;
    const gap = 20;
    const centerY = 100 + 30 + gap;
    doc.image(qrBuffer, centerX, centerY, {width: qrSize})


    // Ticket ID for manual backup

    doc.fontSize(15).fillColor('gray').text(`ID: ${ticketId}`, 0, 340, {align: 'center'})

    doc.end();
    // doc.text('This is your ticket');
    // doc.image(qrBuffer);
    // doc.end();
    // console.log('ticket pdf file saved to database')

}



/*SAVE THE PAYMENT REF TO THE DB  */
async function createTicket(eventData){
    // const ticketId = crypto.randomUUID();
    // const verificationUrl = `http://localhost:5173/verify?ticketId=${ticketId}`;
    // const resend = new Resend(process.env.RESEND_KEY);  

    const cartSummery = eventData.metaData.cart_summery;
    // the parsed cart is an array of objects, each object contains one ticket.
    const cart = JSON.parse(cartSummery);

    let attachments = [];
    console.log('eventData object received in createTicket function passed from monify webhook');  
    console.log(eventData);

    const customerName = eventData.metaData.customer_name;
    const customerEmail = eventData.metaData.customer_email;
    const paymentRef = eventData.paymentReference;

    console.log('customer name: ', customerName);
    console.log('customer email: ', customerEmail);
    console.log('payment ref: ', paymentRef);

    console.log('looping through cart items from localstorage');
    console.log(cart);
    
    for(const item of cart) {
        const type = item.type;
        const quantity = item.qty;
        const itemId = item.eventId;
        const eventName = item.title;

        console.log('--- start the ticket generation process ---');

        for(let i = 0; i < quantity; i++) {
            const ticketId = crypto.randomUUID();

            // const verUrl = `http://localhost:5173/verify/${ticketId}?type=${type}`;
            const verUrl = `https://ticket-hub-xwhv.onrender.com/verify/${ticketId}?type=${type}`
            
            const pdfBuffer = await generatePdfTicket({
                customerName: customerName,
                customerEmail: customerEmail,
                ticketId: ticketId,
                verifyUrl: verUrl,
                type: type,
                eventId: itemId,
                paymentRef: paymentRef,
                eventName: eventName
            });


            attachments.push({
                filename: `ticket_${ticketId}.pdf`,
                content: pdfBuffer
            })

            console.log(`creating ${type} Ticket #${i + 1} with: Ticket_Id:${itemId}`);
        }

        
        // testing resend with more then one ticket attachments. BUG: this is not working check the notes file for error
        const {data: resendData, error} = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'green.engil13@gmail.com',
            subject: 'Hello from Resend!',
            html: '<p>This email was sent using Resend!, see your ticket</p>',
            attachments: attachments
        });

        if(error) {
            return console.log('error sending email', error);
        }

        console.log('EMAIL SENT');
        console.log(resendData)
    };
    
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



const testItems = [
  {
    id: 11,
    title: ' Black lights event',
    type: 'regular',
    price: 2000,
    vipPrice: 5500,
    regularPrice: 2000,
    qty: 1
  },
  {
    id: '41446b84-e713-4cbc-9a5d-e14a5029cbcb',
    title: 'Lagos Summer Jam 2026',
    type: 'vip',
    price: 4000,
    vipPrice: 4000,
    regularPrice: 2000,
    qty: 1
  },
  {
    id: '41446b84-e713-4cbc-9a5d-e14a5029cbcb',
    title: 'Lagos Summer Jam 2026',
    type: 'regular',
    price: 2000,
    vipPrice: 4000,
    regularPrice: 2000,
    qty: 1
  }
]


app.post('/test-route', (req, res) => {

    createTicket();
    res.status(200).send("Test route received by Express")
})


app.post('/api/check-tickets-quantity', async (req, res) => {

    const {eventId} = req.body;

    console.log(eventId);
    
    // const testData = {
    //     totalTickets: 100,
    //     soldTickets: 100
    // }

    const {data, error} = await supabase.from('events').select('total_tickets, sold_tickets').eq('id', eventId).single();

    if(error) console.log('error when checking ticket quantity', error)
    
    /* This var is checking the gatekeeper to prevent overselling tickets */

    const isAvailable = data.sold_tickets < data.total_tickets;
    // if(data.sold_tickets === data.totalTickets) {
    //     console.log('equals');

    // } else if(data.sold_tickets < data.totalTickets) {
    //     console.log('less than');
    // }


    // console.log(isAvailable);
    // console.log(data);

    return res.status(200).json({isAvailable});
    
})

// app.post('/api/verify-staff', (req, res) => {
//     const {password} = req.body;
//     const staffPass = process.env.ADMIN_PASS;

//     if(password === staffPass) {
//         res.json({accessGranted: true, staffToken: "EVENT_STAFF_TOKEN_2026"});
//         console.log('Match');
        
//     } else {
//         res.json({accessGranted: false});
//     }

//     console.log(password);
    
// })



// localtunnel https://dry-sides-admire.loca.lt running




app.listen(3001, () => {
    console.log('server running on port 3001');
    
});