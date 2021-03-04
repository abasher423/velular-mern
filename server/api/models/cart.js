import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartSchema = new Schema({
    _id: { type: mongoose.Schema.ObjectId, requireD: true },
    products: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }],
    active: { type: Boolean, default: true },
    modified: { type: Date, default: Date.now }, 
    quantity: Number,
    total:  Number
});

export default mongoose.model('Cart', cartSchema);

// var cartSchema = new mongoose.Schema({
//     owner: {type: mongoose.Schema.Types.ObjectID, ref: 'User'},
//     totalPrice: {type: Number, default: 0},
//     items: [{
//         item: {type: mongoose.Schema.Types.ObjectID, ref: 'Product'},
//         qty: {type: Number, default: 1},
//         price: {type: Number, default: 0}
//     }]})