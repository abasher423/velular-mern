import express from 'express';
import mongoose from 'mongoose';
import Order from '../models/order.js';

const router = express.Router();

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