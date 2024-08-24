import * as dotenv from 'dotenv';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_KEY);

dotenv.config();

export const stripePayment = async (
  mode = 'payment',
  customer,
  payment_method_types = ['card'],
  line_items
) => {
  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types,
    line_items,
    mode,
    customer: customer.id,
    success_url: `${process.env.clientURL}/checkout-success`,
    cancel_url: `${process.env.clientURL}/checkout-cancel`
  });

  return checkoutSession;
};
