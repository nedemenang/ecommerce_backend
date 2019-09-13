import { Router } from 'express';
import AttributeController from '../../controllers/attributes.controller';
import paramValidator from '../../validators/requiredParams.validator';
// import productValidator from '../../validators/product.validator';

const { validator, checkValidationResult } = paramValidator;
// const {
//   validator: productValidation,
//   checkValidationResult: productValidationResult,
// } = productValidator;

const router = Router();

router.get('/', AttributeController.getAllAttributes);
router.get(
  '/:attribute_id',
  validator('attributeId'),
  checkValidationResult,
  AttributeController.getSingleAttribute
);
router.get(
  '/values/:attribute_id',
  validator('attributeId'),
  checkValidationResult,
  AttributeController.getAttributeValues
);
router.get(
  '/inProduct/:product_id',
  validator('productId'),
  checkValidationResult,
  AttributeController.getProductAttributes
);

export default router;
