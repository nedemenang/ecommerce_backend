import { getToken } from '../helpers/jwt.helper';
import model from '../database/models';

const { Customer } = model;

/**
 * @method createUserService
 * - it persist a new admin user to the database
 * - sends new user a welcome email
 * - returns user data
 *
 * @param {Object} userDetails details of the user to be created
 *
 * @returns {Object} user object
 */

export const createCustomerService = async customerDetails => {
  const { name, email, password } = customerDetails;
  const result = await Customer.create({
    name,
    password,
    email,
  });
  const accessToken = getToken(result);
  const customer = {
    customer_id: result.customer_id,
    name: result.name,
    email: result.email,
    address_1: null,
    address_2: null,
    city: null,
    region: null,
    postal_code: null,
    shipping_region_id: result.shipping_region_id,
    credit_card: null,
    day_phone: null,
    eve_phone: null,
    mob_phone: null,
  };
  return { customer, accessToken: `Bearer ${accessToken}`, expiresIn: '12h' };
};

/**
 * @method isCustomerExist
 * - it check if customers email exist in the database
 * - returns a promise
 *
 * @param {String} customerEmail customer's email
 *
 * @returns {Promise}
 */

export const isCustomerExist = async customerEmail =>
  Customer.findOne({ where: { email: customerEmail } });

/**
 * @method updateCustomerDetailsService
 * - update customer profile
 * - returns customer data
 *
 * @param {Object} customer customer Id of the customer to be updated
 * @param {Object} customerDetails details of the customer to be updated
 *
 * @returns {Object} customer object */

export const updateCustomerDetailsService = async customerDetails => {
  const customer = await Customer.findByPk(customerDetails.customer_id);
  if (!customer) {
    return customer;
  }

  const updateCustomer = await customer.update({
    email: customerDetails.email,
    name: customerDetails.name,
    day_phone: customerDetails.day_phone,
    eve_phone: customerDetails.eve_phone,
    mob_phone: customerDetails.mob_phone,
  });

  const updatedCustomer = {
    customer_id: updateCustomer.customer_id,
    email: updateCustomer.email,
    name: updateCustomer.name,
    address_1: updateCustomer.address_1,
    address_2: updateCustomer.address_2,
    city: updateCustomer.city,
    region: updateCustomer.region,
    postal_code: updateCustomer.postal_code,
    shipping_region_id: updateCustomer.shipping_region_id,
    credit_card: updateCustomer.credit_card,
    day_phone: updateCustomer.day_phone,
    eve_phone: updateCustomer.eve_phone,
    mob_phone: updateCustomer.mob_phone,
  };

  return updatedCustomer;
};

/**
 * Queries the database to get a user profile
 * @method getUserProfile
 * Route: GET profiles/:username
 * @param {string} username
 * @returns {object|boolean} response object or false if no user is found
 */

export const getCustomerProfile = async customerId => {
  const customer = await Customer.findByPk(customerId);
  if (customer) {
    const response = {
      customer_id: customer.customer_id,
      name: customer.name,
      email: customer.email,
      address_1: customer.address_1,
      address_2: customer.address_2,
      city: customer.city,
      region: customer.region,
      postal_code: customer.postal_code,
      shipping_region_id: customer.shipping_region_id,
      credit_card: customer.credit_card,
      day_phone: customer.day_phone,
      eve_phone: customer.eve_phone,
      mob_phone: customer.mob_phone,
    };
    return response;
  }
  return false;
};

/**
 * @method loginService
 * - it verifies if user exist in the database
 * - returns user data
 *
 * @param {Object} body request body's object
 *
 * @returns {Object} user object
 */

// eslint-disable-next-line consistent-return
export const loginService = async body => {
  const { email, password } = body;

  const result = await Customer.findOne({
    where: { email },
  });

  if (result && result.validatePassword(password)) {
    const accessToken = getToken(result);
    const customer = {
      customer_id: result.customer_id,
      name: result.name,
      email: result.email,
      address_1: result.address_1,
      address_2: result.address_2,
      city: result.city,
      region: result.region,
      postal_code: result.postal_code,
      shipping_region_id: result.shipping_region_id,
      credit_card: result.credit_card,
      day_phone: result.day_phone,
      eve_phone: result.eve_phone,
      mob_phone: result.mob_phone,
    };
    return { customer, accessToken: `Bearer ${accessToken}`, expiresIn: '12h' };
  }
};

/**
 * @method updateCustomerAddressService
 * - update customer profile
 * - returns customer data
 *
 * @param {Object} customerDetails details of the customer to be updated
 *
 * @returns {Object} customer object */

export const updateCustomerAddressService = async customerDetails => {
  const customer = await Customer.findByPk(customerDetails.customer_id);
  if (!customer) {
    return customer;
  }

  const updateCustomer = await customer.update({
    address_1: customerDetails.address_1,
    address_2: customerDetails.address_2,
    city: customerDetails.city,
    region: customerDetails.region,
    postal_code: customerDetails.postal_code,
    shipping_region_id: customerDetails.shipping_region_id,
  });

  const updatedCustomer = {
    customer_id: updateCustomer.customer_id,
    email: updateCustomer.email,
    name: updateCustomer.name,
    day_phone: updateCustomer.day_phone,
    eve_phone: updateCustomer.eve_phone,
    mob_phone: updateCustomer.mob_phone,
    address_1: updateCustomer.address_1,
    address_2: updateCustomer.address_2,
    city: updateCustomer.city,
    region: updateCustomer.region,
    postal_code: updateCustomer.postal_code,
    shipping_region_id: updateCustomer.shipping_region_id,
  };

  return updatedCustomer;
};

/**
 * @method updateCustomerCreditService
 * - update customer profile
 * - returns customer data
 *
 * @param {Object} customerDetails details of the customer to be updated
 *
 * @returns {Object} customer object */

export const updateCustomerCreditService = async customerDetails => {
  const customer = await Customer.findByPk(customerDetails.customer_id);
  if (!customer) {
    return false;
  }

  const updateCustomer = await customer.update({
    credit_card: customerDetails.credit_card,
  });

  const updatedCustomer = {
    customer_id: updateCustomer.customer_id,
    email: updateCustomer.email,
    name: updateCustomer.name,
    day_phone: updateCustomer.day_phone,
    eve_phone: updateCustomer.eve_phone,
    mob_phone: updateCustomer.mob_phone,
    address_1: updateCustomer.address_1,
    address_2: updateCustomer.address_2,
    credit_card: updateCustomer.credit_card,
    city: updateCustomer.city,
    region: updateCustomer.region,
    postal_code: updateCustomer.postal_code,
    shipping_region_id: updateCustomer.shipping_region_id,
  };

  return updatedCustomer;
};
