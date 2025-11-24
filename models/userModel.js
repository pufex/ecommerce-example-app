import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    orderDetails: {
        emailAddress: {
            type: String,
            default: null,
        },
        phoneNumber: {
            type: String,
            default: null,
        },
        country: {
            type: String,
            default: null,
        },
        state: {
            type: String,
            default: null,
        },
        city: {
            type: String,
            default: null,
        },
        street: {
            type: String,
            default: null,
        },
        houseNumber: {
            type: String,
            default: null,
        },
        roomNumber: {
            type: String,
            default: null,
        }
    }
}, { timestamps: true })

const userModel = mongoose.model("User", userSchema)

export default userModel