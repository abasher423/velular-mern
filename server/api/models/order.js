import mongoose from 'mongoose';
const { Schema } = mongoose;

/*
    * A schema for orders that maps to the MongoDB orders collection
    * The code was adapted by adding additional properties that is required for Velular
    * This was adapted from a Udemy course by Brad Traversy
    * Link here to udemy course's github:
    * https://github.com/bradtraversy/proshop_mern/blob/master/backend/models/orderModel.js
*/

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
    shipping: {
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
    totalItemsPrice: { type: Number, required: true, default: 0.00},
    tax: { type: Number, required: true, default: 0.00 },
    total: { type: Number, required: true, default: 0.00 },
    totalShippingPrice: { type: Number, required: true, default: false},
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: String },
    isDelivered: {type: Boolean, required: true, default: false},
    deliveredAt: { type: String },
    isComplete: { type: Boolean, default: false }
});

export default mongoose.model('Order', orderSchema);