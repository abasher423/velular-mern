import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: { type: mongoose.Schema.ObjectId, required: true },
    email: { type: String, required: true, unique: true }, //unique doesn't validate values
    password: { type: String, required: true },
    username: { type: String, required: true },
    fullName: { type: String, required: true },
    street: { type: String, required: true},
    city: { type: String, required: true},
    country: { type: String, required: true },
    state: {type: String, required: true },
    postcode: { type: String, required: true },
    role: { type: String, enum: ['customer', 'artist', 'admin', 'manager'], required: true },
    verified: { type: Boolean, default: false }
});

export default mongoose.model('User', userSchema);