

// import { Order } from "../../../lib/model/Orders";
// import { Product } from "../../../lib/model/Product";
// import { moongooseConnect } from "../../../lib/mongoose";
// const stripe = require('stripe')(process.env.STRIPE_SK);

import { Order } from '../../../lib/model/Orders';
import { Product } from '../../../lib/model/Product';
import { moongooseConnect } from '../../../lib/mongoose';

// export default async function handler(req,res) {
//   if (req.method !== 'POST') {
//     res.json('should be a POST request');
//     return;
//   }
  // const {
  //   name,email,city,
  //   pincode,address,country,
  //   cartProduct,
  // } = req.body;
//   await moongooseConnect();
//   const productsIds = cartProduct;
//   const uniqueIds = [...new Set(productsIds)];
//   const productsInfos = await Product.find({_id:uniqueIds});

//   let line_items = [];
//   for (const productId of uniqueIds) {
//     const productInfo = productsInfos.find(p => p._id.toString() === productId);
//     const quantity = productsIds.filter(id => id === productId)?.length || 0;
//     if (quantity > 0 && productInfo) {
//       line_items.push({
//         quantity,
//         price_data: {
//           currency: 'inr',
//           product_data: {name:productInfo.title},
//           unit_amount: quantity * productInfo.price ,
//         },
//       });
//     }
//   }

//   const orderDoc = await Order.create({
//     line_items,name,email,city,pincode,
//     address,country,paid:false,
//   });

//   const session = await stripe.checkout.sessions.create({
//     line_items,
//     mode: 'payment',
//     customer_email: email,
//     success_url: process.env.PUBLIC_URL + '/cart?success=1',
//     cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
//     metadata: {orderId:orderDoc._id.toString(),test:'ok'},
//   });

//   res.json({
//     url:session.url,
//   })

// }




const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req,res) {
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
  }
  const {
    name,email,city,
    pincode,address,country,
    cartProduct,
  } = req.body;
  await moongooseConnect();
  const productsIds = cartProduct;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({_id:uniqueIds});

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(p => p._id.toString() === productId);
    const quantity = productsIds.filter(id => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'INR',
          product_data: {name:productInfo.title},
          unit_amount: quantity * productInfo.price*100 ,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,name,email,city,
    pincode,address,country,
    cartProduct,paid:false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url: process.env.PUBLIC_URL + '/cart?success=1',
    cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
    metadata: {orderId:orderDoc._id.toString(),test:'ok'},
  });

  res.json({
    url:session.url,
  })

}