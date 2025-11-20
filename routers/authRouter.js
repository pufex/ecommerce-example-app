import express from "express"
import { register, login, refresh, logout, confirmEmail, sendEmailToken} from "../controllers/authControllers.js"
import verifyJWT from "../middleware/verifyJWT.js"

const authRouter = express.Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.get("/refresh", refresh)
authRouter.get("/logout", logout)
authRouter.post("/send-confirmation-email", verifyJWT, sendEmailToken)
authRouter.post("/confirm-email", verifyJWT, confirmEmail)

export default authRouter;