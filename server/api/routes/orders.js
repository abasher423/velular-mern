import express from 'express';
import mongoose from 'mongoose';
import Order from '../models/order.js';

const router = express.Router();

// @desc Fetch all orders
// @route GET /api/orders
// @access Private
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        if (orders.length > 0){
            const response = {
                count: orders.length,
                orders: orders.map(order => {
                    return {
                        _id: order._id,
                        productId: order.product,
                        currency: order.currency,
                        quantity: order.quantity,
                        amount: order.amount,
                        date: order.date,
                        payment: {
                            method: order.method
                        }
                    }
                })
            }
            res.status(200).json(response);
        } else {
            res.status(404).json({ message: 'No entry exists for orders'});
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
});

// @desc Create an order
// @route POST /api/odrders
// @access Private
router.post('/', async (req, res) => {
    try {
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            product: req.body.productId,
            currency: req.body.currency,
            quantity: req.body.quantity,
            amount: req.body.amount,
            method: req.body.method,
            date: req.body.date
        });
        const result = await order.save();
        console.log(result);
        res.status(201).json(result);
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
});

export default router;