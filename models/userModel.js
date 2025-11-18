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
    emailVerified: {
        type: Boolean,
        default: false,
    },
    emailVerificationOTP: {
        type: String,
        default: "",
    },
    emailVerificationExpiresAt: {
        type: Date,
        default: 0
    }
}, { timestamps: true })

const userModel = mongoose.model("User", userSchema)

export default userModel