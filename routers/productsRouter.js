import express from "express"
import {getProducts, getProduct} from "../controllers/productControllers.js"

const productsRouter = express.Router()

productsRouter.get("/", getProducts)
productsRouter.get("/:id", getProduct)

export default productsRouter