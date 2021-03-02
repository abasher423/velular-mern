import express from 'express';
import mongoose from 'mongoose';
import Order from '../models/order.js';
import Product from '../models/product.js';

const router = express.Router();

// @desc Fetch all orders
// @route GET /api/orders
// @access Private
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().select('_id product currency quantity amount method date');
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
                        },
                        request: {
                            type: 'GET',
                            description: 'Get current order',
                            url: `http://localhost:3000/api/orders/${order._id}`
                        }
                    }
                })
            }
            res.status(200).json(response);
        } else {
            res.status(404).json({ 
                message: 'No entry exists for orders',
                request: {
                    type: 'POST',
                    description: 'Create an order',
                    url: 'http://localhost:3000/api/orders'
                }
            });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
});

// @desc Fetch single product
// @route GET /api/products/:productId
// @access Public
router.get('/:orderId', async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).select('_id product currency quantity amount method date');
        if (order){
            console.log(order);
            res.status(200).json({
                _id: order._id,
                productId: order.product,
                currency: order.currency,
                quantity: order.quantity,
                amount: order.amount,
                date: order.date,
                payment: {
                    method: order.method
                },
                request: {
                    type: 'GET',
                    description: 'Get all orders',
                    url: 'http://localhost:3000/api/orders'
                }
            })
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
});

// @desc Create an order
// @route POST /api/odrders
// @access Private
router.post('/', (req, res) => {
    Product.findById(req.body.productId)
        .then(product => {
            if(!product){
                return res.status(404).json({ message: 'Product not found' });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                product: req.body.productId,
                currency: req.body.currency,
                quantity: req.body.quantity,
                amount: req.body.amount,
                method: req.body.method,
                date: req.body.date
            });
            return order.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Order created successfully',
                createdOrder: {
                _id: result._id,
                productId: result.product,
                currency: result.currency,
                quantity: result.quantity,
                amount: result.amount,
                date: result.date,
                payment: {
                    method: result.method
                }
            },
            request: {
                type: 'GET',
                description: 'Get created orders',
                url: `http://localhost:3000/api/orders${result._id}`
            }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
});

router.delete('/:orderId', async (req, res) => {
    try {
        const result = await Order.deleteOne({_id: req.params.orderId});
        if (result.n > 0){
            console.log(result);
            res.status(200).json({
                message: 'Order deleted successfully',
                request: {
                    type: 'POST',
                    description: 'Create an order',
                    url: 'http://localhost:3000/api/orders',
                    body: {
                        product: 'ObjectId',
                        currency: 'String',
                        amount: 'Number',
                        method: 'String',
                        date: 'Date'
                    }
                }
            });
        } else {
            res.status(404).json({
                message: 'No entry exists or aleady deleted',
                request: {
                    type: 'GET',
                    description: 'Get all orders',
                    url: 'http://localhost:3000/api/orders'
                }
            });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
});

export default router;