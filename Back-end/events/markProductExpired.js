/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */

import { productsExpiration } from '../helpers/sendMessage';
import findOneUserService from '../services/authService';
import sendMessage from '../utils/sendgrid.util';

/* eslint-disable no-console */
const markProductExpired = async (expiredProducts) => {
  if (expiredProducts.length) {
    try {
      for (let i = 0; i < expiredProducts.length; i++) {
        await expiredProducts[i].update({ expired: true });
        const productId = expiredProducts[i].dataValues.id;
        const sellerId = expiredProducts[i].dataValues.seller_id;
        const seller = await findOneUserService(sellerId);
        const sellerEmail = seller.dataValues.email;
        const html = `
         <a href="${process.env.clientURL}/api/v1/products/${productId}" style="background-color:#008CBA;color:#fff;padding:14px 25px;text-align:center;text-decoration:none;display:inline-block;border-radius:4px;font-size:16px;margin-top:20px;">This product has reached its expiration date \n View the product</a> `;

        await sendMessage(
          sellerEmail,
          productsExpiration(productId),
          'Products expiration',
          html,
        );
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('No expired products');
  }
};

export default markProductExpired;
