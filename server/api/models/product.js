import mongoose from 'mongoose';
const { Schema } = mongoose;

/*
    * A schema for products that maps to the MongoDB products collection
    * The code was adapted by adding additional properties to be stored that is required for Velular
    * This was adapted from a Udemy course by Brad Traversy
    * Link here to udemy course's github:
    * https://github.com/bradtraversy/proshop_mern/blob/master/backend/models/productModel.js
*/

const reviewSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
},
    {
      timestamps: true,
    }
  )

const productSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    artist: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    productImage: {type: String, required: true },
    brand: { type: String, required: true },
    size: { type: Number, required: true},
    countInStock: { type: Number, required: true, default: 0 },
    averageRating: { type: Number, required: true, default: 0 },
    totalNumRating: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
    quantityInStock: { type: Number, required: true },
    initialPrice: { type: Number, default: 0 },
    price: { type: Number, required: true },
    status: { type: String,  enum: ['Pending', 'Submitted', 'Accepted', 'Rejected'], default: 'Pending' },
    reason: { type: String }
}, {
    timestamps: true
});

export default mongoose.model('Product', productSchema);