import express from 'express'
import cors from 'cors'
import crypto from 'crypto'
import dotenv from 'dotenv'
import QRCode from 'qrcode'
import PDFDocument from 'pdfkit'
import { supabase } from './databaseConnection.js';
import { Resend } from 'resend'

/*
    Monnify Webhook is connecting to the server through vs code ports
*/
 

// https://p846l2pq-3001.uks1.devtunnels.ms/
dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173'
}
app.use(cors(corsOptions))

app.use(express.json())

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

async function generatePdfTicket(customerName, ticketId, verifyUrl, type) {

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


    const doc = new PDFDocument({size: 'A6'});
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

        const {data: urlData, error: urlError} = supabase.storage.from('tickets_qr_codes').getPublicUrl(`ticket_${ticketId}.pdf`)

        console.log('error when fetching the url', urlError)


        const {error: insertToTableError} = await supabase.from('tickets').insert([{
            id: ticketId,
            customerEmail: 'test15@gmail.com',
            paymentRef: 'TESTPAYMENTREF1234',
            type: type,
            ticket_qr: urlData.publicUrl,
            is_scanned: false,
        }])

        if(insertToTableError) {
            console.log('ticket was not saved to database', insertToTableError);
        }
    })

    /* PDF DESIGN */

    // Background and border
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(secondaryColor);
    doc.rect(0, 0, doc.page.width, 40).fill(themeColor);

    // Header Text
    doc.fillColor(isVip ? 'white' : 'white').fontSize(20).text(`${type.toUpperCase()} PASS`, 0, 12, {align: 'center'})

    // Customer Name 
    doc.fillColor(isVip? 'white': 'black').fontSize(14).text('HOLDER: manal', 20, 60).fontSize(20);

    // The qr code image
    doc.image(qrBuffer, (doc.page.width / 2) - 100, 120, {width: 200})


    // Ticket ID for manual backup

    doc.fontSize(8).fillColor('gray').text(`ID: ${ticketId}`, 0, 340, {align: 'center'})

    doc.end();
    // doc.text('This is your ticket');
    // doc.image(qrBuffer);
    // doc.end();
    // console.log('ticket pdf file saved to database')

}


/*SAVE THE PAYMENT REF TO THE DB  */
async function createTicket(cart){
    // const ticketId = crypto.randomUUID();
    // const verificationUrl = `http://localhost:5173/verify?ticketId=${ticketId}`;
    const resend = new Resend(process.env.RESEND_KEY);  
    
    let attachments = [];

    console.log('looping through cart items from localstorage');
    
    for(const item of cart) {
        const type = item.type;
        const quantity = item.qty;
        const itemId = item.id;

        console.log('--- start the ticket generation process ---');

        for(let i = 0; i < quantity; i++) {
            const ticketId = crypto.randomUUID();

            const verUrl = `http://localhost:5173/verify/${ticketId}?type=${type}`;
            
            const pdfBuffer = await generatePdfTicket('test user', ticketId, verUrl, type);

            attachments.push({
                fileName: `ticket_${ticketId}.pdf`,
                content: pdfBuffer
            })

            console.log(`creating ${type} Ticket #${i + 1} with: Ticket_Id:${itemId}`);
        }

        
        // testing resend with more then one ticket attachments. BUG: this is not working check the notes file for error
        const {data, error} = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'green.engil13@gmail.com',
        subject: 'Hello from Resend!',
        html: '<p>This email was sent using Resend!, see your ticket</p>',
        attachments: attachments
        });

        if(error) {
            return console.log('error sending email', error);
        }

        console.log('email sent');
    }
    
}


// this rote is working and the ticket is being saved to db in storage and the tickets table.
app.post('/webhook/monnify', (req, res) => {
    const {eventData: {metaData}} = req.body;
    // the line below send a response immediately yo monnify
    res.status(200).send("Webhook received by Express")

    console.log('METADATA');
    console.log(metaData);

    const cartSummery = metaData.cart_summery;
    // the parsed cart is an array of objects, each object contains one ticket.
    const parsedCart = JSON.parse(cartSummery);

    console.log('parsed cart from metadata', parsedCart);
    
    verifyMonnifySignature(req, res, () => {
        createTicket(parsedCart);
    });
    // looking for the monnify signature header
    const sign = req.headers['x-monnify-signature'] || req.headers['monnify-signature']
    
    if(sign) {
        console.log(`signature found: ${sign}`);   
    } else {
        console.log('nothing found in header');
    }

    // res.status(200).send("Webhook received by Express")
    
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

app.post('/api/verify-staff', (req, res) => {
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


// localtunnel https://dry-sides-admire.loca.lt running




app.listen(3001, () => {
    console.log('server running on port 3001');
    
})