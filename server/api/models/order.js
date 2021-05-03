import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
    _id: { type: mongoose.Schema.ObjectId, required: true },
    currency: { type: String, default: 'GBP'},
    date: { type: String, default: (new Date (Date.now())).toUTCString() },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    orderItems: [{
        productId: { type: mongoose.Schema.ObjectId, ref: 'Product', required: true },
        artist: {type: mongoose.Schema.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true},
        description: { type: String, required: true},
        quantity: {type: Number, required: true },
        size: {type: Number, required: true },
        price: {type: Number, requireD: true },
        productImage: { type: String, required: true },
        
     }],
    shippingDetails: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentResult: {
        _id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String }
    },
    paymentMethod: { type: String, required: true},
    itemsPrice: { type: Number, required: true, default: 0.00},
    taxPrice: { type: Number, required: true, default: 0.00 },
    totalPrice: { type: Number, required: true, default: 0.00 },
    shippingPrice: { type: Number, required: true, default: false},
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: String },
    isDelivered: {type: Boolean, required: true, default: false},
    deliveredAt: { type: String },
    isComplete: { type: Boolean, default: false }
});

export default mongoose.model('Order', orderSchema);