import mongoose from 'mongoose';
import Order from '../models/order.js';
import Product from '../models/product.js';

const getResponse = (order, type, desc, id) => {
    return {
        _id: order._id,
        currency: order.currency,
        quantity: order.quantity,
        amount: order.amount,
        date: order.date,
        shipping: order.shipping,
        products: order.products,
        payment: {
            method: order.method
        },
        complete: order.complete,
        request: {
            type: type,
            description: desc,
            url: `http://localhost:3000/api/orders/${id}`
        }
    }
};

const createOrder = (req) =>  {
    return {
        _id: mongoose.Types.ObjectId(),
        products: req.body.productId,
        currency: req.body.currency,
        quantity: req.body.quantity,
        amount: req.body.amount,
        method: req.body.method,
        date: req.body.date,
        complete: req.body.complete,
        shipping: req.body.userId
    }    
};

// @desc Fetch all orders
// @route GET /api/orders
// @access Private
const orders_get_all = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate('products', 'name price quantity')
        .populate('shipping', 'email fullName street city country stat postcode');
        if (orders.length > 0){
            const response = {
                count: orders.length,
                orders: orders.map(order => {
                    return getResponse(order, 'GET', 'Get current order', order._id);
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
}

// @desc Fetch single product
// @route GET /api/orders/:orderId
// @access Public
const orders_get_order = async (req, res) => {
    try {
        const order = await Order
        .findById(req.params.orderId)
        .populate('products', 'name price quantity')
        .populate('shipping', 'email fullName street city country stat postcode');
        if (order){
            console.log(order);
            res.status(200).json(getResponse(order, 'GET', 'Get all orders', ''));
        } else {
            res.status(404).json({ message: 'order not found' });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
};

// @desc Create an order
// @route POST /api/odrders
// @access Public
const orders_create_order = (req, res) => {
    Product.findById(req.body.productId)
        .then(product => {
            if(!product){
                return res.status(404).json({ message: 'Product not found' });
            }
            const order = new Order(createOrder(req));
            return order.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Order created successfully',
                createdOrder: getResponse(result, 'GET', 'Get created order', result._id)
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
};

// @desc Delete an order
// @route DELETE /api/odrders
// @access Private
const orders_delete_order = async (req, res) => {
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
}

export default { 
    orders_get_all,
    orders_create_order,
    orders_get_order,
    orders_delete_order
};