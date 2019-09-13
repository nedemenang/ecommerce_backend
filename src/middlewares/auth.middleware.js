import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Helper from '../services/helper';

dotenv.config();

/**
 *
 *  Middleware Utils module
 *
 */
/* istanbul ignore next */
export default {
  /**
   * @method verifyToken
   * - it implement jwt verify method to decode incoming request with token
   * - returns user data with a generated token
   *
   * @param {Object} request request object
   * @param {Object} response response object
   * @param {Function} next function
   *
   * @returns {Response} response object
   */

  async verifyToken(request, response, next) {
    try {
      if (!request.headers['user-key']) {
        return Helper.failResponse(response, 400, 'AUT_01', 'Token', 'Authorization code is empty');
      }
      // get token
      const token = request.headers['user-key'].split(' ')[1];
      // console.log(token);
      const decode = await jwt.verify(token, process.env.JWT_KEY);
      if (!decode.customer_id) {
        return Helper.failResponse(response, 400, 'AUT_02', 'Token', 'Access Unauthorized');
      }

      request.customer_id = decode.customer_id;
      request.token = token;
      next();
    } catch (error) {
      return response.status(400).json({
        status: 400,
        code: 'AUT_02',
        message: 'Access Unauthorized',
        field: 'Token',
      });
    }
  },
};
