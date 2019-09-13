/**
 * The Product controller contains all static methods that handles product request
 * Some methods work fine, some needs to be implemented from scratch while others may contain one or two bugs
 * The static methods and their function include:
 *
 * - getAllProducts - Return a paginated list of products
 * - searchProducts - Returns a list of product that matches the search query string
 * - getProductsByCategory - Returns all products in a product category
 * - getProductsByDepartment - Returns a list of products in a particular department
 * - getProduct - Returns a single product with a matched id in the request params
 * - getAllDepartments - Returns a list of all product departments
 * - getDepartment - Returns a single department
 * - getAllCategories - Returns all categories
 * - getSingleCategory - Returns a single category
 * - getDepartmentCategories - Returns all categories in a department
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import { getDepartment, getDepartmentList } from '../services/department.service';
import {
  getAllProductService,
  getProductService,
  getProductByDepartmentService,
  getProductByCategoryService,
  getProductSearchService,
  getProductReviewService,
  createProductReviewService,
} from '../services/product.service';
import {
  getAllCategoryService,
  getCategoryService,
  getDepartmentCategoryService,
  getProductCategoryService,
} from '../services/category.service';
import Helper from '../services/helper';

// import { Product, Department, AttributeValue, Attribute } from '../database/models';
/**
 *
 *
 * @class ProductController
 */
class ProductController {
  /**
   * get all products
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and product data
   * @memberof ProductController
   */
  static async getAllProducts(req, res, next) {// eslint-disable-line
    try {
      const products = await getAllProductService(req, res);
      return Helper.successResponse(res, 200, products);
    } catch (error) {
      /* instanbul ignore next */
      return Helper.failResponse(res, 500, error);
    }
  }

  /**
   * search all products
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and product data
   * @memberof ProductController
   */
  static async searchProduct(req, res, next) {
    const { query_string, all_words } = req.query;  // eslint-disable-line
    try {
      const products = await getProductSearchService(query_string, all_words, req, res);
      return Helper.successResponse(res, 200, products);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get all products by caetgory
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and product data
   * @memberof ProductController
   */
  static async getProductsByCategory(req, res, next) {
    try {
      const { category_id } = req.params; // eslint-disable-line
      const products = await getProductByCategoryService(category_id, req, res);
      return Helper.successResponse(res, 200, products);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get all products by department
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and product data
   * @memberof ProductController
   */
  static async getProductsByDepartment(req, res, next) {
    // implement the method to get products by department
    try {
      const { department_id } = req.params; // eslint-disable-line
      const products = await getProductByDepartmentService(department_id, req, res);
      return Helper.successResponse(res, 200, products);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get single product details
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and product details
   * @memberof ProductController
   */
  static async getProduct(req, res, next) {
    try {
      const { product_id } = req.params; // eslint-disable-line
      const product = await getProductService(product_id);
      if (product) {
        return Helper.successResponse(res, 200, product);
      }
      return Helper.failResponse(res, 404, {
        status: 404,
        message: `Product with id ${product_id} does not exist`,// eslint-disable-line
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get all departments
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and department list
   * @memberof ProductController
   */
  static async getAllDepartments(req, res, next) {
    try {
      const departments = await getDepartmentList();
      return Helper.successResponse(res, 200, departments);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Get a single department
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getDepartment(req, res, next) {
    const { department_id } = req.params; // eslint-disable-line
    try {
      const department = await getDepartment(department_id);
      if (department) {
        return Helper.successResponse(res, 200, department);
      }
      return Helper.failResponse(res, 404, {
        status: 404,
        message: `Department with id ${department_id} does not exist`, // eslint-disable-line
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method should get all categories
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAllCategories(req, res, next) {
    try {
      const categories = await getAllCategoryService();
      if (categories.count > 0) {
        return Helper.successResponse(res, 200, categories.rows);
      }
      return Helper.failResponse(res, 404, 'CAT_01', 'category', `No category in database`);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method should get a single category using the categoryId
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getSingleCategory(req, res, next) {
    const { category_id } = req.params;  // eslint-disable-line
    try {
      const category = await getCategoryService(category_id);
      if (category) {
        return Helper.successResponse(res, 200, category);
      }
      return Helper.failResponse(
        res,
        404,
        'CAT_01',
        'category_id',
        `Don't exist category with this ID`
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method should get list of categories in a department
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getDepartmentCategories(req, res, next) {
    const { department_id } = req.params;  // eslint-disable-line
    try {
      const department = await getDepartment(department_id);
      if (department) {
        const categories = await getDepartmentCategoryService(department_id);
        if (categories.count > 0) {
          return Helper.successResponse(res, 200, { rows: categories.rows });
        }
        return Helper.failResponse(
          res,
          404,
          'CAT_01',
          'categories',
          `No categories for the department`
        );
      }
      return Helper.failResponse(
        res,
        404,
        'DEPT_01',
        'department_id',
        `Don't exist department with this ID`
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method should get list of categories in a department
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getProductCategory(req, res, next) {
    const { product_id } = req.params;  // eslint-disable-line
    try {
      const product = await getProductService(product_id);
      if (product) {
        const productCategory = await getProductCategoryService(product_id);
        if (productCategory) {
          const category = {
            category_id: productCategory.Categories[0].category_id,
            department_id: productCategory.Categories[0].department_id,
            name: productCategory.Categories[0].name,
          };
          return Helper.successResponse(res, 200, category);
        }
        return Helper.failResponse(
          res,
          404,
          'PROD_01',
          'product',
          `Don't exist product with this for this category`
        );
      }
      return Helper.failResponse(
        res,
        404,
        'PROD_01',
        'product_id',
        `Don't exist product with this ID`
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method should product reviews
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getProductReview(req, res, next) {
    const { product_id } = req.params;  // eslint-disable-line
    try {
      const product = await getProductService(product_id);
      if (product) {
        const reviews = await getProductReviewService(product_id);
        if (reviews.length > 0) {
          const result = reviews.map(item => {
            return {
              name: item.Product.name,
              review: item.review,
              rating: item.rating,
              created_on: item.created_on,
            };
          });
          return Helper.successResponse(res, 200, result);
        }
        return Helper.failResponse(res, 404, 'REV_01', 'reviews', `No reviews for this product`);
      }
      return Helper.failResponse(
        res,
        404,
        'PROD_01',
        'product_id',
        `Don't exist product with this ID`
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * create a product review record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, product data and access token
   * @memberof ProductController
   */
  static async createProductReview(req, res, next) {// eslint-disable-line
    // Implement the function to create product review
    const payload = req.body;
    payload.customer_id = req.customer_id;
    try {
      const product = await getProductCategoryService(payload.product_id);
      if (product) {
        const value = await createProductReviewService(payload);
        const result = {
          review: value.review,
          rating: value.rating,
          created_on: value.created_on,
          name: product.name,
        };
        return Helper.successResponse(res, 201, result);
      }
    } catch (error) {
      return Helper.errorResponse(res, 500);
    }
  }
}

export default ProductController;
