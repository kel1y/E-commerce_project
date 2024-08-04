import * as dotenv from 'dotenv';
import Stripe from 'stripe';

import db from '../database/models/index';
import { cart_retriver } from '../helpers/cart_retriever';
import { stripePayment } from '../helpers/stripePayment';

dotenv.config();
const { User, Order, OrderItem, Product, Cart } = db;
const stripe = new Stripe(process.env.STRIPE_API_KEY);

export const checkout = async (req, res) => {
  try {
    const cart = await cart_retriver(req.user.id);

    if (cart.message !== 'ok')
      return res.status(400).json({ message: 'User cart not found' });

    const buyer = await User.findByPk(cart.Buyer);
    // create the order with pending status --> no payment yet
    const order = await Order.create({
      buyer_id: buyer.id,
      status: 'pending',
      products: cart.existingItems,
      total: cart.cartTotal,
    });

    // add items to the order
    for (const item of cart.existingItems) {
      const product = await Product.findByPk(item.id);

      if (!product)
        return res
          .status(400)
          .json({ message: 'one of the cart items is not found' });

      const orderItem = await OrderItem.create({
        order_id: order.id,
        product_id: product.id,
        seller_id: product.seller_id,
        quantity: item.quantity,
        status: 'pending',
      });
    }

    const line_items = cart.existingItems.map((item) => ({
      price_data: {
        currency: 'rwf',
        product_data: {
          name: item.productName,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    const customer = await stripe.customers.create({
      metadata: {
        orderId: order.id,
        buyerId: buyer.id,
        products: JSON.stringify(cart.existingItems),
      },
    });

    const checkoutSession = await stripePayment(
      'payment',
      customer,
      ['card'],
      line_items,
    );

    res.json({
      message: 'Order created, use the url to complete payment',
      order_id: order.id,
      url: checkoutSession.url,
      session_id: checkoutSession.id,
    });
  } catch (error) {
    res.status(400).json({ message: 'Order could not be processed', error });
    console.log(error);
  }
};

export const webhookProcessor = async (req, res) => {
  try {
    const event = req.body;
    const data = req.body.data.object;

    if (event.type === 'checkout.session.completed') {
      const customer = await stripe.customers.retrieve(data.customer);
      const orderedProducts = JSON.parse(customer.metadata.products);

      // update product quantity in stock
      for (const orderedProduct of orderedProducts) {
        const stockProduct = await Product.findByPk(orderedProduct.id);

        stockProduct.quantity -= orderedProduct.quantity;
        await stockProduct.save();
      }

      // clear cart
      const cart = await Cart.findOne({
        where: { buyer_id: customer.metadata.buyerId },
      });
      if (cart)
        await Cart.destroy({ where: { buyer_id: customer.metadata.buyerId } });

      // update order status
      const order = await Order.findByPk(customer.metadata.orderId);
      order.status = 'processing';
      await order.save();

      res.status(200).json({ message: 'Payment confirmed' });
    } else {
      res.status(400).json({ message: 'Payment failed', event });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
