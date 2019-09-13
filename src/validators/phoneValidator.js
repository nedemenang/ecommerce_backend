import { check, validationResult } from 'express-validator';
import Helper from '../services/helper';

const phoneValidator = {
  // eslint-disable-next-line consistent-return
  validator(route) {
    switch (route) {
      case 'phone':
        return [
          check('day_phone')
            .isMobilePhone()
            .withMessage('This is an invalid phone number'),
          check('eve_phone')
            .isMobilePhone()
            .withMessage('This is an invalid phone number'),
          check('mob_phone')
            .isMobilePhone()
            .withMessage('This is an invalid phone number'),
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
      'USR_06',
      result.errors[0].param,
      result.errors[0].msg
    );
  },
};
export default phoneValidator;
