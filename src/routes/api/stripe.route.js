import { Router } from 'express';
import stripeController from '../../controllers/shoppingCart.controller';
import authorization from '../../middlewares/auth.middleware';

const { verifyToken } = authorization;

const router = Router();

// These are valid routes but they may contain a bug, please try to define and fix them

router.post('/charge', verifyToken, stripeController.processStripePayment);

export default router;
