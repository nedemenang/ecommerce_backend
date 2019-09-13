import model from '../database/models';

const { Attribute, AttributeValue, Product } = model;

/**
 * Queries the database to get all attribute
 * @method getAllAttributeService
 * Route: GET attributes
 * @returns {object} response object
 */

export const getAllAttributeService = async () => {
  try {
    const attributes = await Attribute.findAndCountAll();
    return attributes;
  } catch (err) {
    return err.message;
  }
};

/**
 * @method getAttributeService
 * @description fetches attribute by attribute_id
 * Route: GET: /attributes/:attribute_id
 *
 * @returns {Object} attribute
 */

export const getAttributeService = async attributeId => {
  const attribute = await Attribute.findByPk(attributeId);
  if (attribute) {
    return attribute;
  }
  return false;
};

/**
 * @method getAttributeValueService
 * @description fetches attribute value by attribute_id
 * Route: GET: /attributes/values/:attribute_id
 *
 * @returns {Object} attributevalues
 */

export const getAttributeValueService = async attribute_id => {// eslint-disable-line
  try {
    const attributeValues = await AttributeValue.findAll({
      where: {
        attribute_id,
      },
      attributes: { exclude: ['attribute_id'] },
    });
    return attributeValues;
  } catch (err) {
    return err.message;
  }
};

/**
 * @method getProductAttributeService
 * @description fetches product attribute by product_id
 * Route: GET: /attributes/inProduct/:product_id
 *
 * @returns {Object} attributevalues
 */

export const getProductAttributeService = async product_id => {// eslint-disable-line
  try {
    const product = await Product.findOne({
      where: {
        product_id,
      },
      include: [
        {
          model: AttributeValue,
          include: [
            {
              model: Attribute,
              as: 'attribute_type',
            },
          ],
          as: 'attributes',
        },
      ],
    });
    return product.attributes;
  } catch (err) {
    return err.message;
  }
};
