/* eslint-disable import/no-named-as-default */
import express from 'express';
import { addProductToWishlist, getAllProductWishes, getSingleProductWish } from '../controllers/productWishlistcontroller';
import isLoggedIn from '../middleware/authMiddleware';
import verifyRole from '../middleware/verifyRole';
import productWishlistSchema from '../validations/productWishlist';
import { validation } from '../validations/validation';

const productWishRoute = express.Router();

productWishRoute.post(
  '/productWish',
  isLoggedIn,
  verifyRole('buyer'),
  validation(productWishlistSchema),
  addProductToWishlist
);

productWishRoute.get(
  '/productWishes',
  isLoggedIn,
  getAllProductWishes
);

productWishRoute.get(
  '/products/:product_id/productWishes',
  isLoggedIn,
  verifyRole('seller'),
  getSingleProductWish
);

export default productWishRoute;
