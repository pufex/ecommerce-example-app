import express from "express"
import { saveAddressDetails } from "../controllers/userControllers.js"
import verifyJWT from "../middleware/verifyJWT.js"

const userRouter = express.Router()

userRouter.patch("/address-details", verifyJWT, saveAddressDetails)

export default userRouter