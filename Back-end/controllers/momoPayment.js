/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import * as dotenv from 'dotenv';
import axios from 'axios';
import base64 from 'base-64';
import db from '../database/models/index';

dotenv.config();
const { Order, Cart } = db;

export const getToken = async () => {
  try {
    const username = process.env.MOMO_USERNAME;
    const password = process.env.MOMO_API_KEY;
    const credentials = base64.encode(`${username}:${password}`);
    const subscriptionKey = process.env.SUBSCRIPTION_KEY;

    const response = await axios.post(
      `${process.env.MOMO_GET_TOKEN_URL}`,
      {},
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
      },
    );

    const token = response.data.access_token;
    return token;
  } catch (error) {
    console.error('Error:', error?.message);
  }
};
export const requestToPay = async (req, res, next) => {
  try {
    const existingCart = await Cart.findOne({
      where: { buyer_id: req.user.id },
    });
    if (!existingCart) {
      return res.status(400).json({ status, message: 'No cart found' });
    }
    const buyersCart = existingCart.dataValues;
    const cartId = buyersCart.id;
    const total = buyersCart.cartTotal;
    const buyerId = buyersCart.buyer_id;
    const url = `${process.env.MOMO_REQUEST_PAYMENT_URL}`;
    const target = `${process.env.TARGET_ENVIRONMENT}`;
    const subscriptionKey = process.env.SUBSCRIPTION_KEY;
    const token = await getToken();

    const headers = {
      'X-Reference-Id': `${cartId}`,
      'X-Target-Environment': target,
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      Authorization: `Bearer ${token}`,
    };

    const body = {
      amount: `${total}`,
      currency: 'EUR',
      externalId: `${buyerId}`,
      payer: {
        partyIdType: 'MSISDN',
        partyId: req.body.phone,
      },
      payerMessage: 'string',
      payeeNote: 'string',
    };

    res = await axios.post(url, body, { headers });
    const { status } = res;
    req.momoInfo = {
      XReferenceId: headers['X-Reference-Id'],
    };
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getTransactionStatus = async (req, res) => {
  const { momoInfo } = req;

  try {
    const existingCart = await Cart.findOne({
      where: { buyer_id: req.user.id },
    });
    const buyersCart = existingCart.dataValues;
    const total = buyersCart.cartTotal;
    const buyerId = buyersCart.buyer_id;
    const items = buyersCart.items;
    const url = `${process.env.MOMO_REQUEST_PAYMENT_URL}/${momoInfo.XReferenceId}`;
    const target = process.env.TARGET_ENVIRONMENT;
    const subscriptionKey = process.env.SUBSCRIPTION_KEY;
    const token = await getToken();

    const headers = {
      'X-Target-Environment': target,
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(url, { headers });
    const { status } = response.data;
    if (status === 'SUCCESSFUL') {
      const order = await Order.create({
        buyer_id: buyerId,
        status: 'pending',
        products: items,
        total: total,
      });

      const cart = await Cart.findOne({
        where: { buyer_id: buyerId },
      });
      if (cart) await Cart.destroy({ where: { buyer_id: buyerId } });
    }

    res
      .status(200)
      .json({ status, message: 'Payment successful', data: response.data });
    return status;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
