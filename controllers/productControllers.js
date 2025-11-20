import productModel from "../models/productModel"

export const getProducts = async (req, res) => {
    try{
        const products = await productModel.find();
        res.json(products)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const getProduct = async (req, res) => {
    try{
        const product_id = req.params.id
        const product = await productModel.findById(product_id)
        res.json(product)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }

}