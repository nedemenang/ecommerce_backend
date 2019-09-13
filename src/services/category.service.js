import model from '../database/models';

const { Category, Product } = model;

/**
 * Queries the database to get all categories
 * @method getAllCategoryService
 * Route: GET categories
 * @returns {object} response object
 */

export const getAllCategoryService = async () => {
  try {
    const categories = await Category.findAndCountAll();
    return categories;
  } catch (err) {
    return err.message;
  }
};

/**
 * @method getCategoryService
 * @description fetches category by category_id
 * Route: GET: /categories/:category_id
 *
 * @returns {Object} category
 */

export const getCategoryService = async categoryId => {
  const category = await Category.findByPk(categoryId);
  if (category) {
    return category;
  }
  return false;
};

/**
 * @method getDepartmentCategoryService
 * @description fetches categories in department
 * Route: GET: categories/inDepartment/:department_id
 *
 * @returns {Object} category
 */

export const getDepartmentCategoryService = async department_id => {// eslint-disable-line
  try {
    const categories = await Category.findAndCountAll({
      where: {
        department_id,
      },
    });
    return categories;
  } catch (err) {
    return err.message;
  }
};

/**
 * @method getProductCategoryService
 * @description fetches categories in product
 * Route: GET: /categories/inProduct/:product_id
 *
 * @returns {Object} category
 */

export const getProductCategoryService = async product_id => {// eslint-disable-line
  try {
    const productCategory = await Product.findOne({
      where: {
        product_id,
      },
      include: [
        {
          model: Category,
          as: 'Categories',
        },
      ],
    });
    return productCategory;
  } catch (err) {
    return err.message;
  }
};
