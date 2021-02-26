import express from 'express';
const router = express.Router();

router.get('/', (req,res,next) => {
    res.status(200).json({
        message: "GET request from /products received"
    });
});

export default router;