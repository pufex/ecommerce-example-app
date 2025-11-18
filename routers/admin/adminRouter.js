import express from "express"
import {getProduct, getProducts, deleteProduct, editProduct, postProduct} from "../../controllers/admin/productControllers"

const adminRouter = express.Router()

adminRouter.get("/products", getProducts)
adminRouter.get("/products/:id", getProduct)
adminRouter.post("/create-product", postProduct)
adminRouter.delete("/delete-product/:id", deleteProduct)
adminRouter.patch("/edit-product/:id", editProduct)

export default adminRouter;