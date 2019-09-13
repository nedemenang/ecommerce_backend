import { validationResult, param, check } from 'express-validator';
import Helper from '../services/helper';

const ProductValidator = {
  validator(route) {// eslint-disable-line
    switch (route) {
      case 'review':
        return [
          check('review')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required')
            .trim(),
          check('rating')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('The field(s) are/is required')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
          check('productId')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('product ID must be a number and can not be less than 1'),
          check('customerId')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('customer ID must be a number and can not be less than 1')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
        ];
      case 'category':
        return [
          param('category_id')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('Category ID must be a number and can not be less than 1')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
        ];
      case 'department':
        return [
          param('department_id')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('Department ID must be greater than 0')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
        ];
      case 'product':
        return [
          param('product_id')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('Department ID must be greater than 0')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
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
export default ProductValidator;
