import mongoose from 'mongoose';
import Order from '../models/order.js';
import Product from '../models/product.js';

const getResponse = (order, type, desc, id) => {
    return {
        order,
        request: {
            type: type,
            description: desc,
            url: `http://localhost:8080/api/orders/${id}`
        }
    }
};

const orders_get_all = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate('user', '_id firstName lastName email');
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

const orders_get_order = async (req, res) => {
    try {
        const order = await Order
        .findById(req.params.orderId)
        .populate('user', '_id firstName lastName email');
        if (order){
            // if (req.userData.userId == order.user._id){
                res.status(200).json({
                    order: order,
                    request: {
                        type: 'GET',
                        description: 'Fetch all orders',
                        url: 'http://localhost:8080/api/orders'
                    }
                });
            // } else {
                // res.status(401).json({ message: 'Unauthorized'});
            // }
        } else {
            res.status(404).json({ message: 'order not found' });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
};

// https://www.udemy.com/course/mern-ecommerce/learn/lecture/22495586?start=150#questions
const orders_create_order = async (req, res) => {
   try {
        const { orderItems, shippingDetails, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
        if (orderItems.length >= 1){
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                user: req.userData.userId,
                orderItems, shippingDetails, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
            });
            await order.save();
            res.status(201).json({order,
                message: 'Order created successfully',
                request: {
                    type: 'GET',
                    description: 'Get Created Order',
                    url: `http://localhost:8080/api/orders/${order._id}`
                }
            });
        } else {
            res.status(400).json({ message: "No items in cart"})
        }
   } catch (err){
       res.status(500).json({ error: err });
   }
};

const orders_get_user = async (req, res) => {
    try {
        if (req.userData.userId === req.params.userId){
            const orders = await Order.find({ user: req.params.userId}); // find orders with matching userId
            console.log(orders)
            if (orders.length >= 1){
                res.status(200).json({
                    count: orders.length,
                    orders: orders.map(order => {
                        return {
                            _id: order._id,
                            user: order.user,
                            shippingDetails: order.shippingDetails,
                            orderItems: order.orderItems,
                            date: order.date,
                            currency: order.currency,
                            itemsPrice: order.itemsPrice,
                            taxPrice: order.taxPrice,
                            totalPrice: order.totalPrice,
                            shippingPrice: order.shippingPrice,
                            paymentMethod: order.paymentMethod,
                            paidAt: order.paidAt,
                            deliveredAt: order.deliveredAt,
                            isPaid: order.isPaid,
                            isDelivered: order.isDelivered,
                            isComplete: order.isComplete
                        }
                    })
                })
            } else {
                res.status(400).json({ message: 'No entry exists' });
            }
        } else {
            res.status(401).json({ message: 'Authentication Failed' });
        }
    } catch (err){
        res.status(500).json({ error: err });
    }
}

// @desc Update an order to paid
// @route PATCH /api/odrders
// @access Private
// https://github.com/bradtraversy/proshop_mern/blob/master/backend/controllers/orderController.js
const order_update_paid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        console.log(order)
        if (order){
            for (const idx in order.orderItems){
                const item = order.orderItems[idx];
                const product = await Product.findById(item.productId);
                product.quantityInStock -= item.quantity;
            }
            // set order to paid
            let date = new Date(Date.now());
            order.isPaid = true;
            order.paidAt = date.toUTCString();
            order.paymentResuslt = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
            };
            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        } else {
            res.status(400).json({ message: 'Invalid request'});
        }
    } catch (err){
        res.status(500).json({ error: err });
    }
}

const order_update_delivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (order){
            // set to delivered
            let date = new Date(Date.now());
            order.isDelivered = true;
            order.deliveredAt = date.toUTCString();
            await order.save();
            res.status(200).json({ message: 'Order set to Delivered' });
        } else {
            res.status(400).json({ message: 'No entry found for provided Order ID' });
        }
    } catch (err){
        res.status(500).json({ error: err });
    }
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
    orders_get_user,
    order_update_paid,
    order_update_delivered,
    orders_delete_order
};