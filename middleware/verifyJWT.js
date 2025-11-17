import jwt from "jsonwebtoken"
import userModel from "../models/userModel"

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

            const payloadObject = {
                _id: user._id,
                name: user.username,
                email: user.email,
                verifiedEmail: user.emailVerified,
            }

            req.user = payloadObject;
            next()
        }
    )
}

export default verifyJWT