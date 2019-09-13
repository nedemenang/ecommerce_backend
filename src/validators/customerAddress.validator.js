import { check, validationResult } from 'express-validator';
import Helper from '../services/helper';

const CustomerUpdateValidator = {
  // eslint-disable-next-line consistent-return
  validator(route) {
    switch (route) {
      case 'address':
        return [
          check('shipping_region_id')
            .isNumeric()
            .isInt({ gt: 0 })
            .withMessage('shipping region ID must be a number and can not be less than 1')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
          check('city')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required')
            .isAlpha()
            .withMessage('Please insert city'),
          check('address_1')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
          check('postal_code')
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
export default CustomerUpdateValidator;
