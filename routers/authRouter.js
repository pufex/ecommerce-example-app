import express from "express"
import { register, login, refresh, logout, confirmEmail, sendEmailToken} from "../controllers/authControllers"

const expressRouter = express.Router()

expressRouter.post("/register", register)
expressRouter.post("/login", login)
expressRouter.get("/refresh", refresh)
expressRouter.get("/logout", logout)
expressRouter.post("/send-confirmation-email", sendEmailToken)
expressRouter.post("/confirm-email", confirmEmail)

export default expressRouter;