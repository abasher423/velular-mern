import mongoose from 'mongoose';
import Order from '../models/order.js';
import Product from '../models/product.js';

// function to get the resoponse needed from the database
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

// function to get all orders from the database
const orders_get_all = async (req, res) => {
    try {
        const orders = await Order.find() // finds all orders
        .populate('user', '_id firstName lastName email'); // populates user field with fields from users' document
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
                    description: 'Create an individual order',
                    url: 'http://localhost:3000/api/orders'
                }
            });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
}

// function to get a specific order
const orders_get_order = async (req, res) => {
    try {
        const order = await Order
        .findById(req.params.orderId)
        .populate('user', '_id firstName lastName email');
        if (order){
            // checks if ID found in the jwt is same as token provided in request or if its an admin
            if (req.userData.userId === order.user._id.toString() || req.userData.role === 'admin'){
                res.status(200).json({
                    order: order,
                    request: {
                        type: 'GET',
                        description: 'Fetch all orders',
                        url: 'http://localhost:8080/api/orders'
                    }
                });
            } else {
                res.status(401).json({ message: 'Unauthorized'});
            }
        } else {
            res.status(404).json({ message: 'No order found' });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
};

// function to create an orders in the database
const orders_create_order = async (req, res) => {
   try {
        const { orderItems, shipping, paymentMethod, totalItemsPrice, tax, totalShippingPrice, total } = req.body;
        if (orderItems.length >= 1){ // orders is an array, checks if an order exists
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                user: req.userData.userId,
                orderItems, shipping, paymentMethod, totalItemsPrice, tax, totalShippingPrice, total
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
            res.status(400).json({ message: "No items found"})
        }
   } catch (err){
       console.log(err)
       res.status(500).json({ error: err });
   }
};

// function to get all orders that belong to a specific user
const orders_get_user = async (req, res) => {
    try {
        // checks userId provided in jwt against one provided by the client
        if (req.userData.userId === req.params.userId){
            const orders = await Order
                .find({ user: req.params.userId}) // find orders with matching userId
                .populate('user', 'firstName lastName')
            if (orders.length >= 1){
                res.status(200).json({
                    count: orders.length,
                    orders: orders.map(order => {
                        return {
                            _id: order._id,
                            user: order.user,
                            shipping: order.shipping,
                            orderItems: order.orderItems,
                            date: order.date,
                            currency: order.currency,
                            totalItemsPrice: order.totalItemsPrice,
                            tax: order.tax,
                            total: order.total,
                            totalShippingPrice: order.totalShippingPrice,
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

/*
    * A function which sets order to paid and and stores PayPal payment information
    * Developer 
    * This was adapted from a Udemy course by Brad Traversy
    * Link here to Udemy course:
    * https://www.youtube.com/watch?v=8Ip0pcwbWYM&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=13&ab_channel=Academind
*/
const order_update_paid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (order){
            for (const idx in order.orderItems){ // subtracts quantity bought from quantity in stock
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
        console.log(err)
        res.status(500).json({ error: err });
    }
}

// function updates isDelivered property to true once delivered
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

// function to delete a specific order
const orders_delete_order = async (req, res) => {
    try {
        const result = await Order.deleteOne({_id: req.params.orderId});
        // checks to see if order has already been deleted
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