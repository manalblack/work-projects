import QRCode from 'qrcode';
import PDFDocument from 'pdfkit';
import { supabase } from '../databaseConnection.js';

const siteUrl = process.env.SITE_URL;

console.log('BULK SERVICE IS WORKING ......');


async function createImageBuffer(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Generates an individual PDF Buffer for one ticket
 */
async function generateSinglePdf({ customerName, ticketId, verifyUrl, type, eventName, imageBuffer, location, date }) {
  return new Promise(async (resolve, reject) => {
    try {
      const isVip = type.toLowerCase() === 'vip';
      const ticketTypeColor = isVip ? '#fbbf24' : '#2563eb';

      const qrBuffer = await QRCode.toBuffer(verifyUrl, {
        color: { dark: '#000000', light: '#FFFFFF' },
        width: 200
      });

      const doc = new PDFDocument({
        size: [420, 420],
        margins: { top: 0, left: 0, right: 0, bottom: 0 }
      });

      let chunks = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err) => reject(err));

      // Background Image
      doc.image(imageBuffer, 0, 0, { width: doc.page.width, height: doc.page.height });

      // Dark Overlay
      doc.save().rect(0, 0, doc.page.width, doc.page.height).fillColor('#000000').fillOpacity(0.4).fill().restore();

      const rowTop = 100;
      const leftCardX = 20;
      const leftCardWidth = 260;
      const leftCardHeight = 120;
      const rightCardX = leftCardX + leftCardWidth + 11;

      // QR Code
      doc.image(qrBuffer, rightCardX, 110, { width: 100 });

      // Left Box
      doc.save()
        .rect(leftCardX, rowTop, leftCardWidth, leftCardHeight, 10)
        .fillColor('white').fillOpacity(0.9).fill()
        .restore();

      // Content
      doc.fillColor('#1a1a1a').font('Helvetica-Bold').fontSize(16).text(eventName, leftCardX + 20, rowTop + 10);
      doc.fontSize(12).font('Helvetica').fillColor('#444444')
        .text(`Holder: ${customerName}`, leftCardX + 20, rowTop + 100)
        .text(`Date: ${date}`, leftCardX + 20, rowTop + 40)
        .text(`Location: ${location}`, leftCardX + 20, rowTop + 60, { width: 200, lineGap: 2 });

      doc.fillColor(ticketTypeColor).fontSize(10).text(`${type.toUpperCase()} TICKET`, leftCardX + 170, rowTop + 10);
      doc.fontSize(15).fillColor('gray').text(`ID: ${ticketId}`, 0, 340, { align: 'center' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Creates individual PDFs, uploads each to Supabase, inserts into DB
 */
async function createBulkTickets({ eventData, bulkInfo }) {

  const image = eventData.image;
  const eventName = eventData.title;
  const eventId = eventData.id;
  const location = eventData.location;
  const eventDate = eventData.event_date;

  console.log('event data object', eventData);
  console.log('bulk info object, ', bulkInfo);
  

  const type = bulkInfo.ticketType || 'Regular';
  const groupName = bulkInfo.groupName; 
  const quantity = parseInt(bulkInfo.quantity) || 10;

  const imageBuffer = await createImageBuffer(image);
  const databaseEntries = [];
  const generatedTickets = [];

  for (let i = 0; i < quantity; i++) {
    const ticketId = crypto.randomUUID();
    const ticketHolderName = `${groupName} #${i + 1}`;
    const verUrl = `${siteUrl}/verify/${ticketId}?type=${type}`;

    // 1. Generate individual PDF Buffer
    const pdfBuffer = await generateSinglePdf({
      customerName: ticketHolderName,
      ticketId: ticketId,
      verifyUrl: verUrl,
      type: type,
      eventName: eventName,
      imageBuffer: imageBuffer,
      location: location,
      date: eventDate
    });

    // 2. Upload individual PDF to Supabase Storage
    const fileName = `ticket_${ticketId}.pdf`;
    await supabase.storage.from('testing').upload(fileName, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: true
    });

    const { data: urlData } = supabase.storage.from('testing').getPublicUrl(fileName);
    const pdfUrl = urlData.publicUrl;

    // 3. Prepare Database Object
    const ticketRecord = {
      id: ticketId,
      customer_email: 'admin-bulk@event.com',
      customer_name: ticketHolderName,
      paymentRef: 'paid to admin (bulk)',
      type: type,
      ticket_qr: pdfUrl,
      is_scanned: false,
      event_name: eventName,
      event_id: eventId
    };

    databaseEntries.push(ticketRecord);
    generatedTickets.push({
      name: ticketHolderName,
      pdfUrl: pdfUrl
    });
  }

  // Batch Database Insert
  await supabase.from('testing_tickets').insert(databaseEntries);

  // Increment event sales count
  for (let i = 0; i < quantity; i++) {
    await supabase.rpc('handle_ticket_sale', { target_event_id: eventId });
  }

  // Return array of individual ticket links
  return generatedTickets;
}

export { createBulkTickets };