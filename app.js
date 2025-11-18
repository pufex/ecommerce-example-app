import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import dotenv from "dotenv"
import authRouter from "./routers/authRouter.js"
import adminRouter from "./routers/admin/adminRouter.js"
import bodyParser from "body-parser"
import credentials from "./middleware/credentials.js"
import {corsOptions} from "./config/corsOptions.js"
import verifyJWT from "./middleware/verifyJWT.js"
import { verifyAdmin } from "./middleware/verifyAdmin.js"

dotenv.config()

const app = express()

app.use(credentials)
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(morgan("dev"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(bodyParser.json())

app.use("/auth", authRouter)
app.use("/admin", verifyJWT, verifyAdmin, adminRouter)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to the database.")
        app.listen(3001, () => {
            console.log("Listening for requests on port 3001")
        })
    })