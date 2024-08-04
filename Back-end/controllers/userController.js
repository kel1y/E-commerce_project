/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcryptjs';
import sgMail from '@sendgrid/mail';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../database/models/index';
import generateToken from '../helpers/token_generator';
import tokenDecode from '../helpers/token_decode';
import { BcryptUtility } from '../utils/bcrypt.util';
import { UserService } from '../services/user.service';
import verifyToken from '../utils/jwt.util';
import {
  messageResetPassword,
  sendOTPEmail,
  sendVerifyEmail,
} from '../helpers/sendMessage';
import findOneUserService from '../services/authService';
import cloudinary from '../uploads';
import sendMessage from '../utils/sendgrid.util';

dotenv.config();

const { User } = db;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const getAllUsers = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  const totalCount = await User.count();
  const totalPages = Math.ceil(totalCount / limit);
  const offset = (page - 1) * limit;
  const allUsers = await User.findAll({
    limit,
    offset,
  });
  if (!allUsers) res.status(400).json({ message: 'No users found' });

  res.status(200).json({
    message: 'Users Retrieved Successfully',
    allUsers,
    totalPages,
    currentPage: page,
  });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user && (await user.checkPassword(password))) {
      const payload = {
        id: user.id,
        email,
        role: user.role,
        status: user.status,
      };

      if (user.status == false) {
        return res.status(403).json({ message: 'Account locked!' });
      }

      if (!user.isVerified)
        return res.status(401).json({ message: 'Account not verified!' });

      if (user.role === 'seller') {
        const otp = Math.floor(100000 + Math.random() * 900000);

        const OTPcontents = {
          userId: user.id,
          otpCode: otp,
        };

        const OTPtoken = await generateToken(
          OTPcontents,
          process.env.OTP_EXPIRY,
        );
        // expires in 5 minutes

        const html = `<h1> Hello</h1>
        <p> <b>${otp}</b> is your OTP code, it expires in 5 minutes so click the button below to verify it. Do not share it with anyone!</p>
        <a href="${process.env.clientURL}/api/v1/users/otp/verify?token=${OTPtoken}" style="background-color:#008CBA;color:#fff;padding:14px 25px;text-align:center;text-decoration:none;display:inline-block;border-radius:4px;font-size:16px;margin-top:20px;">Verify OTP code</a>
        <p>If you did not register for an account with Falcons Project, please ignore this email.</p>`;

        await sendMessage(
          email,
          sendOTPEmail(otp),
          'Two factor authentication',
          html,
        ); // I have made this html parameter optional to prevent breaking the function
        return res.status(200).json({
          status: 200,
          success: true,
          message: `OTP code sent to ${user.email}`,
          OTPtoken,
        });
      }

      const token = await generateToken(payload);
      res.status(200).json({
        status: 200,
        success: true,
        message: 'Login successful',
        token,
      });
    } else {
      res.status(401).json({
        status: 401,
        success: false,
        message: 'Invalid credentials',
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      success: false,
      message: 'Failed to Login',
      error: error.message,
    });
  }
};

export const verifyOTP = async (req, res) => {
  if (!req.params.token)
    return res.status(400).json({ message: 'No token provided!' });
  try {
    const { otp } = req.body;
    const { token } = req.params;
    const decoded = await tokenDecode(token);

    if (decoded.payload.otpCode != otp) {
      return res.status(401).json({ message: 'The OTP code is invalid' });
    }

    const user = await User.findOne({ where: { id: decoded.payload.userId } });

    if (!user) {
      return res
        .status(401)
        .json({ message: 'User not found, please restart the process' });
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
    };

    const loginToken = await generateToken(payload);
    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Login successful',
      loginToken,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const user = { ...req.body };
    const { clientURL } = process.env;

    user.password = await BcryptUtility.hashPassword(req.body.password);
    user.lastPasswordUpdate = new Date();
    const { id, email } = await UserService.register(user);
    const userData = { id, email };
    const userToken = await generateToken(userData);

    const html = `<h1>Hello</h1>
        <p>Use the below link to verify your account. Do not share it with anyone!</p>
        <a href="${process.env.SERVER_URL}/api/v1/users/verify-account/${userToken}" style="background-color:#008CBA;color:#fff;padding:14px 25px;text-align:center;text-decoration:none;display:inline-block;border-radius:4px;font-size:16px;margin-top:20px;">Verify account</a>
        <p>If you did not signup with our e-commerce, please ignore this email.</p>`;

    await sendMessage(
      email,
      sendVerifyEmail(userToken),
      'Email verification',
      html,
    );

    return res.status(201).json({ user: userData, token: userToken });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Failed to register a new user',
    });
  }
};

const setRoles = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'User email not provided' });
  }

  const foundUser = await User.findOne({ where: { email: req.params.id } });

  if (!foundUser) return res.status(404).json({ message: 'User not found' });

  foundUser.role = req.body.role;
  // eslint-disable-next-line no-unused-vars
  const result = await foundUser.save();

  return res.json({ message: 'User role updated' });
};

// user registration for testing purposes
// user registration for testing purposes
const createNewUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const pwd = await bcrypt.hash(req.body.password, salt);

    // eslint-disable-next-line no-unused-vars
    const instance = await User.create({
      email: req.body.email,
      password: pwd,
      role: 'admin',
      status: true,
      isVerified: true,
      lastPasswordUpdate: new Date().getTime(),
    });
    res.status(201);

    res.json({ message: 'User created' });
  } catch (err) {
    res.status(400).json(err);
  }
};
const updatePassword = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = verifyToken(token);
    // find a user requesting yo update the password
    // compare his/her oldpassword to
    // password in the db

    const user = await User.findOne({
      where: { email: decoded.payload.email },
    });
    const { oldPassword, newPassword } = req.body;
    const match = bcrypt.compareSync(oldPassword, user.password);
    if (!match) {
      return res.status(403).json({ error: 'Incorrect password' });
    }
    // hash and update the new password in the db
    if (newPassword === oldPassword) {
      return res
        .status(406)
        .json({ error: 'Password must differ from old password' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    await user.update({
      password: hashPassword,
      lastPasswordUpdate: new Date(),
      status: true,
    });
    await user.save();
    return res.status(200).json({ message: 'password updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const userEmail = req.body.email;
    // find user in the database requesting to reset password

    const user = await User.findOne({ where: { email: userEmail } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const token = await generateToken(user.email, '10m');
    const html = `<h1> Hello</h1>
    <p><b>A request has been recieved to reset your password for your E-commerce account</b></p>
    <a href="${process.env.clientURL}/password/${token}/reset" style="background-color:#008CBA;color:#fff;padding:14px 25px;text-align:center;text-decoration:none;display:inline-block;border-radius:4px;font-size:16px;margin-top:20px;">Reset password</a>
    <p>If you did not initiate this request, please ignore this email.</p>`;
    await sendMessage(
      userEmail,
      messageResetPassword(token),
      'Reset Password',
      html,
    );
    return res.status(200).json({ token, message: 'email sent to the user' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const passwordReset = async (req, res) => {
  try {
    const { token } = req.params;
    const verify = verifyToken(token);
    if (!verify) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
      res
        .status(400)
        .json({ error: 'Password and confirm password are required' });
    } else {
      // hash the password and update its fields in the database
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const Email = verify.payload;

      await User.update(
        { password: hashPassword },
        { where: { email: Email } },
      );
      return res.status(200).json({ message: 'Password reset successfully' });
    }
  } catch (error) {
    res.send(400).json({ message: error.message });
  }
};

const disableAccount = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'User email not provided' });
  }

  const foundUser = await User.findOne({ where: { email: req.params.id } });

  if (!foundUser) return res.status(404).json({ message: 'User not found' });

  let message = '';
  if (foundUser.status === true) {
    foundUser.status = false;
    message = 'Account disabled';
  } else {
    foundUser.status = true;
    message = 'Account Enabled';
  }

  // eslint-disable-next-line no-unused-vars
  const result = await foundUser.save();

  return res.json({ message });
};
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (verify) {
      const verifiedUser = await User.findOne({
        where: { email: verify.payload.email },
      });
      verifiedUser.isVerified = true;
      await verifiedUser.save();

      res.redirect(`${process.env.FRONTEND_URL}/verification/success`);
    }
    if (!verify) {
      res.redirect(`${process.env.FRONTEND_URL}/verification/failed`);
    }
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updateData = req.body;
    const trimmedData = {};
    for (const key in updateData) {
      if (key === 'avatar' || typeof updateData[key] === 'object') {
        trimmedData[key] = updateData[key];
      } else {
        trimmedData[key] = updateData[key]
          .replace(/[^\w\s:-]/g, '')
          .trim()
          .toLowerCase();
      }
    }
    if (!Object.keys(trimmedData).length) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'No data provided',
      });
    }

    const user = await findOneUserService(req.user.id);

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Falcons_E-comm_App/ProductImages',
        public_id: `${user.firstname}_image`,
      });
      trimmedData.avatar = result.url;
    }

    const updatedProfile = await user.update(trimmedData, {
      where: {
        id: user.id,
      },
      returning: true,
    });

    const returnedProfile = {
      firstname: updatedProfile.firstname,
      lastname: updatedProfile.lastname,
      gender: updatedProfile.gender,
      birthDate: updatedProfile.birthDate,
      preferredLanguage: updatedProfile.preferredLanguage,
      preferredCurrency: updatedProfile.preferredCurrency,
      BillingAddress: updatedProfile.billingAddress,
      avatar: updatedProfile.avatar,
    };

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Profile updated successfully',
      data: returnedProfile,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};
const getSingleProfile = async (req, res) => {
  try {
    const profileId = req.user.id;
    const profile = await findOneUserService(profileId);
    const profileData = {
      firstname: profile.firstname,
      lastname: profile.lastname,
      gender: profile.gender,
      birthDate: profile.birthDate,
      preferredLanguage: profile.preferredLanguage,
      preferredCurrency: profile.preferredCurrency,
      BillingAddress: profile.billingAddress,
      avatar: profile.avatar,
    };

    res.status(200).json({
      status: 200,
      success: true,
      data: profileData,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      success: false,
      message: 'Failed to get the profile',
      error: error.message,
    });
  }
};

export {
  getAllUsers,
  loginUser,
  setRoles,
  createNewUser,
  updatePassword,
  forgotPassword,
  passwordReset,
  disableAccount,
  updateProfile,
  getSingleProfile,
  verifyEmail,
};
