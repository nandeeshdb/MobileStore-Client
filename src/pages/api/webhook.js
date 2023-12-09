
const stripe = require('stripe')(process.env.STRIPE_SK);
import {buffer} from 'micro';
import { Order } from '../../../lib/model/Orders';
import { moongooseConnect } from '../../../lib/mongoose';


const endpointSecret = 'whsec_22423ae434f7b725ea7e7c5488423d8875d4b7eed81d52de4734f1250cc481aa'

export default async function handler(req,res) {
  await moongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId,{
          paid:true,
        })
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}

export const config = {
  api: {bodyParser:false,}
};

// bright-thrift-cajole-lean
// acct_1Lj5ADIUXXMmgk2a