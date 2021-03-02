import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
    _id: { type: mongoose.Schema.ObjectId, required: true },
    productId: { type: mongoose.Schema.ObjectId, ref: 'Product', required: true },
    products: { type: [String], required: true },
    currency: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    amount: { type: Number, required: true } ,
    method: { type: String,  required: true },
    date: { type: Date, default: Date.now },
    customer: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, requird: true },
    region: { type: String },
    state: { type: String, required: true },
    country: { type: String, required: true },
    complete: { type: Boolean, default: false }
});

export default mongoose.model('Order', orderSchema);