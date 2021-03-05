import express from 'express';
import ReviewsController from '../controllers/reviews.js';

const router = express.Router();

router.get('/', ReviewsController.reviews_get_all);

router.get('/:reviewId', ReviewsController.reviews_get_review);

router.post('/', ReviewsController.reviews_create_review);

router.delete('/:reviewId', ReviewsController.reviews_delete_review);

export default router;