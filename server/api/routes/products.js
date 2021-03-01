import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.js';

const router = express.Router();

// @desc Fetch all products
// @route GET /api/products
// @access Public
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length > 0){ //.where to add conditions or .limit for pagination
            console.log(products);
            res.status(200).json(products);
        } else {
            res.status(500).json({ message: 'No entries exist for products'});
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
});

// @desc Fetch single product
// @route GET /api/products/:productId
// @access Public
router.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findById({ _id: req.params.productId });
        if (product){ // checks if the product exists
            console.log(product);
            res.status(200).json(product);
        } else {
            res.status(500).json({ message: 'No entry exists for provided product ID'});
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err })
    }
});

// @desc Create single product
// @route POST /api/products
// @access Private
router.post('/', async (req, res) => {
    try {
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            brand: req.body.brand,
            size: req.body.size,
            quantity: req.body.quantity,
            price: req.body.price,
            status: req.body.status,
            reason: req.body.reason
        });
        await product.save();
        console.log(product);
        res.status(201).json({
            message: 'Product Successfuly Created',
            product
        })
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
});

// @desc Update single product
// @route PATCH /api/products/:productId
// @access Private
router.patch('/:productId', async (req, res) => { 
    try {
        const updateOps = {}; // objct so if we want to only update certain values we can (change)
        for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
        }
        const result = await Product.updateOne({_id: req.params.productId}, {$set: updateOps});
        console.log(result);
        res,status(201).json(result);
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }

});

// @desc Delete single product
// @route DELETE /api/products/:productId
// @access Private
router.delete('/:productId', async (req, res) => {
    try {
        const product = await Product.remove({ _id: req.params.productId });
        if (product.n > 0){ // if product trying to be deleted, doesn't exist
            console.log(product);
            res.status(200).json({
                message: 'Product Successfully Deleted',
                product
            });
        } else {
            res.status(500).json({ message: 'No entry exists or already deleted' });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
});

export default router;