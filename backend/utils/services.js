import QRCode from 'qrcode'
import PDFDocument from 'pdfkit'
import { supabase } from '../databaseConnection.js';


// frontend url
const siteUrl = process.env.SITE_URL;

async function updateDb(eventId) {

    const {error: rpcError} = await supabase.rpc('handle_ticket_sale', {
        target_event_id: eventId
    })

    if(rpcError) {
        console.log('updating db failed', rpcError);
    
    }
}

async function generatePdfTicket({customerName, ticketId, verifyUrl, type, eventName, imageBuffer, location, date}) {

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
        .text(eventName, leftCardX + 20, rowTop + 10);
        
        doc.fontSize(12).font('Helvetica').fillColor('#444444')
        .text(`Holder: ${customerName}`, leftCardX + 20, rowTop + 100)
        .text(`Date: ${date}`, leftCardX + 20, rowTop + 40)
        .text(`Location: ${location}`, leftCardX + 20, rowTop + 60, {
            width: 200,
            lineGap: 2,
        })

        doc.fillColor(ticketType).fontSize(10).text(`${type.toUpperCase()} TICKET`, leftCardX + 170, rowTop + 10).fillColor(ticketType);
         
    
    // Ticket ID for manual backup

    doc.fontSize(15).fillColor('gray').text(`ID: ${ticketId}`, 0, 340, {align: 'center'})

    doc.end();
  })
}

async function createImageBuffer(url) {
    const response = await fetch(url);
    if(!response.ok) throw new Error('Failed to fetch image, ', response.statusText);
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer)
} 

async function createTicket({eventData, ticketInfo}){
    

    // Event information
    const image = eventData.image
    const eventName = eventData.title
    const eventId = eventData.id;
    const location = eventData.location;
    const eventDate = eventData.date

    // Ticket information
    const type = ticketInfo.type;
    const customerName = ticketInfo.customerName;
    const customerEmail = ticketInfo.customerEmail


    const imageBuffer = await createImageBuffer(image);

    const ticketId = crypto.randomUUID();

    const verUrl = `${siteUrl}/verify/${ticketId}?type=${type}`

    // const verUrl = `http://localhost:5173/verify/${ticketId}?type=${type}`;
        
    const pdfBuffer = await generatePdfTicket({
        customerName: customerName,
        ticketId: ticketId,
        verifyUrl: verUrl,
        type: type,
        eventName: eventName,
        imageBuffer: imageBuffer,
        location: location,
        date: eventDate,
    });

    const {data: uploadedData, error: uploadError} = await supabase.storage.from('tickets_qr_codes').upload(`ticket_${ticketId}.pdf`, pdfBuffer, {
            contentType: 'application/pdf',
            upsert: true
    })

        if(uploadError) return uploadError;
      
    const {data: urlData, error: urlError} = supabase.storage.from('tickets_qr_codes').getPublicUrl(`ticket_${ticketId}.pdf`);

        updateDb(eventId)

        console.log('error when fetching the url', urlError);

    const {error: insertToTableError} = await supabase.from('tickets').insert([{
        id: ticketId,
        customer_email: customerEmail,
        customer_name: customerName,
        paymentRef: 'paid to admin',
        type: type,
        ticket_qr: urlData.publicUrl,
        is_scanned: false,
        event_name: eventName,
        event_id: eventId,
    }]);

    if(insertToTableError) {
        console.log('ticket was not saved to database', insertToTableError);
    }

    // the pdf file out put
    const pdfFileOutput = urlData.publicUrl;
    console.log('ticket created by admin added to db !!!')

    return pdfFileOutput;
};

export {createTicket}