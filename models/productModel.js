import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    instock: {
        type: Number,
        required: true,
    },
    photoURL: {
        type: String,
        required: true,
    }

}, { timestamps: true })

const productModel = mongoose.model("Product", productSchema)

export default productModel;