import express from 'express';
import checkAuth from '../auth/check-auth.js';
import OrdersController from '../controllers/orders.js';

const router = express.Router();

router.get('/', checkAuth('admin'), OrdersController.orders_get_all);

router.get('/:orderId', OrdersController.orders_get_order);

router.post('/', OrdersController.orders_create_order);

router.delete('/:orderId', checkAuth('admin'), OrdersController.orders_delete_order);

export default router;