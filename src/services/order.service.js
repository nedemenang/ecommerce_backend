import sgMail from '@sendgrid/mail';
import model from '../database/models';
import { getProductsInShoppingCartService } from './shoppingCart.service';

const { Order, Customer, OrderDetail } = model;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Queries the database to get all taxes
 * @method createOrderService
 * Route: POST orders
 * @returns {object} order item
 */

export const createOrderService = async orderDetail => {
  const { cart_id, shipping_id, tax_id, customer_id } = orderDetail; // eslint-disable-line
  try {
    const order = await Order.create({
      cart_id,
      shipping_id,
      tax_id,
      customer_id,
    });

    const cartItems = await getProductsInShoppingCartService(cart_id);

    const orderItems = cartItems.map(cartItem => {
      return {
        order_id: order.order_id,
        product_id: cartItem.product_id,
        attributes: cartItem.attributes,
        product_name: cartItem.name,
        quantity: cartItem.quantity,
        unit_cost: cartItem.price,
        sub_total: cartItem.sub_total,
      };
    });

    let totalAmount = 0;
    for (let i = 0; i < orderItems.length; i++) {// eslint-disable-line
      totalAmount += orderItems[i].sub_total;
    }
    await OrderDetail.bulkCreate(orderItems);
    await order.update({
      total_amount: totalAmount,
    });
    return order.order_id;
  } catch (err) {
    return err.message;
  }
};

/**
 * @method getOrderService
 * @description fetches single order
 * Route: GET: /orders/:order_id
 *
 * @returns {Object} order item
 */

export const getOrderService = async order_id => {// eslint-disable-line
  try {
    const orderDetail = await OrderDetail.findAll({
      where: {
        order_id,
      },
    });

    return { order_id, order_items: orderDetail };
  } catch (err) {
    return err.message;
  }
};

/**
 * @method getCustomerOrderService
 * @description fetches customer orders
 * Route: GET: /orders/inCustomer
 *
 * @returns {Object} order item
 */

export const getCustomerOrderService = async customer_id => {// eslint-disable-line
  try {
    const orders = await Order.findAndCountAll({
      where: { customer_id },
      include: [
        {
          model: Customer,
          as: 'Customer',
        },
      ],
    });
    return orders;
  } catch (err) {
    return err.message;
  }
};

/**
 * @method getOrderShortDetailService
 * @description fetches order short details
 * Route: GET: /orders/shortDetail/{order_id}
 *
 * @returns {Object} order short detail
 */

export const getOrderShortDetailService = async order_id => {// eslint-disable-line
  try {
    const order = await Order.findOne({
      where: { order_id },
      include: [
        {
          model: Customer,
          as: 'Customer',
        },
      ],
      attributes: {
        exclude: ['comments', 'auth_code', 'reference', 'shipping_id', 'tax_id'],
      },
    });
    const { total_amount, created_on, shipped_on, status } = order;// eslint-disable-line
    const detail = {
      order_id,
      total_amount,
      created_on,
      shipped_on,
      status,
      name: order.Customer.name,
    };
    return detail;
  } catch (err) {
    return err.message;
  }
};

/**
 * @method getOrderObjectService
 * @description fetches order short details
 *
 * @returns {Object} order
 */

export const getOrderObjectService = async order_id => {// eslint-disable-line
  try {
    const order = await Order.findByPk(order_id);
    return order;
  } catch (err) {
    return err.message;
  }
};

/**
 * @method sendOrderEmail
 * @description send order email
 *
 * @returns {Object} boolean
 */

export const sendOrderEmail = async (order_id, total_amount, to_email) => {// eslint-disable-line
  try {
    const msg = {
      to: `${to_email}`,// eslint-disable-line
      from: 'sampleecommerce@example.com',
      subject: 'Order Confirmed',
      text: `Your order with ID ${order_id} with total cost ${total_amount} has been confirmed.`,// eslint-disable-line
      html: `<strong>Your order with ID ${order_id} with total cost ${total_amount} has been confirmed.</strong>`,// eslint-disable-line
    };
    sgMail.send(msg);
    return true;
  } catch (err) {
    return err.message;
  }
};
