import userModel from "../models/userModel.js";
import { detailsSchema } from "../config/zodSchemas.js";

export const saveAddressDetails = async (req, res) => {
    const result = detailsSchema.safeParse(req.body);
    if(!result.success){
        return res.sendStatus(400)
    }
    const {data} = result 
    const user_id = req.user._id
    try{
        await userModel.findByIdAndUpdate(user_id, {addressDetails: data});
        const user = await userModel.findById(user_id)
        res.json(user)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}