/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

const dotenv = require('dotenv');

dotenv.config();

/**
 * @method getToken
 * - it implement jwt to sign user object
 * - returns a generated token
 *
 * @param {Object} user user's data object containing email, id, roleType
 *
 * @returns {Response} object
 */

export const getToken = customer => {
  return jwt.sign(
    { customer_id: customer.customer_id, email: customer.email },
    process.env.JWT_KEY,
    {
      expiresIn: '12h',
    }
  );
};
