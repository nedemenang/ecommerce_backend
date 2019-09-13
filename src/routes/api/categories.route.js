import { Router } from 'express';
import ProductController from '../../controllers/product.controller';
import paramValidator from '../../validators/requiredParams.validator';

const { validator, checkValidationResult } = paramValidator;

// These are valid routes but they may contain a bug, please try to define and fix them

const router = Router();

router.get('/', ProductController.getAllCategories);
router.get(
  '/:category_id',
  validator('categoryId'),
  checkValidationResult,
  ProductController.getSingleCategory
);
router.get(
  '/inDepartment/:department_id',
  validator('departmentId'),
  checkValidationResult,
  ProductController.getDepartmentCategories
);
router.get(
  '/inProduct/:product_id',
  validator('productId'),
  checkValidationResult,
  ProductController.getProductCategory
);
export default router;
