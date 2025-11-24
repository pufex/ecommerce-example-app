import userModel from "../models/userModel.js";
import { detailsSchema } from "../config/zodSchemas.js";

export const saveAddressDetails = async (req, res) => {
    const result = detailsSchema.safeParse(req.body);
    if(!result.success){
        return res.sendStatus(400)
    }

    const {data} = result 

    await userModel.findByIdAndUpdate(req.user._id, {addressDetails: data});
    res.sendStatus(200)
}