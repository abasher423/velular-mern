import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.js';

const router = express.Router();

router.get('/', (req, res) => {
    Product.find()
      .exec()
      .then()
      .catch();
});

router.post('/', (req, res) => {
    // product we want to create
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
    product
      .save() // saves product to the db
      .then(result =>{
        console.log(result);
        res.status(201).json({
            message: "product created",
            createdProduct: product
        });
      })
      .catch(error => {
          console.log(error);
          res.status(500).json({error: error});
      })
});

router.get('/:productId', (req, res) => {
    // store id as a variable from "params"
    // params: thing that is passed via the URL /products/id123
    const id = req.params.productId;
    Product.findById(id)
      .exec()
      .then(doc => {
          console.log(doc);
          if(doc){  // check if the product exists
            res.status(200).json(doc);  
          } else{
            res.status(404).json({message: 'No valid entry found for the provided product ID'});
          }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({error: error});
      });
});

router.patch('/:productId', (req, res) => {
    res.status(201).json({
        message: "Updated product!",
        productId: req.params.productId
    });
});

export default router;