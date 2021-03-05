import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
    _id: { type: mongoose.Schema.ObjectId, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    customer: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

export default mongoose.model('Review', reviewSchema);