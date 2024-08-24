/* eslint-disable linebreak-style */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-named-as-default */
import express from 'express';
import isLoggedIn from '../middleware/authMiddleware';
import CreateCategory, {
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from '../controllers/categoryController';
import validator from '../validations/validation';
import categorySchema from '../validations/Category';
import verifyRole from '../middleware/verifyRole';

const categoryRoute = express.Router();

categoryRoute.post(
  '/categories',
  isLoggedIn,
  verifyRole('admin'),
  validator(categorySchema),
  CreateCategory,
);
categoryRoute.get('/categories', getAllCategories);
categoryRoute.get('/categories/:categoryId', getSingleCategory);

categoryRoute.patch(
  '/categories/:categoryId',
  isLoggedIn,
  verifyRole('admin'),
  validator(categorySchema),
  updateCategory,
);

export default categoryRoute;
