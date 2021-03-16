import mongoose from 'mongoose';
import Product from '../models/product.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const products_get_all = async (req, res) => {
    try {
        const products = await Product.find().select('_id name description brand size quantityInStock initialPrice price status reason productImage');
        if (products.length > 0){ //.where to add conditions or .limit for pagination
            const response = {
                count: products.length,
                products: products.map(product => {
                    return {
                        _id: product._id,
                        name: product.name,
                        description: product.description,
                        brand: product.brand,
                        size: product.size,
                        quantityInStock: product.quantityInStock,
                        productImage: product.productImage,
                        pricing: {
                            initialPrice: product.initialPrice, 
                            price: product.price 
                        },
                        status: product.status,
                        reason: product.reason,
                        requests: {
                            tpe: 'GET',
                            description: 'Get current product',
                            url: `http://localhost:8080/api/products/${product._id}`
                        }
                    }
                })
            }
            res.status(200).json(response);
        } else {
            res.status(500).json({ 
                message: 'No entries exist for products',
                request: {
                    type: 'POST',
                    description: 'Create a product',
                    url: 'http://localhost:3000/api/products'
                }
            });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
}

// @desc Fetch single product
// @route GET /api/products/:productId
// @access Public
const products_get_product = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).select('_id name description brand size quantityInStock initialPrice price status reason productImage');
        if (product){ // checks if the product exists
            console.log(product);
            res.status(200).json({
                _id: product._id,
                name: product.name,
                description: product.description,
                brand: product.brand,
                size: product.size,
                quantityInStock: product.quantityInStock,
                productImage: product.productImage,
                price: product.price,
                status: product.status,
                reason: product.reason,
                requests: {
                    type: 'GET',
                    description: 'Get all products',
                    url: 'http://localhost/api/products'
                }
            });
        } else {
            res.status(500).json({ 
                message: 'No entry exists for provided product ID',
                request: {
                    type: 'GET',
                    description: 'Get all products',
                    url: 'http://localhost:3000/api/products'
                }
            });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err })
    }
};

// @desc Create single product
// @route POST /api/products
// @access Private
const products_create_product = async (req, res) => {
    try {
        console.log(req.file);
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            brand: req.body.brand,
            category: req.body.category,
            productImage: `/images/${req.file.originalname}`,
            size: req.body.size,
            quantityInStock: req.body.quantityInStock,
            initialPrice: req.body.initialPrice,
            price: req.body.price,
            status: req.body.status,
            reason: req.body.reason
        });
        const result = await product.save();
        console.log(result);
        res.status(201).json({
            message: 'Product Successfuly Created',
            createdPoduct: {
                _id: result._id,
                name: result.name,
                description: result.description,
                brand: result.brand,
                size: result.size,
                quantityInStock: result.quantityInStock,
                pricing: {
                    initialPrice: result.initialPrice,
                    price: result.price
                },
                status: result.status,
                reason: result.reason,
                url: {
                    type: 'GET',
                    description: 'Get created product',
                    url: `http:localhost:/api/products/${result._id}`
                }
            }
        })
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
};

// @desc Update single product
// @route PATCH /api/products/:productId
// @access Private
const products_update_product = async (req, res) => { 
    try {
        const updateOps = {}; // objct so if we want to only update certain values we can (change)
        for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
        }
        
        const result = await Product.updateOne({_id: req.params.productId}, {$set: updateOps});
        res.status(201).json({
            message: 'Product Successfully Updated',
            request: {
                type: 'GET',
                description: 'Get updated product',
                url: `http://localhost:300/api/products/${result._id}`
            }
        });
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }

}

// @desc Delete single product
// @route DELETE /api/products/:productId
// @access Private
const products_delete_product = async (req, res) => {
    try {
        const result = await Product.deleteOne({ _id: req.params.productId });
        if (result.n > 0){ // if product trying to be deleted, doesn't exist
            res.status(200).json({
                message: 'Product Successfully Deleted',
                request: {
                    type: 'POST',
                    description: 'Create new product', // by providing the following body
                    url: 'http://localhost:3000/api/products',
                    body: {    
                        name: 'String',
                        description: 'String',
                        productImage: 'String',
                        brand: 'String',
                        size: 'Number',
                        quantityInStock: 'Number',
                        price: 'Number',
                        status: 'String',
                        reason: 'String'
                    } 
                }
            });
        } else {
            res.status(500).json({ 
                message: 'No entry exists or already deleted',
                request: {
                    type: 'GET',
                    description: 'Get all products',
                    url: 'http://localhost:3000/api/products'
                }
            });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
}

export default {
    products_get_all,
    products_get_product,
    products_create_product,
    products_update_product,
    products_delete_product
};