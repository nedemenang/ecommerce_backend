import model from '../database/models';

const { Tax } = model;

/**
 * Queries the database to get all taxes
 * @method getAllTaxesService
 * Route: GET tax
 * @returns {object} tax list
 */

export const getAllTaxesService = async () => {
  try {
    const taxes = await Tax.findAll();
    return taxes;
  } catch (err) {
    return err.message;
  }
};

/**
 * @method getSingleTaxService
 * @description fetches single tax
 * Route: GET: /tax/:tax_id
 *
 * @returns {Object} tax
 */

export const getSingleTaxService = async tax_id => {// eslint-disable-line
  try {
    const tax = await Tax.findByPk(tax_id);
    return tax;
  } catch (err) {
    return err.message;
  }
};
