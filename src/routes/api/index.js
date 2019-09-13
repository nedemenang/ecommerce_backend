import welcomeRoute from './welcome.route';
import customerRoute from './customer.route';
import customersRoute from './customers.route';
import categoriesRoute from './categories.route';
import departmentRoute from './departments.route';
import productRoute from './product.route';
import shoppingCartRoute from './shoppingCart.route';
import shippingRoute from './shipping.route';
import taxRoute from './tax.route';
import orderRoute from './order.route';
import attributeRoute from './attribute.route';
import stripeRoute from './stripe.route';

// const routes = Router();
export default app => {
  app.use('/', welcomeRoute);
  app.use('/customer', customerRoute);
  app.use('/departments', departmentRoute);
  app.use('/customers', customersRoute);
  app.use('/categories', categoriesRoute);
  app.use('/products', productRoute);
  app.use('/shoppingCart', shoppingCartRoute);
  app.use('/shipping', shippingRoute);
  app.use('/tax', taxRoute);
  app.use('/orders', orderRoute);
  app.use('/stripe', stripeRoute);
  app.use('/attributes', attributeRoute);
};
