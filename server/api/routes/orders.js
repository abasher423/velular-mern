import express from 'express';
import checkAuth from '../auth/check-auth.js';
import OrdersController from '../controllers/orders.js';

const router = express.Router();

router.get('/', OrdersController.orders_get_all);

router.get('/:orderId', checkAuth(), OrdersController.orders_get_order);

router.post('/', checkAuth(), OrdersController.orders_create_order);

router.delete('/:orderId', checkAuth('admin'), OrdersController.orders_delete_order);

export default router;