import express from 'express';
import CartsController from '../controllers/carts.js';

const router = express.Router();

router.get('/', CartsController.carts_get_all);

router.get('/:cartId', CartsController.carts_get_cart);

router.post('/', CartsController.carts_create_cart);

router.patch('/:cartId', CartsController.carts_update_cart);

router.delete('/:cartId', CartsController.carts_delete_cart);

export default router;