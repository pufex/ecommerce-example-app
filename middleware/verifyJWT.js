import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers
    if(!authHeader){
        res.status(403)
        return res.json({error: true, message: "Forbidden"})        
    }

    const accessToken = authHeader["authorization"].split(" ")[1]

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
            if(err){
                res.status(403)
                return res.json({error: true, message: "Forbidden"})        
            }

            const user_id = decoded._id
            const user = await userModel.findById(user_id);
            if(!user){                
                res.status(403)
                return res.json({error: true, message: "Forbidden"})        
            }

            req.user = user;
            next()
        }
    )
}

export default verifyJWT