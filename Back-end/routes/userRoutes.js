/* eslint-disable linebreak-style */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import express from 'express';
import multer from 'multer';
import {
  getAllUsers,
  loginUser,
  setRoles,
  createNewUser,
  updatePassword,
  forgotPassword,
  passwordReset,
  disableAccount,
  registerUser,
  verifyEmail,
  getSingleProfile,
  updateProfile,
  verifyOTP,
} from '../controllers/userController';
import isLoggedIn, {
  checkPassword,
  checkUserExists,
} from '../middleware/authMiddleware';
import {
  userSchema,
  Password,
  profileSchema,
  passwordResetSchema,
} from '../validations/userSchema';
import otpSchema from '../validations/otpSchema';
import validateRegister from '../validations/register.validation';
import validator from '../validations/validation';
import verifyRole from '../middleware/verifyRole';
import roleSchema from '../validations/roleSchema';
import { logout } from '../controllers/blacklisTokenController';
import { getToken } from '../controllers/momoPayment';

const userRoutes = express.Router();
const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Invalid image file', false);
  }
};
const uploads = multer({ storage, fileFilter });

userRoutes.get('', isLoggedIn, checkPassword, verifyRole('admin'), getAllUsers);
userRoutes.get('/profile/single', isLoggedIn, getSingleProfile);
userRoutes.post('/signin', validator(userSchema), loginUser);
userRoutes.post('/signup', validator(userSchema), createNewUser);
userRoutes.post('/otp/verify/:token', validator(otpSchema), verifyOTP);
userRoutes.put(
  '/:id/roles',
  [checkPassword, verifyRole('admin'), validator(roleSchema)],
  setRoles,
);
userRoutes.patch(
  '/:id/status',
  verifyRole('admin'),
  checkPassword,
  disableAccount,
);
userRoutes.patch(
  '/:id/status',
  verifyRole('admin'),
  checkPassword,
  disableAccount,
);
userRoutes.patch('/password', isLoggedIn, validator(Password), updatePassword);
userRoutes.post('/register', validateRegister, checkUserExists, registerUser);
userRoutes.post('/logout', isLoggedIn, logout);
userRoutes.patch(
  '/profile',
  [
    isLoggedIn,
    checkPassword,
    uploads.single('avatar'),
    validator(profileSchema),
  ],
  updateProfile,
);
userRoutes.post('/password-reset-request', forgotPassword);
userRoutes.patch(
  '/:token/password-reset',
  validator(passwordResetSchema),
  passwordReset,
);
userRoutes.post('/register', validateRegister, checkUserExists, registerUser);
userRoutes.get('/verify-account/:token', verifyEmail);

export default userRoutes;
