import { Router } from 'express';
import ShoppingCartController from '../../controllers/shoppingCart.controller';
import shoppingCartValidator from '../../validators/shoppingCart.validator';
import paramValidator from '../../validators/requiredParams.validator';
import authorization from '../../middlewares/auth.middleware';

const { verifyToken } = authorization;

const { validator, checkValidationResult } = shoppingCartValidator;

const {
  validator: paramCheckValidator,
  checkValidationResult: paramCheckValidationResult,
} = paramValidator;

const router = Router();

router.post(
  '/',
  verifyToken,
  validator('createOrder'),
  checkValidationResult,
  ShoppingCartController.createOrder
);
router.get('/inCustomer', verifyToken, ShoppingCartController.getCustomerOrders);
router.get(
  '/shortDetail/:order_id',
  verifyToken,
  paramCheckValidator('orderId'),
  paramCheckValidationResult,
  ShoppingCartController.getOrderSummary
);

router.get(
  '/:order_id',
  verifyToken,
  paramCheckValidator('orderId'),
  paramCheckValidationResult,
  ShoppingCartController.getOrder
);

export default router;
