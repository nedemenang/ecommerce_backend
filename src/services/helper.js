import dotenv from 'dotenv';

dotenv.config();

class Helper {
  /**
   * @method errorResponse
   * - returns response object
   *
   * @param {String} response
   * @param {Number} statusCode
   *
   * @returns {Response} response object
   */

  static async errorResponse(response, statusCode, error) {
    return response.status(statusCode).json({
      status: 'error',
      message: error,
    });
  }

  /**
   * @method successResponse
   * - returns response object
   *
   * @param {String} response
   * @param {Number} statusCode
   * @param {Object} data response object
   *
   * @returns {Response} response object
   */

  static async successResponse(response, statusCode, data) {
    return response.status(statusCode).json(data);
  }

  /**
   * @method failResponse
   * - returns response object
   *
   * @param {String} response
   * @param {Number} statusCode
   * @param {Object} error response object
   *
   * @returns {Response} response object
   */

  static async failResponse(response, statusCode, code, field, error) {
    return response.status(statusCode).json({
      error: {
        status: statusCode,
        code,
        message: error,
        field,
      },
    });
  }
}

export default Helper;
