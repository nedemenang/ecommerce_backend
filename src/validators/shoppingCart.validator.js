import { validationResult, param, check } from 'express-validator';
import Helper from '../services/helper';

const shippingValidator = {
  validator(route) {// eslint-disable-line
    switch (route) {
      case 'cartItem':
        return [
          param('item_id')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('item ID must be a number and can not be less than 1')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
        ];
      case 'order':
        return [
          param('order_id')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('order ID must be a number and can not be less than 1')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
        ];
      case 'cart':
        return [
          param('cart_id')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
        ];
      case 'updateCart':
        return [
          check('quantity')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('quantity must be a number and can not be less than 1')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
        ];
      case 'addCart':
        return [
          check('product_id')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('order ID must be a number and can not be less than 1')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
          check('cart_id')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
          check('quantity')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('quantity must be a number and can not be less than 1'),
        ];
      case 'createOrder':
        return [
          check('tax_id')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('tax ID must be a number and can not be less than 1'),
          check('cart_id')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
          check('shipping_id')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('shipping ID must be a number and can not be less than 1'),
        ];
      default:
    }
  },
  checkValidationResult(request, response, next) {
    const result = validationResult(request);
    if (result.isEmpty()) {
      return next();
    }
    return Helper.failResponse(
      response,
      400,
      'USR_02',
      result.errors[0].param,
      result.errors[0].msg
    );
  },
};
export default shippingValidator;
