import { Router } from 'express';
import ShippingController from '../../controllers/shipping.controller';
import shippingValidator from '../../validators/requiredParams.validator';

const { validator, checkValidationResult } = shippingValidator;

const router = Router();

router.get('/regions', ShippingController.getShippingRegions);
router.get(
  '/regions/:shipping_region_id',
  validator('shippingRegionId'),
  checkValidationResult,
  ShippingController.getShippingType
);

export default router;
