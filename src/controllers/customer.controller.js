/**
 * Customer controller handles all requests that has to do with customer
 * Some methods needs to be implemented from scratch while others may contain one or two bugs
 *
 * - create - allow customers to create a new account
 * - login - allow customers to login to their account
 * - getCustomerProfile - allow customers to view their profile info
 * - updateCustomerProfile - allow customers to update their profile info like name, email, password, day_phone, eve_phone and mob_phone
 * - updateCustomerAddress - allow customers to update their address info
 * - updateCreditCard - allow customers to update their credit card number
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import {
  createCustomerService,
  isCustomerExist,
  getCustomerProfile,
  loginService,
  updateCustomerDetailsService,
  updateCustomerCreditService,
  updateCustomerAddressService,
} from '../services/customer.service';
import Helper from '../services/helper';
/**
 *
 *
 * @class CustomerController
 */
class CustomerController {
  /**
   * create a customer record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, customer data and access token
   * @memberof CustomerController
   */
  static async create(req, res, next) {// eslint-disable-line
    const { email } = req.body;
    try {
      const result = await isCustomerExist(email.toLowerCase());
      if (result) {
        return Helper.failResponse(res, 409, 'USR_04', 'email', 'The email already exists');
      }

      const value = await createCustomerService(req.body);
      return Helper.successResponse(res, 201, value);
    } catch (error) {
      return Helper.errorResponse(res, 500, error);
    }
  }

  /**
   * log in a customer
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, and access token
   * @memberof CustomerController
   */
  static async login(req, res, next) {// eslint-disable-line
    // implement function to login to user account
    const value = await loginService(req.body);
    if (value) {
      return Helper.successResponse(res, 200, value);
    }
    return Helper.failResponse(
      res,
      400,
      'USR_01',
      'email or password',
      'Email or Password is invalid'
    );
    // return Helper.failResponse(res, 400, {
    //   message: 'Invalid email/password',
    // });
  }

  /**
   * get customer profile data
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async getCustomerProfile(req, res, next) {
    // fix the bugs in this code
    try {
       // eslint-disable-line
      const customer = await getCustomerProfile(req.customer_id);
      if (!customer) {
        return Helper.failResponse(res, 400, 'USR_05', 'email', `This email doesn't exist`);
      }
      return Helper.successResponse(res, 200, customer);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * update customer profile data such as name, email, password, day_phone, eve_phone and mob_phone
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCustomerProfile(req, res, next) {
    try {
      const customerDetails = req.body;
      customerDetails.customer_id = req.customer_id;
      // console.log(customerDetails.customer_id);
      const updateCustomer = await updateCustomerDetailsService(customerDetails);
      if (!updateCustomer) {
        return Helper.failResponse(res, 400, 'USR_05', 'customer', `This customer doesn't exist`);
      }
      return Helper.successResponse(res, 200, updateCustomer);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * update customer profile data such as address_1, address_2, city, region, postal_code, country and shipping_region_id
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCustomerAddress(req, res, next) {
    // write code to update customer address info such as address_1, address_2, city, region, postal_code, country
    // and shipping_region_id
    try {
      const customerDetails = req.body;
      customerDetails.customer_id = req.customer_id;
      const updateCustomer = await updateCustomerAddressService(customerDetails);

      if (!updateCustomer) {
        return Helper.failResponse(res, 400, 'USR_05', 'customer', `This customer doesn't exist`);
      }
      return Helper.successResponse(res, 200, updateCustomer);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * update customer credit card
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCreditCard(req, res, next) {
    // write code to update customer credit card number
    try {
      const customerDetails = req.body;
      customerDetails.customer_id = req.customer_id;
      const updateCustomer = await updateCustomerCreditService(customerDetails);

      if (!updateCustomer) {
        return Helper.failResponse(res, 400, 'USR_05', 'customer', `This customer doesn't exist`);
      }
      return Helper.successResponse(res, 200, updateCustomer);
    } catch (error) {
      return next(error);
    }
  }
}

export default CustomerController;
