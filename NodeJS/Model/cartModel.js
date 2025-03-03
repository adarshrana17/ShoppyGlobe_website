import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Reference to Product
    title: String,
    price: Number,
    quantity: { type: Number, default: 1 }
});


const cartModel = mongoose.model("Cart",cartSchema);

export default cartModel