import { Router } from 'express';
import ProductController from '../../controllers/product.controller';
import paramValidator from '../../validators/requiredParams.validator';

const { validator, checkValidationResult } = paramValidator;

// These are valid routes but they may contain a bug, please try to define and fix them

const router = Router();

router.get('/', ProductController.getAllDepartments);
router.get(
  '/:department_id',
  validator('departmentId'),
  checkValidationResult,
  ProductController.getDepartment
);

export default router;
