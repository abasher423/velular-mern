import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
    _id: { type: mongoose.Schema.ObjectId, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true }
}, {
    timestamps: true
});

export default mongoose.model('Review', reviewSchema);