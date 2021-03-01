import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    size: { type: Number, required: true},
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String,  enum: ['Accepted', 'Rejected', 'Pending'], required: true },
    reason: { type: String }
});

export default mongoose.model('Product', productSchema);