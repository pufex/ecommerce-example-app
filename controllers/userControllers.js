import userModel from "../models/userModel";
import { detailsSchema } from "../config/zodSchemas";

export const saveAddressDetails = async (req, res) => {
    const result = detailsSchema.safeParse(req.body);
    if(!result.success){
        return res.sendStatus(400)
    }

    const {data} = result 

    await userModel.findByIdAndUpdate(req.user._id, data);
    res.sendStatus(200)
}