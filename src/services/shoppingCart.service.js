import model from '../database/models';

const uniqid = require('uniqid');

const { ShoppingCart, Product } = model;

/**
 * Generates a unique cart Id
 * @method generateCartIdService
 * Route: GET /shoppingcart/generateUniqueId
 * @returns {string} unique cart Id
 */

export const generateCartIdService = async () => {
  const cartId = uniqid();
  if (cartId) {
    return cartId;
  }
  return false;
};

/**
 * @method addProductToShoppingCartService
 * @description adds item to shopping cart
 * Route: POST: /shoppingcart/add
 *
 * @returns {Object} department list
 */

export const addProductToShoppingCartService = async cartDetails => {
    const { product_id, attributes, quantity, cart_id} = cartDetails; // eslint-disable-line
  try {
    const result = await ShoppingCart.create({
      product_id,
      attributes,
      quantity,
      cart_id,
    });
    return result;
  } catch (err) {
    return err.message;
  }
};

/**
 * @method getProductsInShoppingCartService
 * - get a list of product reviews
 * - returns review data
 * - Route: GET  /shoppingcart/:cart_id
 * @returns list of products in shopping cart
 */

export const getProductsInShoppingCartService = async cart_id => { // eslint-disable-line
  try {
    const cartItems = await ShoppingCart.findAll({
      where: {
        cart_id,
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    const cart = cartItems.map(cartItem => {
      return {
        cart_id: cartItem.cart_id,
        item_id: cartItem.item_id,
        name: cartItem.Product.name,
        attributes: cartItem.attributes,
        product_id: cartItem.product_id,
        price: cartItem.Product.price,
        quantity: cartItem.quantity,
        image: cartItem.Product.image,
        discounted_price: cartItem.Product.discounted_price,
        sub_total: cartItem.Product.price * cartItem.quantity,
      };
    });
    return cart;
  } catch (err) {
    return err.message;
  }
};

/**
 * @method getSingleCartItemService
 * @description fetches single cart item
 *
 * @returns {Object} cart
 */

export const getSingleCartItemService = async item_id => {// eslint-disable-line
  try {
    const cart = await ShoppingCart.findByPk(item_id);
    return cart;
  } catch (err) {
    return err.message;
  }
};

/**
 * @method updateCartItemQuantityService
 * - update cart item quantity
 *
 * @param {Object} item_id id of the item to be updated
 *
 * @returns {Object} update cart item */

export const updateCartItemQuantityService = async updateDetail => {
  const cartItem = await ShoppingCart.findByPk(updateDetail.item_id);

  const updatedCartItem = await cartItem.update({
    quantity: updateDetail.quantity,
  });
  return updatedCartItem;
};

/**
 * @method emptyShoppingCartService
 * - empty shopping cart
 *
 * @param {Object} cart_id id of the cart to be deleted
 *
 * @returns {Object} empty shopping cart */

export const emptyShoppingCartService = async cart_id => {// eslint-disable-line
  await ShoppingCart.destroy({
    where: {
      cart_id,
    },
  });
  return [];
};

/**
 * @method removeShoppingCartItemService
 * - remove shopping cart item
 *
 * @param {Object} item_id id of the item to be deleted
 *
 * @returns {Object} remove shopping cart item */

export const removeShoppingCartItemService = async item_id => {// eslint-disable-line
  await ShoppingCart.destroy({
    where: {
      item_id,
    },
  });
  return [];
};

/**
 * @method getSingleCartService
 * - remove shopping cart item
 *
 * @param {Object} cart_id id of the cart
 *
 * @returns {Object} shopping cart */

export const getSingleCartService = async cart_id => {// eslint-disable-line
  const cart = await ShoppingCart.findOne({
    where: {
      cart_id,
    },
  });
  return cart;
};
