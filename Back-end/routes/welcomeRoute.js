import express from 'express';
import welcome from '../controllers/welcomeController';

const welcomeRoute = express.Router();

welcomeRoute.route('/').get(welcome);

export default welcomeRoute;
