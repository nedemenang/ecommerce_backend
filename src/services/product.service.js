import model from '../database/models';
import {
  paginationQueryMetadata,
  pageMetadata,
  searchPageMetadata,
} from '../helpers/pagination.helper';
import Helper from './helper';

const { Product, ProductCategory, Category, Review, Sequelize } = model;
const { Op } = Sequelize;

/**
 * Queries the database to get all products
 * @method getAllProductService
 * Route: GET products
 * @param {string} queryparams, returnValue
 * @returns {object} response object
 */

export const getAllProductService = async (queryParams, returnValue) => {
  try {
    const { limit, offset } = paginationQueryMetadata(
      queryParams.query.page,
      queryParams.query.limit
    );

    const products = await Product.findAndCountAll({
      limit,
      offset,
      attributes: {
        exclude: ['image', 'image_2', 'display'],
      },
      order: ['product_id', 'name'],
    });

    const paginationMeta = pageMetadata(
      queryParams.query.page,
      queryParams.query.limit,
      products.count,
      '/products'
    );
    if (products.count === 0) {
      return Helper.failResponse(returnValue, 404, {
        message: 'No products in the database',
      });
    }
    const { rows } = products;
    return { paginationMeta, rows };
  } catch (err) {
    return err.message;
  }
};

/**
 * @method getProductService
 * @description fetches product by product_id
 * Route: GET: /products/:product_id
 *
 * @returns {Object} product
 */

export const getProductService = async productId => {
  const product = await Product.findByPk(productId);
  if (product) {
    return product;
  }
  return false;
};

/**
 * Queries the database to get products by departments
 * @method getProductByDepartmentService
 * Route: GET products
 * @param {string} queryparams, returnValue
 * @returns {object} response object
 */

export const getProductByDepartmentService = async (department_id, queryParams, returnValue) => {// eslint-disable-line
  try {
    const { limit, offset } = paginationQueryMetadata(
      queryParams.query.page,
      queryParams.query.limit
    );
    const products = await ProductCategory.findAndCountAll({
      include: [
        {
          model: Product,
          as: 'product',
        },
        { model: Category, where: { department_id }, as: 'category' },
      ],
      limit,
      offset,
    });
    const paginationMeta = pageMetadata(
      queryParams.query.page,
      queryParams.query.limit,
      products.count,
      `/products/inDepartment/${department_id}`// eslint-disable-line
    );
    if (products.count === 0) {
      return Helper.failResponse(returnValue, 404, {
        message: 'No products in the database',
      });
    }
    const { rows } = products;
    return { paginationMeta, rows };
  } catch (err) {
    return err.message;
  }
};

/**
 * Queries the database to get products by departments
 * @method getProductByDepartmentService
 * Route: GET products
 * @param {string} queryparams, returnValue
 * @returns {object} response object
 */

export const getProductByCategoryService = async (category_id, queryParams, returnValue) => {// eslint-disable-line
  try {
    const { limit, offset } = paginationQueryMetadata(
      queryParams.query.page,
      queryParams.query.limit
    );

    const products = await ProductCategory.findAndCountAll({
      where: { category_id },
      include: [{ model: Product, as: 'product' }],
      limit,
      offset,
    });
    const paginationMeta = pageMetadata(
      queryParams.query.page,
      queryParams.query.limit,
      products.count,
      `/products/inCategory/${category_id}`// eslint-disable-line
    );
    if (products.count === 0) {
      return Helper.failResponse(returnValue, 404, {
        message: 'No products in the database',
      });
    }
    const { rows } = products;
    return { paginationMeta, rows };
  } catch (err) {
    return err.message;
  }
};

/**
 * Queries the database to get products
 * @method getProductSearchService
 * Route: GET products/search
 * @param {string} queryparams, returnValue
 * @returns {object} response object
 */

export const getProductSearchService = async (
  query_string, // eslint-disable-line
  all_words, // eslint-disable-line
  queryParams,
  returnValue
) => {
  try {
    const { limit, offset } = paginationQueryMetadata(
      queryParams.query.page,
      queryParams.query.limit
    );
    const products = await Product.findAndCountAll({
      where: {
        [Op.or]: [
          {
            name: { [Op.like]: `%${query_string}%` },// eslint-disable-line
          },
          {
            description: { [Op.like]: `%${query_string}%` },// eslint-disable-line
          },
        ],
      },
      limit,
      offset,
    });
    const paginationMeta = searchPageMetadata(
      queryParams.query.page,
      queryParams.query.limit,
      products.count,
      `/products/search?query_string=${query_string}&all_words=${all_words}`// eslint-disable-line
    );
    if (products.count === 0) {
      return Helper.failResponse(returnValue, 404, {
        message: 'No products in the database',
      });
    }
    const { rows } = products;
    return { paginationMeta, rows };
  } catch (err) {
    return err.message;
  }
};

/**
 * @method createProductReviewService
 * - it creates a new product review
 * - returns review data
 *
 * @param {Object} reviewDetails details of the review to be created
 *
 * @returns {Object} review object
 */

export const createProductReviewService = async reviewDetails => {
  const { product_id, review, rating, customer_id} = reviewDetails; // eslint-disable-line
  try {
    const result = await Review.create({
      product_id,
      review,
      rating,
      customer_id,
      created_on: Date.now(),
    });
    return result;
  } catch (err) {
    return err.message;
  }
};

/**
 * @method getProductReviewService
 * - get a list of product reviews
 * - returns review data
 *
 * @returns list of reviews
 */

export const getProductReviewService = async product_id => { // eslint-disable-line
  try {
    const reviews = await Review.findAll({
      where: {
        product_id,
      },
      include: [
        {
          model: Product,
          as: 'Product',
          attributes: {
            include: ['name'],
          },
        },
      ],
    });
    return reviews;
  } catch (err) {
    return err.message;
  }
};

// attributes: {
//   exclude: ['image', 'image_2', 'display'],
// },
