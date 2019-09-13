/**
 * Check each method in the shopping cart controller and add code to implement
 * the functionality or fix any bug.
 * The static methods and their function include:
 *
 * - generateUniqueCart - To generate a unique cart id
 * - addItemToCart - To add new product to the cart
 * - getCart - method to get list of items in a cart
 * - updateCartItem - Update the quantity of a product in the shopping cart
 * - emptyCart - should be able to clear shopping cart
 * - removeItemFromCart - should delete a product from the shopping cart
 * - createOrder - Create an order
 * - getCustomerOrders - get all orders of a customer
 * - getOrderSummary - get the details of an order
 * - processStripePayment - process stripe payment
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import Stripe from 'stripe';
import dotenv from 'dotenv';

import {
  generateCartIdService,
  addProductToShoppingCartService,
  getProductsInShoppingCartService,
  getSingleCartItemService,
  updateCartItemQuantityService,
  emptyShoppingCartService,
  removeShoppingCartItemService,
  getSingleCartService,
} from '../services/shoppingCart.service';
import { getSingleTaxService } from '../services/tax.service';
import { getCustomerProfile } from '../services/customer.service';
import { getSingleShippingService } from '../services/shipping.service';
import {
  createOrderService,
  getCustomerOrderService,
  getOrderShortDetailService,
  getOrderService,
  getOrderObjectService,
  sendOrderEmail,
} from '../services/order.service';

import { getProductService } from '../services/product.service';
import Helper from '../services/helper';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
/**
 *
 *
 * @class shoppingCartController
 */
class ShoppingCartController {
  /**
   * generate random unique id for cart identifier
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart_id
   * @memberof shoppingCartController
   */
  static async generateUniqueCart(req, res) {
    // implement method to generate unique cart Id
    try {
      const cartId = await generateCartIdService();
      if (cartId) {
        return Helper.successResponse(res, 200, { cart_id: cartId });
      }
      return Helper.failResponse(res, 400, 'cart id not generated');
    } catch (error) {
      return Helper.errorResponse(res, 500);
    }
  }

  /**
   * adds item to a cart with cart_id
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async addItemToCart(req, res, next) {// eslint-disable-line
    // implement function to add item to cart
    const { product_id } = req.body; // eslint-disable-line
    try {
      const product = await getProductService(product_id);
      if (product) {
        const cart = await addProductToShoppingCartService(req.body);
        return Helper.successResponse(res, 200, cart);
      }
      return Helper.failResponse(res, 400, 'PRD_01', 'product', 'Product does not exist');
    } catch (error) {
      return Helper.errorResponse(res, 500);
    }
  }

  /**
   * get shopping cart using the cart_id
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async getCart(req, res, next) {// eslint-disable-line
    // implement method to get cart items
    const { cart_id } = req.params;// eslint-disable-line
    try {
      const cart = await getProductsInShoppingCartService(cart_id);
      return Helper.successResponse(res, 200, cart);
    } catch (err) {
      return Helper.errorResponse(res, 500);
    }
  }

  /**
   * update cart item quantity using the item_id in the request param
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async updateCartItem(req, res, next) {// eslint-disable-line
    const { item_id } = req.params // eslint-disable-line
    const { quantity } = req.body;
    const item = await getSingleCartItemService(item_id);
    if (item) {
      const updatedItem = await updateCartItemQuantityService({ item_id, quantity });
      return Helper.successResponse(res, 200, updatedItem);
    }
    return Helper.failResponse(res, 404, 'CRT_01', 'itemId', 'Item does not exist');
  }

  /**
   * removes all items in a cart
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async emptyCart(req, res, next) {// eslint-disable-line
    // implement method to empty cart
    const { cart_id } = req.params // eslint-disable-line
    const cart = await getSingleCartService(cart_id);
    if (cart) {
      const emptyCart = await emptyShoppingCartService(cart_id);
      return Helper.successResponse(res, 200, emptyCart);
    }
    return Helper.failResponse(res, 404, 'CRT_01', 'cart Id', 'Cart does not exist');
  }

  /**
   * remove single item from cart
   * cart id is obtained from current session
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with message
   * @memberof ShoppingCartController
   */
  static async removeItemFromCart(req, res, next) {// eslint-disable-line
    const { item_id } = req.params // eslint-disable-line
    const item = await getSingleCartItemService(item_id);
    if (item) {
      const removedItem = await removeShoppingCartItemService(item_id);// eslint-disable-line
      return Helper.successResponse(res, 200, { message: 'Item removed successfully' });
    }
    return Helper.failResponse(res, 404, 'ITM_01', 'item', 'Item does not exist in cart');
  }

  /**
   * create an order from a cart
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with created order
   * @memberof ShoppingCartController
   */
  static async createOrder(req, res, next) {// eslint-disable-line
    const { cart_id, shipping_id, tax_id } = req.body;// eslint-disable-line
    const payload = {
      cart_id,
      shipping_id,
      tax_id,
      customer_id: req.customer_id,
    };
    try {
      const cart = getSingleCartItemService(cart_id);
      if (cart) {
        const shipping = getSingleShippingService(shipping_id);
        if (shipping) {
          const tax = getSingleTaxService(tax_id);
          if (tax) {
            payload.customer_id = req.customer_id;
            const order = await createOrderService(payload);
            return Helper.successResponse(res, 201, { order_id: order });
          }
          return Helper.failResponse(
            res,
            400,
            'TAX_01',
            'tax',
            `Tax with id-${tax_id} does not exist`// eslint-disable-line
          );
        }
        return Helper.failResponse(
          res,
          400,
          'SHP_01',
          'tax',
          `Shipping with id-${shipping_id} does not exist`,// eslint-disable-line
        );
      }
      return Helper.failResponse(
        res,
        400,
        'CRT_01',
        'tax',
        `Card with id-${cart_id} does not exist`,// eslint-disable-line
      );
    } catch (error) {
      return Helper.errorResponse(res, 500);
    }
  }

  /**
   *
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with customer's orders
   * @memberof ShoppingCartController
   */
  static async getCustomerOrders(req, res, next) {
    const { customer_id } = req;  // eslint-disable-line
    try {
      const orders = await getCustomerOrderService(customer_id);

      if (orders.count > 0) {
        const values = orders.rows.map(item => {
          return {
            order_id: item.order_id,
            total_amount: item.total_amount,
            created_on: item.created_on,
            shipped_on: item.shipped_on,
            name: item.Customer.name,
          };
        });
        return Helper.successResponse(res, 200, values);
      }
      return Helper.failResponse(
        res,
        404,
        'ORD_01',
        'order',
        `No orders for this customer.`,// eslint-disable-line
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   *
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with order summary
   * @memberof ShoppingCartController
   */
  static async getOrderSummary(req, res, next) {
    const { order_id } = req.params;  // eslint-disable-line
    const { customer_id } = req;   // eslint-disable-line
    try {
      const order = await getOrderShortDetailService(order_id);
      if (order) {
        return Helper.successResponse(res, 200, order);
      }
      return Helper.failResponse(
        res,
        404,
        'ORD_01',
        'order',
        `No orders for Id - ${order_id}.`,// eslint-disable-line
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   *
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with order
   * @memberof ShoppingCartController
   */
  static async getOrder(req, res, next) {
    const { order_id } = req.params;  // eslint-disable-line
    try {
      const order = await getOrderService(order_id);
      if (order) {
        return Helper.successResponse(res, 200, order);
      }
      return Helper.failResponse(
        res,
        404,
        'ORD_01',
        'order',
        `No orders for Id - ${order_id}.`,// eslint-disable-line
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async processStripePayment(req, res, next) {// eslint-disable-line
    const { email, stripeToken, order_id } = req.body; // eslint-disable-line
    const { customer_id } = req;  // eslint-disable-line
    try {
      const order = await getOrderObjectService(order_id);
      const customerProfile = await getCustomerProfile(customer_id);
      if (!order) {
        return Helper.failResponse(
          res,
          404,
          'ORD_01',
          'order',
          `No orders for Id - ${order_id}.`,// eslint-disable-line
        );
      }
      stripe.customers
        .create({
          email,
        })
        .then(customer => {
          return stripe.customers.createSource(customer.id, {
            source: stripeToken,
          });
        })
        .then(source => {
          return stripe.charges.create({
            amount: Number(order.total_amount * 100),
            currency: 'usd',
            customer: source.customer,
          });
        })
        .then(charge => {
          order.update({ status: 1 }).then(() => {});
          sendOrderEmail(order_id, order.total_amount, customerProfile.email);
          return Helper.successResponse(res, 200, { message: 'Transaction successful', charge });
        })
        .catch(err => {
          return Helper.failResponse(
            res,
            400,
            'USR_02',
            'stripe',
            `Transaction failed: ${err}`,// eslint-disable-line
          );
        });
    } catch (error) {
      next(error);
    }
  }
}

export default ShoppingCartController;
