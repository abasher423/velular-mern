import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
    _id: { type: mongoose.Schema.ObjectId, required: true },
    product: { type: mongoose.Schema.ObjectId, ref: 'Product', required: true },
    currency: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    amount: { type: Number, required: true } ,
    method: { type: String,  required: true },
    date: { type: Date, default: Date.now },
    complete: { type: Boolean, default: false }
});

export default mongoose.model('Order', orderSchema);