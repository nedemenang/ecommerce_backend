/**
 * The Shipping Controller contains all the static methods that handles all shipping request
 * This piece of code work fine, but you can test and debug any detected issue
 *
 * - getShippingRegions - Returns a list of all shipping region
 * - getShippingType - Returns a list of shipping type in a specific shipping region
 *
 */
// import { ShippingRegion, Shipping } from '../database/models';
import {
  getAllShippingRegionService,
  getShippingInRegionService,
} from '../services/shipping.service';
import Helper from '../services/helper';

class ShippingController {
  /**
   * get all shipping regions
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and shipping regions data
   * @memberof ShippingController
   */
  static async getShippingRegions(req, res, next) {// eslint-disable-line
    try {
      const shippingRegions = await getAllShippingRegionService();
      return Helper.successResponse(res, 200, shippingRegions);
    } catch (error) {
      return Helper.failResponse(req, 500, error);
    }
  }

  /**
   * get get shipping region shipping types
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and shipping types data
   * @memberof ShippingController
   */
  static async getShippingType(req, res, next) {// eslint-disable-line
    const { shipping_region_id } = req.params; // eslint-disable-line
    try {
      const shipping = await getShippingInRegionService(shipping_region_id);
      return Helper.successResponse(res, 200, shipping);
    } catch (error) {
      return Helper.failResponse(req, 500, error);
    }
  }
}

export default ShippingController;
