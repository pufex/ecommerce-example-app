import express from "express"

const adminRouter = express.Router()

adminRouter.get("/products", () => undefined)
adminRouter.post("/create-product", () => undefined)
adminRouter.delete("/delete-product", () => undefined)
adminRouter.patch("/edit-product", () => undefined)

export default adminRouter;