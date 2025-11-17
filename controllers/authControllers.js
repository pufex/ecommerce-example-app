import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.status(400)
        return res.json({
            error: true,
            message: "Invalid request body"
        })
    }

    try{
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            res.status(401)
            return res.json({error: true, message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        await userModel.create({name, email, password: hashedPassword})
        res.send("User successfully created.")
    }catch(err){
        res.status(500)
        return res.json({error: true, message: "Internal Server Error"})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400)
        return res.json({
            error: true,
            message: "Invalid request body"
        })
    }

    try{
        const user = await userModel.findOne({email})
        if(!user){
            res.status(401)
            return res.json({error: true, message: "Wrong email or password"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(401)
            return res.json({error: true, message: "Wrong email or password"})
        }

        const payloadObject = {
            _id: user._id,
            name: user.username,
            email: user.email,
        }

        const refreshToken = jwt.sign(
            payloadObject, 
            process.env.REFRESH_TOKEN_SECRET, 
            { expiresIn: "7d"}
        )

        const accessToken = jwt.sign(
            payloadObject, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        )

        res.cookie("jwt", refreshToken, {
            httpOnly: true, 
            secure: true, 
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        res.json({user, accessToken})

    }catch(err){
        console.log(err)
        res.status(500)
        res.json({error: true, message: "Internal Server Error"})
    }

}

export const refresh = async (req, res) => {
    const refreshToken = req.cookies.jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (error, decoded) => {
            if(error){
                res.status(401)
                return res.json({error: true, message: "Unauthorised"})
            }

            const user_id = decoded._id
            const user = await userModel.findById(user_id)
            if(!user){
                res.status(401)
                return res.json({error: true, message: "Unauthorised"})
            }

            const payloadObject = {
                _id: user._id,
                name: user.username,
                email: user.email,
            }

            const accessToken = jwt.sign(
                payloadObject,
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1h" }
            )

            res.json({user, accessToken})
        }
    )

}

export const logout = async (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true, 
        secure: true, 
        maxAge: 1000 * 60 * 60 * 24 * 7
    })
    res.send("OK")
}

export const sendEmailToken = async (req, res) => {

}

export const confirmEmail = async (req, res) => {

}


