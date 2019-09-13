import { Router } from 'express';
import TaxController from '../../controllers/tax.controller';
import taxValidator from '../../validators/requiredParams.validator';

const { validator, checkValidationResult } = taxValidator;

const router = Router();

// These are valid routes but they may contain a bug, please try to define and fix them

router.get('/', TaxController.getAllTax);
router.get('/:tax_id', validator('taxId'), checkValidationResult, TaxController.getSingleTax);

export default router;
