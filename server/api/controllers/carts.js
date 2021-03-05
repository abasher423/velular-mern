import mongoose from 'mongoose';
import Cart from '../models/cart.js';
import Product from '../models/product.js';

// @desc Fetch all carts
// @route GET /api/carts
// @access Public
const carts_get_all = async (req, res) => {
    try {
        const carts = await Cart.find().populate('products', 'name quantity price');
        if (carts){
            res.status(200).json({
                count: carts.length,
                carts: carts.map(cart => {
                    return {
                        _id: cart._id,
                        products: cart.products,
                        quantity: cart.quantity,
                        total: cart.total,
                        modified: cart.modified,
                        active: cart.active,
                        request: {
                            type: 'GET',
                            description: 'Get current cart',
                            url: `http://localhost:3000/api/cart/${cart._id}`
                        }
                    }
                })
            });
        } else {
            res.status(404).json({ message: 'No entry exists for cart' });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
};

// @desc Fetch a cart
// @route GET /api/carts/cartId
// @access Public
const carts_get_cart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cartId).populate('products', 'name quantity price');
        if (cart){
            res.status(200).json({
                _id: cart._id,
                products: cart.products,
                active: cart.active,
                modified: cart.modified,
                quantity: cart.quantity,
                total: cart.total,
                request: {
                    tpye: 'POST',
                    description: 'Create a cart',
                    url: 'http://localhost:3000/api/cart'
                }
            })
        } else {
            res.status(404).json({ message: 'No entry found' });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
};

// @desc Create a cart
// @route POST /api/carts
// @access Public
const carts_create_cart = (req, res) => {
    Product.findById(req.body.productId)
        .then(product => {
            if(!product){
                return res.status(404).json({ message: 'Product not found' });
            };
            const { productId, quantity, total, active, modified } = req.body;
            const cart = new Cart({ _id: mongoose.Types.ObjectId(), products: productId, quantity, total, active, modified });
            return cart.save();
        })
        .then(docs => {
            console.log(docs);
            res.status(201).json({
                message: 'Cart Created Successfully',
                _id: docs._id,
                products: docs.products,
                active: docs.active,
                modified: docs.modified,
                quantity: docs.quantity,
                total: docs.total,
                request: {
                    tpye: 'GET',
                    description: 'Get created cart',
                    url: `http://localhost:3000/api/cart/${docs._id}`
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
};

// @desc Update a cart
// @route POST /api/carts/cartId
// @access Public
const carts_update_cart = async (req, res) => {
    try {
        const updateOps = {}; // objct so if we want to only update certain values we can (change)
        for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
        }

        const result = await Cart.updateOne({_id: req.params.productId}, {$set: updateOps});
        res.status(201).json({
            message: 'cart Successfully Updated',
            request: {
                type: 'GET',
                description: 'Get updated product',
                url: `http://localhost:300/api/cart/${result._id}`
            }
        });
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
};

// @desc Delete a cart
// @route DELETE /api/carts/cartId
// @access Public
const carts_delete_cart = async (req, res) => {
    try {
        const result = await Cart.deleteOne({ _id: req.params.cartId} );
        if (result.n > 0){
            res.status(200).json({
                message: 'Deleted cart successfully',
                request: {
                    type: 'POST',
                    description: 'Create a cart',
                    url: 'http://localhost:3000/api/cart',
                    body: {
                        productId: 'ObjctID',
                        active: 'Boolean',
                        modified: 'Date',
                        quantity: 'Number',
                        total: 'Number'
                    }
                }
            });
        } else {
            res.status(404).json({ message: 'No entry exists or already deleted' });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
};

export default{
    carts_get_all,
    carts_get_cart,
    carts_create_cart,
    carts_update_cart,
    carts_delete_cart
};