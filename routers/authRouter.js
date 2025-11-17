import express from "express"
import { register, login, refresh, logout, confirmEmail, sendEmailToken} from "../controllers/authControllers"

const authRouter = express.Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.get("/refresh", refresh)
authRouter.get("/logout", logout)
authRouter.post("/send-confirmation-email", sendEmailToken)
authRouter.post("/confirm-email", confirmEmail)

export default authRouter;