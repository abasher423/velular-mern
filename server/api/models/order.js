import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
    _id: { type: mongoose.Schema.ObjectId, required: true },
    currency: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    amount: { type: Number, required: true } ,
    method: { type: String,  required: true },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', requireD: true },
    orderItems: [{ 
        productName: { type: String, required: true},
        quantity: {type: Number, required: true },
        productImage: { type: String, required: true },
        product: { type: mongoose.Schema.ObjectId, ref: 'Product', required: true }
     }],
    shipping: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentResult: {
        _id: { type: String },
        status: { type: String },
        updateTime: { type: String },
        email: { type: String }
    },
    paymentMethod: { type: String, required: true},
    taxPrice: { type: Number, required: true, default: 0.00 },
    totalPrice: { type: Number, required: true, default: 0.00 },
    shippingPrice: { type: Number, required: true, default: false},
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    DeliveredAt: { type: Date },
    isComplete: { type: Boolean, default: false }
});

export default mongoose.model('Order', orderSchema);