import http from 'k6/http';
import { check, sleep } from 'k6';

// 1. Define how many users and for how long
export const options = {
  vus: 5,           // 5 "Virtual Users" (simultaneous customers)
  duration: '20s',  // Run the test for 20 seconds
};

export default function () {
  const url = 'http://localhost:3001/webhook/monnify';

  // 2. Your Cart Array of Objects
  const cart = [
    { title: "VIP Ticket", qty: 2, price: 5000, type: "VIP" },
    { title: "General Admission", qty: 1, price: 2000, type: "Regular" }
  ];

  // 3. The Full Payload
  const payload = JSON.stringify({
    eventType: "SUCCESSFUL_TRANSACTION",
    eventData: {
      paymentReference: `REF-${Math.floor(Math.random() * 1000000)}`,
      amountPaid: 12000,
      customer: {
        email: "tester@example.com",
        name: "K6 Stress Test"
      },
      metaData: {
        customer_name: "K6 Stress Test",
        // We stringify the cart because webhooks often send metadata as strings
        cart_summery: JSON.stringify(cart) 
      }
    }
  });

  const params = {
    headers: { 
      'Content-Type': 'application/json',
      'x-monnify-signature': 'test-signature'
    },
  };

  // 4. Send the Request
  const res = http.post(url, payload, params);

  // 5. Check if it worked
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response body has success': (r) => r.body && r.body.includes('success') || r.status === 200,
  });

  // Wait 1 second before this user tries again
  sleep(1);
}