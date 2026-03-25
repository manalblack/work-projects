import {parentPort, workerData} from 'worker_threads';
import QRCode from 'qrcode'
import PDFDocument from 'pdfkit'
import { supabase } from './databaseConnection.js';
import {dirname, join} from 'path';
import fs from 'fs'
import { PassThrough } from 'stream';
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { Resend } from 'resend'
import sharp from 'sharp';

// FIX THIS FILE ASAP FUCK!!


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resend = new Resend(process.env.RESEND_KEY)
 

dotenv.config();
console.log('🧵 WORKER THREAD STARTING... Data received:');


async function updateDb(eventId) {

    const {error: rpcError} = await supabase.rpc('handle_ticket_sale', {
        target_event_id: eventId
    })

    if(rpcError) {
        console.log('updating db failed', rpcError);
    
    }
}

async function generatePdfTicket({customerName, ticketId, verifyUrl, type, eventName, imageBuffer, address, date}) {

 
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

    const doc = new PDFDocument({size: [420, 420],
        margins: {top:0, left:0, right:0, bottom:0},
        compress: true
    });
    
    // Increase the internal buffer size slightly for stability
    const stream = new PassThrough({ highWaterMark: 64 * 1024 });
    doc.pipe(stream);

    // 1 background image
    const imagePath = join(__dirname, './public/event-sample.jpeg');

    // Adding event image as the ticket background 
    doc.image(imageBuffer, 0, 0, {
        width: doc.page.width,
        height: doc.page.height
    });

    // testing pdf size without background image !!!
//     doc.rect(0, 0, doc.page.width, doc.page.height)
//    .fillColor('#f3f4f6')
//    .fill();


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
        .text(`Date: ${date}`, leftCardX + 20, rowTop + 40)
        .text(`Location: ${address}`, leftCardX + 20, rowTop + 60, {
            width: 200,
            lineGap: 2,
        })

        doc.fillColor(ticketType).fontSize(10).text(`${type.toUpperCase()} TICKET`, leftCardX + 170, rowTop + 10).fillColor(ticketType);
         
   

    doc.fontSize(15).fillColor('gray').text(`ID: ${ticketId}`, 0, 340, {align: 'center'})



    doc.end();

    return stream;


}



async function createImageBuffer(url) {

    const response = await fetch(url);
    if(!response.ok) throw new Error('Failed to fetch image, ', response.statusText);
    const arrayBuffer = await response.arrayBuffer();

    const inputBuffer = Buffer.from(arrayBuffer);

    // sharp.cache(false);

    const processedBuffer = await sharp(inputBuffer). resize(420, 420, { 
            fit: 'cover',      // Ensures it fills the ticket area
            position: 'center' 
        })
        .jpeg({ quality: 60 }) // 60% quality looks great but uses much less RAM
        .toBuffer();

        return processedBuffer;
}



// TODO: CONSTRUCT the data and send it to the pdf function 

async function createTicket(){

    const cartString = workerData.cartItems;

    console.log('worker data');
    console.log(workerData.cartItems.cart_summery);
    // console.log(workerData.cartItems.paymentRef);
    const cart = JSON.parse(workerData.cartItems.cart_summery);
    console.log('parse cart and user info');
    console.log(cart);
    console.log(cartString.customer_email);
    console.log(cartString.customer_name);
    
    

    try {
        
    const cartSummery = workerData;
    // the parsed cart is an array of objects, each object contains one ticket.

    

    console.log('cart worker summary');

    console.log(cart);
    
    

    const customerName = workerData.eventData.metaData.customer_name;
    const customerEmail = workerData.eventData.metaData.customer_email;
    const paymentRef = workerData.eventData.paymentReference;


    const attachments = [];

    let ticketsHtmlList;

    for(const item of cart) {

        const type = item.type;
        const quantity = item.qty;
        const itemId = item.eventId;
        const eventName = item.title;
        const image = item.image;
        const address = item.address;
        const date = item.date;
        console.log('--- start the ticket generation process ---');
        // creating an event image buffer
       let imageBuffer = await createImageBuffer(image);


        
        for(let i = 0; i < quantity; i++) {
            const ticketId = crypto.randomUUID();

            const siteUrl = process.env.SITE_URL;
            
            const verUrl = `${siteUrl}/verify/${ticketId}?type=${type}`;

            // const verUrl = `https://ticket-hub-xwhv.onrender.com/verify/${ticketId}?type=${type}`

            let pdfStream = await generatePdfTicket({
                customerName: customerName,
                ticketId: ticketId,
                verifyUrl: verUrl,
                type: type,
                eventName: eventName,
                imageBuffer: imageBuffer,
                address: address,
                date: date
            });


            // VERY IMPORTANT: change the bucket before deployment 
            const {data: uploadedData, error: uploadError} = await supabase.storage.from('testing').upload(`ticket_${ticketId}.pdf`, pdfStream, {
            contentType: 'application/pdf',
            duplex: 'half',
            upsert: true
        })

        if(uploadError) return uploadError;

        // Cleanup attempt
        pdfStream.destroy();    

        

        // VERY IMPORTANT: change the bucket before deployment 
        const {data: urlData, error: urlError} = supabase.storage.from('testing').getPublicUrl(`ticket_${ticketId}.pdf`);

       

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
            content: urlData.publicUrl
            });

            

            // Updating the sold tickets column in the database
            updateDb(itemId)
            
    
        };

        imageBuffer = null;
        if (global.gc) {
            global.gc(); 
        }
        
    }

    ticketsHtmlList = attachments.map((url, index) => {
        return `
            <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <p style="margin: 0 0 10px 0; font-weight: bold;">Ticket #${index + 1}</p>
                <a href="${url.content}" 
                style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Download PDF
                </a>
            </div>
        `;
    }).join(''); // join('') turns the array into one long string

     const {data: resendData, error} = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'green.engil13@gmail.com',
            subject: 'Hello from Resend!',
            html: 
            `
            <div style="font-family: sans-serif; max-width: 600px;">
                <h2>Thank you for your purchase!</h2>
                <p>Your order for ${attachments.length} ticket(s) was successful. You can find your download links below:</p>
                ${ticketsHtmlList}
                <p style="margin-top: 30px; font-size: 12px; color: #666;">
                    If the buttons don't work, copy and paste the links directly into your browser.
                </p>
            </div>`,
        });

        // Clearing the array after sending the email 
        attachments.length = 0;
        if(error) {
            return console.log('error sending email', error);
        };

        
        // const used = process.memoryUsage().heapUsed / 1024 / 1024;
        // console.log(`📊 Memory usage: ${Math.round(used * 100) / 100} MB`);

        // if (used > 18) {
        //     console.warn("⚠️ WARNING: Approaching 21MB RAM limit!");
        // }   

        // console.log(`Memory after ticket: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`);

        // console.log("🧹 Cleanup complete.");

        parentPort.postMessage({status: 'success'})

        console.log('ticket created and added to database');
        

    } catch (error) {
        parentPort.postMessage({status: 'error', message: error.message})
    }

}

// Start the worker 
createTicket(workerData);