import { Router } from 'express';
import customerLoginValidator from '../../validators/customerLogin.validator';
import customerRegistrationValidator from '../../validators/customerRegistration.validator';
import CustomerController from '../../controllers/customer.controller';
import authorization from '../../middlewares/auth.middleware';
// import RequiredValidator from '..'

const { validator, checkValidationResult } = customerLoginValidator;
const {
  validator: registrationValidator,
  checkValidationResult: registrationCheckValidationResult,
} = customerRegistrationValidator;
const { verifyToken } = authorization;

const router = Router();

router.post(
  '/',
  registrationValidator('signup'),
  registrationCheckValidationResult,
  CustomerController.create
);
router.post('/login', validator('login'), checkValidationResult, CustomerController.login);
router.get('/', verifyToken, CustomerController.getCustomerProfile);

export default router;
