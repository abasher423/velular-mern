import mongoose from 'mongoose';
import Product from '../models/product.js';
import User from '../models/user.js';

const products_get_all = async (req, res) => {
    try {
        // how many items per page
        const pageSize = 8;
        const page = Number(req.query.pageNumber) || 1;

        // get keyword from query string
        const keywordName = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {}

        const pageCount = await Product.countDocuments({ ...keywordName});
        const products = await Product.find({ ...keywordName }).limit(pageSize).skip(pageSize * (page-1))
        if (products.length > 0){ //.where to add conditions or .limit for pagination
            const response = {
                count: products.length,
                page, pages: Math.ceil(pageCount / pageSize),
                products: products.map(product => {
                    return {
                        _id: product._id,
                        artist: product.artist,
                        name: product.name,
                        description: product.description,
                        brand: product.brand,
                        category: product.category,
                        averageRating: product.averageRating,
                        totalNumRating: product.totalNumRating,
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
            console.log(response)
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
    } catch (error){
        console.log(error);
        res.status(500).json({ message: `The following error has occurred: ${error}` });
    }
}

const customs_get_all = async (req, res) => {
    try {
        const customs = await Product
            .find({ status: 'Submitted' })
            .select('_id name  artist price category brand status reason')
        if (customs.length > 0){
            res.status(200).json({
                count: customs.length,
                customs: customs.map(custom => {
                    return {
                        _id: custom._id,
                        name: custom.name,
                        artist: custom.artist,
                        price: custom.price,
                        category: custom.category,
                        brand: custom.brand,
                        status: custom.status,
                        reason: custom.reason
                    }
                })
            })
        } else {
            res.status(400).json({ message: 'No entry exists for customs' })
        }
    } catch (error){
        res.status(500).json({ message: `The following error has occurred: ${error}` });
    }
};

const customs_get_all_artist = async (req, res) => {
    try {
        const customs = await Product
            .find({ artist: req.userData.userId})
            .select('_id name productImage size description artist price category brand status reason')
        if (customs.length > 0){
            res.status(200).json({
                count: customs.length,
                customs: customs.map(custom => {
                    return {
                        _id: custom._id,
                        name: custom.name,
                        size: custom.size,
                        productImage: custom.productImage,
                        description: custom.description,
                        price: custom.price,
                        category: custom.category,
                        brand: custom.brand,
                        status: custom.status,
                        reason: custom.reason
                    }
                })
            })
        } else {
            res.status(400).json({ message: 'No entry exists for customs' })
        }
    } catch (error){
        res.status(500).json({ message: `The following error has occurred: ${error}` });
    }
};

const products_get_product = async (req, res) => {
    try {
        const product = await Product
            .findById(req.params.productId)
        if (product){ // checks if the product exists
            console.log(product);
            res.status(200).json({
                _id: product._id,
                artist: product.artist,
                name: product.name,
                description: product.description,
                brand: product.brand,
                category: product.category,
                size: product.size,
                quantityInStock: product.quantityInStock,
                productImage: product.productImage,
                price: product.price,
                reviews: product.reviews,
                averageRating: product.averageRating,
                totalNumRating: product.totalNumRating,
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
    } catch (error){
        console.log(error);
        res.status(500).json({ message: `The following error has occurred: ${error}` })
    }
};

const products_create_product = async (req, res) => {
    try {
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            artist: req.body.artistId,
            description: req.body.description,
            brand: req.body.brand,
            category: req.body.category,
            productImage: `/images/${req.file.originalname}`,
            size: req.body.size,
            artist: req.body.artist,
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
                artist: result.artist,
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
    } catch (error){
        console.log(error);
        res.status(500).json({ message: `The following error has occurred: ${error}` });
    }
};

const custom_update_status = async (req, res) => {
    try {
        const custom = await Product.findById(req.params.customId);
        const user = await User.findById(req.userData.userId);
        if (custom && user){
            custom.status = req.body.status;
            const updatedCustom = await custom.save();
            res.status(201).json(updatedCustom);
        } else {
            res.status(400).json({ message: 'Invalid Request' });
        }
    } catch (error){
        console.log(error)
        res.status(500).json({ message: `The following error has occurred: ${error}` });
    }
}

const products_update_product = async (req, res) => { 
    try {
        const updateOps = {}; // objct so if we want to only update certain values we can (change)
        for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
        }
        
        const result = await Product.updateOne({ _id: req.params.productId }, { $set: updateOps });
        res.status(201).json({
            message: 'Product Successfully Updated',
            request: {
                type: 'GET',
                description: 'Get updated product',
                url: `http://localhost:300/api/products/${result._id}`
            }
        });
    } catch (error){
        console.log(error);
        res.status(500).json({ message: `The following error has occurred: ${error}` });
    }

}

const products_create_review = async (req, res) => {
    try {
        // product attempting to be reviewed
        const product = await Product.findById(req.params.productId);
        // user attempting to review product
        const user = await User.findById(req.userData.userId);

        // if product exists and user Id matches one in the jsonwebtoken
        if (product && (req.userData.userId === user._id.toString())){
            for (let i=0; i<product.reviews.length; i++){ // loop through reviews array
                // if product Id is found in the reviews array
                if (product.reviews[i].user.toString() === req.userData.userId){
                   return res.status(500).json({ message: 'You have already reviewed this product' });
                }
            }
            // review object
            const review = {
                rating: Number(req.body.rating),
                comment: req.body.comment,
                firstName: req.userData.firstName,
                user: req.userData.userId
            };
            product.reviews.push(review); // push current review to reviews array

            // calculating total rating inside reviews array
            let total = 0;
            for (let i=0; i<product.reviews.length; i++){
                total += product.reviews[i].rating;
            }
            // calucalting average rating and total number of reviews
            product.averageRating = total / product.reviews.length;
            product.totalNumRating = product.reviews.length;

            await product.save();
            res.status(201).json({ message: 'Review Submitted' });

        } else {
            res.status(500).json({ message: 'Product not found' });
        }
    } catch (error){
        console.log(error);
        res.status(500).json({ message: `The following error has occurred: ${error}` });
    }
};

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
                        artist: 'ObjectId',
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
    } catch (error){
        console.log(error);
        res.status(500).json({ message: `The following error has occurred: ${error}` });
    }
}

export default {
    products_get_all,
    customs_get_all,
    customs_get_all_artist,
    products_get_product,
    products_create_product,
    products_create_review,
    custom_update_status,
    products_update_product,
    products_delete_product
};