import { Router } from 'express';
import CustomerController from '../../controllers/customer.controller';
import authorization from '../../middlewares/auth.middleware';

import customerValidator from '../../validators/customerUpdate.validator';
import customerAddressValidator from '../../validators/customerAddress.validator';
import phoneValidator from '../../validators/phoneValidator';
import creditValidator from '../../validators/creditCard.validator';

const { validator, checkValidationResult } = customerValidator;
const {
  validator: phoneNoValidator,
  checkValidationResult: phoneCheckValidatorResult,
} = phoneValidator;

const {
  validator: addressValidator,
  checkValidationResult: addressCheckValidatorResult,
} = customerAddressValidator;

const {
  validator: creditCardValidator,
  checkValidationResult: creditCheckValidatorResult,
} = creditValidator;

const { verifyToken } = authorization;

const router = Router();

router.put(
  '/',
  verifyToken,
  validator('update'),
  checkValidationResult,
  phoneNoValidator('phone'),
  phoneCheckValidatorResult,
  CustomerController.updateCustomerProfile
);
router.put(
  '/address',
  verifyToken,
  addressValidator('address'),
  addressCheckValidatorResult,
  CustomerController.updateCustomerAddress
);
router.put(
  '/creditCard',
  verifyToken,
  creditCardValidator('credit_card'),
  creditCheckValidatorResult,
  CustomerController.updateCreditCard
);

export default router;
