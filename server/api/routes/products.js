import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.js';

const router = express.Router();

router.get('/', (req, res) => {
    Product.find() //.where to add conditions or .limit for pagination
      .exec()
      .then(docs => {
          console.log(docs);
          if (docs.length > 0){
            res.status(200).json(docs);
          } else {
            res.status(500).json({message: 'No entries founds for products'});
          }
      })
      .catch(error => {
          console.log(error);
          res.status(500).json({error: error});
      });
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
      });
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
    const id = req.params.productId; 
    const updateOps = {}; // objct so if we want to only update certain values we can (change)
    for (const ops of req.body){
      updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({_id: id}, {$set: updateOps})
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({error: error});
      });
});

router.delete('/:productId', (req, res) => {
    const id = req.params.productId;
    Product.remove({_id: id})
      .exec()
      .then(result => res.status(200).json(result))
      .catch(error => {
          console.log(error);
          res.status(500).json({error: error});
      });
});

export default router;