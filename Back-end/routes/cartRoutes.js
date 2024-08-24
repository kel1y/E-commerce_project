/* eslint-disable import/no-named-as-default */
import express from 'express';
import {
  AddToCart,
  RemoveFromCart,
  clearCart,
  deleteItem,
  getCart,
  updateCartItems,
} from '../controllers/cartController';
import isLoggedIn, { checkPassword } from '../middleware/authMiddleware';
import verifyRole from '../middleware/verifyRole';

const cartRoute = express.Router();

cartRoute.post(
  '/cart',
  isLoggedIn,
  checkPassword,
  verifyRole('buyer'),
  AddToCart,
);
cartRoute.get('/cart', isLoggedIn, checkPassword, verifyRole('buyer'), getCart);
cartRoute.delete(
  '/cart',
  isLoggedIn,
  checkPassword,
  verifyRole('buyer'),
  clearCart,
);
cartRoute.delete(
  '/cart/:item_id',
  isLoggedIn,
  checkPassword,
  verifyRole('buyer'),
  RemoveFromCart,
);
cartRoute.put(
  '/cart',
  isLoggedIn,
  checkPassword,
  verifyRole('buyer'),
  updateCartItems,
);
export default cartRoute;
