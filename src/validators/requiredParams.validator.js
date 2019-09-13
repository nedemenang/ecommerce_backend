import { validationResult, param } from 'express-validator';
import Helper from '../services/helper';

const ParamValidator = {
  validator(route) {// eslint-disable-line
    switch (route) {
      case 'productId':
        return [
          param('product_id')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('product ID must be a number and can not be less than 1')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
        ];
      case 'attributeId':
        return [
          param('attribute_id')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('attribute ID must be a number and can not be less than 1')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
        ];
      case 'orderId':
        return [
          param('order_id')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('order ID must be a number and can not be less than 1')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
        ];
      case 'taxId':
        return [
          param('tax_id')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('tax ID must be a number and can not be less than 1')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
        ];
      case 'departmentId':
        return [
          param('department_id')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('department ID must be a number and can not be less than 1')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
        ];
      case 'categoryId':
        return [
          param('category_id')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('category ID must be a number and can not be less than 1')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
        ];
      case 'shippingId':
        return [
          param('shipping_id')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('shipping ID must be a number and can not be less than 1')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
        ];
      case 'shippingRegionId':
        return [
          param('shipping_region_id')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('shipping region ID must be a number and can not be less than 1')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
        ];
      case 'quantity':
        return [
          param('quantity')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('quantity must be a number and can not be less than 1')
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
export default ParamValidator;
