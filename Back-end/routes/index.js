/* eslint-disable linebreak-style */
import { Router } from 'express';
import welcomeRoutes from './welcomeRoute';
import userRoutes from './userRoutes';
import orderRoutes from './orderRoutes';

const router = Router();

router.use('/welcome', welcomeRoutes);
router.use('/api/v1/users', userRoutes);

export default router;
