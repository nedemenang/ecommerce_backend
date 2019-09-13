/**
 * The controller defined below is the attribute controller, highlighted below are the functions of each static method
 * in the controller
 *  Some methods needs to be implemented from scratch while others may contain one or two bugs
 *
 * - getAllAttributes - This method should return an array of all attributes
 * - getSingleAttribute - This method should return a single attribute using the attribute_id in the request parameter
 * - getAttributeValues - This method should return an array of all attribute values of a single attribute using the attribute id
 * - getProductAttributes - This method should return an array of all the product attributes
 * NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */

import {
  getAllAttributeService,
  getAttributeService,
  getAttributeValueService,
  getProductAttributeService,
} from '../services/attribute.service';
import Helper from '../services/helper';

class AttributeController {
  /**
   * This method get all attributes
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAllAttributes(req, res, next) {// eslint-disable-line
    // write code to get all attributes from the database here
    try {
      const attributes = await getAllAttributeService();
      return Helper.successResponse(res, 200, attributes.rows);
    } catch (error) {
      return Helper.failResponse(req, 500, error);
    }
  }

  /**
   * This method gets a single attribute using the attribute id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getSingleAttribute(req, res, next) {
    // Write code to get a single attribute using the attribute id provided in the request param
    try {
      const { attribute_id } = req.params; // eslint-disable-line
      const attribute = await getAttributeService(attribute_id);
      if (attribute) {
        return Helper.successResponse(res, 200, attribute);
      }
      return Helper.failResponse(res, 404, {
        status: 404,
        message: `Attribute with id ${attribute_id} does not exist`,// eslint-disable-line
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method gets a list attribute values in an attribute using the attribute id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAttributeValues(req, res, next) {
    // Write code to get all attribute values for an attribute using the attribute id provided in the request param
    // This function takes the param: attribute_id
    try {
      const { attribute_id } = req.params; // eslint-disable-line
      const attributeValues = await getAttributeValueService(attribute_id);
      return Helper.successResponse(res, 200, attributeValues);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method gets a list attribute values in a product using the product id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getProductAttributes(req, res, next) {
    try {
      const { product_id } = req.params; // eslint-disable-line
      const productAttributes = await getProductAttributeService(product_id);
      const attributes = productAttributes.map(item => {
        return {
          attribute_name: item.attribute_type.name,
          attribute_value_id: item.attribute_value_id,
          attribute_value: item.value,
        };
      });
      return Helper.successResponse(res, 200, attributes);
    } catch (error) {
      return next(error);
    }
  }
}

export default AttributeController;
