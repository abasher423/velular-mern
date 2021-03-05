import mongoose from 'mongoose';
import Review from '../models/review.js';

// @desc Fetch all reviews
// @route GET /api/reviews
// @access Public
const reviews_get_all = async (req, res) => {
    try {
        const reviews = await Review.find().populate('customer', 'fullName').populate('product', 'name description brand productImage price quantity');
        if (reviews.length > 0){
            const response = {
                count: reviews.length,
                reviews: reviews.map(review => {
                    return {
                        reviewId: review._id,
                        comment: review.comment,
                        rating: review.rating,
                        customer: review.customer,
                        product: review.product,
                        request: {
                            type: 'GET',
                            description: 'Get current review',
                            url: `http://localhost:3000/api/reviews/${review._id}`
                        }
                    };
                })
            }
            res.status(200).json(response);
        } else {
            res.status(404).json({ 
                message: 'No entry exists for reviews',
                request: {
                    type: 'POST',
                    description: 'Create a review',
                    url: 'http://localhost:3000/api/reviews'
                }
            });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
};

// @desc Fetch a review
// @route GET /api/reviews/reviewId
// @access Public
const reviews_get_review = async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId).populate('customer', 'fullName'); //.select('_id product currency quantity amount method date')
        if (review){
            res.status(200).json({
                reviewId: review._id,
                comment: review.comment,
                rating: review.rating,
                customer: review.customer
            });
        } else {
            res.status(404).json({ message: 'order not found' });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
};

// @desc Create a review
// @route POST /api/reviews
// @access Public
const reviews_create_review = async (req, res) => {
    const { comment, rating, customerId, productId } = req.body;
    const review = new Review({ 
        _id: mongoose.Types.ObjectId(), 
        customer: customerId,
        product: productId, 
        comment, rating 
    });
    try {
        const result = await review.save();
        res.status(201).json({ message: 'Review created', result });
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
};

// @desc Delete a review
// @route DELETE /api/reviews/reviewId
// @access Public
const reviews_delete_review = async (req, res) => {
    try {
        const result = await Review.deleteOne({ _id: req.params.reviewId });
        if (result.n > 0){
            res.status(200).json({ message: 'Review deleted successfully' });
        } else {
            res.status(404).json({ message: 'Review already deleted' });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
};

export default {
    reviews_get_all,
    reviews_get_review,
    reviews_create_review,
    reviews_delete_review
}