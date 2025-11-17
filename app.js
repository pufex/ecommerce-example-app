import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import dotenv from "dotenv"
import authRouter from "./routers/authRouter"


dotenv.config()

const app = express()

app.use(cors({ credentials: true }))
app.use(cookieParser())
app.use(morgan("dev"))

app.use("/auth", authRouter)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to the database.")
        app.listen(3001, () => console.log("Listening for requests on port 3001"))
    })