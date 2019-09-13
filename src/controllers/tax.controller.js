/**
 * Tax controller contains methods which are needed for all tax request
 * Implement the functionality for the methods
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import { getAllTaxesService, getSingleTaxService } from '../services/tax.service';
import Helper from '../services/helper';

class TaxController {
  /**
   * This method get all taxes
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAllTax(req, res, next) {// eslint-disable-line
    // write code to get all tax from the database here
    try {
      const taxes = await getAllTaxesService();
      return Helper.successResponse(res, 200, taxes);
    } catch (error) {
      return Helper.failResponse(req, 500, error);
    }
  }

  /**
   * This method gets a single tax using the tax id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getSingleTax(req, res, next) {// eslint-disable-line
    // Write code to get a single tax using the tax Id provided in the request param
    const { tax_id } = req.params; // eslint-disable-line
    try {
      const tax = await getSingleTaxService(tax_id);
      return Helper.successResponse(res, 200, tax);
    } catch (error) {
      return Helper.failResponse(req, 500, error);
    }
  }
}

export default TaxController;
