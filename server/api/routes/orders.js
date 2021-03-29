import express from 'express';
import checkAuth from '../auth/check-auth.js';
import OrdersController from '../controllers/orders.js';

const router = express.Router();

router.get('/', OrdersController.orders_get_all);

router.get('/:orderId', OrdersController.orders_get_order);

router.get('/:userId/orders', checkAuth(), OrdersController.orders_get_user);

router.put('/:orderId/pay', checkAuth(), OrdersController.order_update_paid);

router.post('/', checkAuth(), OrdersController.orders_create_order);

router.delete('/:orderId', OrdersController.orders_delete_order);

export default router;