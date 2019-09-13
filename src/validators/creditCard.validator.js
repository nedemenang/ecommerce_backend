import { check, validationResult } from 'express-validator';
import Helper from '../services/helper';

const EmailValidator = {
  // eslint-disable-next-line consistent-return
  validator(route) {
    switch (route) {
      case 'credit_card':
        return [
          check('credit_card')
            .isCreditCard()
            .withMessage('This is an invalid Credit Card'),
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
      'USR_08',
      result.errors[0].param,
      result.errors[0].msg
    );
  },
};
export default EmailValidator;
