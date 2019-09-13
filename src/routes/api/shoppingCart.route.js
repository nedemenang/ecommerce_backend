import { Router } from 'express';
import ShoppingCartController from '../../controllers/shoppingCart.controller';
import shoppingCartValidator from '../../validators/shoppingCart.validator';
import authorization from '../../middlewares/auth.middleware';

const { verifyToken } = authorization;

const { validator, checkValidationResult } = shoppingCartValidator;

const router = Router();
router.get('/generateUniqueId', verifyToken, ShoppingCartController.generateUniqueCart);
router.post(
  '/add',
  verifyToken,
  validator('addCart'),
  checkValidationResult,
  ShoppingCartController.addItemToCart
);
router.get(
  '/:cart_id',
  verifyToken,
  validator('cart'),
  checkValidationResult,
  ShoppingCartController.getCart
);
router.put(
  '/update/:item_id',
  verifyToken,
  validator('cartItem'),
  validator('updateCart'),
  checkValidationResult,
  ShoppingCartController.updateCartItem
);
router.delete(
  '/empty/:cart_id',
  verifyToken,
  validator('cart'),
  checkValidationResult,
  ShoppingCartController.emptyCart
);
router.delete(
  '/removeProduct/:item_id',
  verifyToken,
  validator('cartItem'),
  checkValidationResult,
  ShoppingCartController.removeItemFromCart
);

export default router;
