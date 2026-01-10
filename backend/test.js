import { Resend } from "resend";
import dotenv from 'dotenv';

dotenv.config();

/* 
  loop through the objects and create an object with a type and quantity properties

*/


// const testItems = [
//   {
//     id: 11,
//     title: ' Black lights event',
//     type: 'regular',
//     price: 2000,
//     vipPrice: 5500,
//     regularPrice: 2000,
//     qty: 1
//   },
//   {
//     id: '41446b84-e713-4cbc-9a5d-e14a5029cbcb',
//     title: 'Lagos Summer Jam 2026',
//     type: 'vip',
//     price: 4000,
//     vipPrice: 4000,
//     regularPrice: 2000,
//     qty: 1
//   },
//   {
//     id: '41446b84-e713-4cbc-9a5d-e14a5029cbcb',
//     title: 'Lagos Summer Jam 2026',
//     type: 'regular',
//     price: 2000,
//     vipPrice: 4000,
//     regularPrice: 2000,
//     qty: 1
//   }
// ]


// // const loopedItems = testItems.map((item) => {

// //   const type = item.type;
// //   const quantity = item.qty;
// //   const itemId = item.id;

// //   console.log('--- start the ticket generation process ---');

// //   for(let i = 0; i < quantity; i++) {
// //     const ticketId = crypto.randomUUID();

// //     const verUrl = `http://localhost:5173/verify/${itemId}?type=${type}`;
    
// //     console.log(`creating ${type} Ticket #${i + 1} with: Id${itemId}`);
// //   }
// // })

// for(const item of testItems) {
//   const type = item.type;
//   const quantity = item.qty;
//   const itemId = item.id;

//   console.log('--- start the ticket generation process ---');

//   for(let i = 0; i < quantity; i++) {
//     const ticketId = crypto.randomUUID();

//     const verUrl = `http://localhost:5173/verify/${itemId}?type=${type}`;
    
//     console.log(`creating ${type} Ticket #${i + 1} with: Id${itemId}`);
//   }
// }



// console.log(loopedItems);


/* RESEND TESTING */
const resend = new Resend(process.env.RESEND_KEY);                    



async function resendFunction(){

  const {data, error} = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'green.engil13@gmail.com',
    subject: 'Hello from Resend!',
    html: '<p>This email was sent using Resend!</p>',
  });

  if(error) {
    return console.log('error sending email', error);
  }

  console.log('email sent');
  
}

resendFunction();

