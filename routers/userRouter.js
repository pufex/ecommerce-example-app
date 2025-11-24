import express from "express"
import { saveAddressDetails } from "../controllers/userControllers"
import verifyJWT from "../middleware/verifyJWT"

const userRouter = express.Router()

userRouter.patch("/address-details", verifyJWT, saveAddressDetails)

export default userRouter