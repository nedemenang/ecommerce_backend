import model from '../database/models';

const { ShippingRegion, Shipping } = model;

/**
 * Queries the database to get all shipping regions
 * @method getAllShippingRegionService
 * Route: GET shipping/regions
 * @returns {object} shipping region list
 */

export const getAllShippingRegionService = async () => {
  try {
    const regions = await ShippingRegion.findAll();
    return regions;
  } catch (err) {
    return err.message;
  }
};

/**
 * Queries the database to get a shipping type
 * @method getSingleShippingService
 * @returns {object} shipping type
 */

export const getSingleShippingService = async shipping_id => {// eslint-disable-line
  try {
    const shipping = await Shipping.findByPk(shipping_id);
    return shipping;
  } catch (err) {
    return err.message;
  }
};

/**
 * @method getShippingInRegionService
 * @description fetches shipping types in a shipping region
 * Route: GET: /shipping/regions/:shipping_region_id
 *
 * @returns {Object} shipping list
 */

export const getShippingInRegionService = async shipping_region_id => {// eslint-disable-line
  try {
    const shippings = await Shipping.findAll({
      where: {
        shipping_region_id,
      },
    });
    return shippings;
  } catch (err) {
    return err.message;
  }
};
