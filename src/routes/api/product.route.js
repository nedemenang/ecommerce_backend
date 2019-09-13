import { Router } from 'express';
import ProductController from '../../controllers/product.controller';
import paramValidator from '../../validators/requiredParams.validator';
import productValidtor from '../../validators/product.validator';
import PaginationValidator from '../../validators/pagination.validator';
import authorization from '../../middlewares/auth.middleware';

const { verifyToken } = authorization;

const { validator, checkValidationResult } = paramValidator;
const {
  validator: paginationValidator,
  checkValidationResult: validationResult,
} = PaginationValidator;

const { validator: orderValidator, checkValidationResult: ordervalidationResult } = productValidtor;

// These are valid routes but they may contain a bug, please try to define and fix them

const router = Router();
router.post(
  '/',
  orderValidator('review'),
  ordervalidationResult,
  ProductController.createProductReview
);
router.get(
  '/:product_id/reviews',
  validator('productId'),
  checkValidationResult,
  ProductController.getProductReview
);
router.post(
  '/:product_id/reviews',
  validator('productId'),
  verifyToken,
  checkValidationResult,
  ProductController.createProductReview
);
router.get(
  '/',
  paginationValidator('pagination'),
  validationResult,
  ProductController.getAllProducts
);
router.get('/search', ProductController.searchProduct);

router.get(
  '/:product_id',
  validator('productId'),
  checkValidationResult,
  ProductController.getProduct
);

router.get(
  '/inCategory/:category_id',
  validator('categoryId'),
  checkValidationResult,
  paginationValidator('pagination'),
  validationResult,
  ProductController.getProductsByCategory
);
router.get(
  '/inDepartment/:department_id',
  validator('departmentId'),
  checkValidationResult,
  ProductController.getProductsByDepartment
);

export default router;
