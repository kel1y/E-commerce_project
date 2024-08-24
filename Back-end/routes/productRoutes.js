/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import multer from 'multer';
import express from 'express';
import path from 'path';
import isLoggedIn, { checkPassword } from '../middleware/authMiddleware';
import verifyRole from '../middleware/verifyRole';
import CreateProduct, {
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  updateProductAvailability,
} from '../controllers/productController';
import validator, { validateSearch } from '../validations/validation';
import productSchema, { searchSchema } from '../validations/Product';
import searchProduct from '../controllers/productSearchController';
import {
  AddReview,
  deleteReview,
  getReviews,
  updateReview,
} from '../controllers/reviewController';
import reviewSchema from '../validations/review';
import recommendedProduct from '../controllers/recommend';

const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage, fileFilter });

const productRoute = express.Router();

productRoute.post(
  '/products',
  isLoggedIn,
  verifyRole('seller'),
  checkPassword,
  upload.array('images', 8),
  (req, res, next) => {
    if (req.files && req.files.length < 4) {
      return res.status(400).send('At least 4 images are required');
    }
    next();
  },
  validator(productSchema),

  CreateProduct,
);

productRoute.patch(
  '/products/:id/availability',
  isLoggedIn,
  verifyRole('seller'),
  updateProductAvailability,
);

productRoute.patch(
  '/products/:id',
  isLoggedIn,
  verifyRole('seller'),
  upload.array('images', 8),
  updateProduct,
);
productRoute.delete(
  '/products/:id/delete',
  isLoggedIn,
  verifyRole('seller'),
  deleteProduct,
);
productRoute.get(
  '/products/search',
  isLoggedIn,
  validateSearch(searchSchema),
  searchProduct,
);

productRoute.post(
  '/products/:id/reviews',
  isLoggedIn,
  verifyRole('buyer'),
  validator(reviewSchema),
  AddReview,
);
productRoute.get('/products/:id/reviews', getReviews);
productRoute.delete(
  '/products/:id/reviews',
  isLoggedIn,
  verifyRole('buyer'),
  deleteReview,
);
productRoute.put(
  '/products/:id/reviews',
  isLoggedIn,
  verifyRole('buyer'),
  validator(reviewSchema),
  updateReview,
);
productRoute.get('/products', getAllProducts);
productRoute.get('/products/:id', getProductById);

productRoute.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer error occurred
    res.status(400).json({ message: err.message });
  } else if (err) {
    // Other error occurred
    res.status(400).json({ message: err.message });
  } else {
    next();
  }
});

productRoute.get(
  '/product/recommend',
  isLoggedIn,
  verifyRole('buyer'),
  recommendedProduct,
);
export default productRoute;
