import { check, validationResult } from 'express-validator';
import Helper from '../services/helper';

const EmailValidator = {
  // eslint-disable-next-line consistent-return
  validator(route) {
    switch (route) {
      case 'email':
        return [
          check('email')
            .isEmail()
            .withMessage('The email is invalid'),
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
      'USR_03',
      result.errors[0].param,
      result.errors[0].msg
    );
  },
};
export default EmailValidator;

// case 'login':
//         return [
//           check('email')
//             .isEmail()
//             .withMessage('Please enter a valid email')
//             .trim(),
//           check('password')
//             .not()
//             .isEmpty()
//             .withMessage('Password can not be empty')
//             .isLength({ min: 8 })
//             .withMessage('Password can not be less than 8 characters'),
//         ];
