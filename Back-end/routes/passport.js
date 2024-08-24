import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import generateToken from '../helpers/token_generator';
dotenv.config();
const passportRouter = express.Router();
passportRouter.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});
passportRouter.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
passportRouter.get('/google/callback', passport.authenticate('google'), async (req, res) => {
  const { user, token, redirectURL } = req.user;
  const response = { status: 200, message: 'successfully logged in', token };
  res.redirect(`${redirectURL}?response=${encodeURIComponent(JSON.stringify(response))}`);
});
export default passportRouter;
