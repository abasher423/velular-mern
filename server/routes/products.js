import express from 'express';
const router = express.Router();

router.get('/', (req,res,next) => {
    res.status(200).json({
        message: "GET request from /products received"
    });
});

router.post('/', (req,res,next) => {
    res.status(201).json({
        message: "GET request from /products received"
    });
});

router.get('/:productId', (req,res,next) => {
    // store id as a variable from "params"
    // params: thing that is passed via the URL
    const id = req.params.productId;
    if (id === 'special'){
        res.status(200).json({
            message: "You discovered the special ID"
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:productId', (req,res,next) => {
    res.status(201).json({
        message: "Updated product!",
        productId: req.params.productId
    });
});

export default router;