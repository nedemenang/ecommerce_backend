import { check, validationResult } from 'express-validator';
import Helper from '../services/helper';

const CustomerUpdateValidator = {
  // eslint-disable-next-line consistent-return
  validator(route) {
    switch (route) {
      case 'update':
        return [
          check('name')
            .not()
            .isEmpty()
            .withMessage('The field(s) are/is required'),
          check('email')
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
