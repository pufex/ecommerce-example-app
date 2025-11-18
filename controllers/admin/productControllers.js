import productModel from "../../models/productModel.js"

export const getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.json(products);
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export const getProduct = async (req, res) => {
    try{
        const product_id = req.params.product_id
        const product = await productModel.findById(product_id)
        res.json(product)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const postProduct = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            instock,
            photoURL
        } = req.body

        const product = new productModel({title, description, price, instock, photoURL});
        await product.save()
        res.sendStatus(204)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export const deleteProduct = async (req, res) => {
    try{
        const product_id = req.params.id
        await productModel.findByIdAndDelete(product_id)
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const editProduct = async (req, res) => {
    try{
        const {
            title,
            description,
            price,
            instock,
            photoURL
        } = req.body
        const product_id = req.params.id
        await productModel.findByIdAndUpdate(
            product_id, 
            {title, description, price, instock, photoURL}
        )
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}