import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import transporter from "../config/mailTransporter.js"
import { loginSchema, registerSchema } from "../config/zodSchemas.js"

export const register = async (req, res) => {
    
    const result = registerSchema.safeParse(req.body)
    if(!result.success){
        return res.sendStatus(400)
    }

    const {name, email, password} = result.data;

    try{
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            res.status(401)
            return res.json({error: true, message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        await userModel.create({name, email, password: hashedPassword})

        await transporter.sendMail({
            from: process.env.BREVO_EMAIL,
            to: email,
            subject: "Welcome to ecommmerce example app!",
            text: "Thank you for creating an account on my website.", // plain‑text body
        });

        res.send("User successfully created.")
    }catch(err){
        console.log(err)
        res.status(500)
        return res.json({error: true, message: "Internal Server Error"})
    }
}

export const login = async (req, res) => {
    
    const result = loginSchema.safeParse(req.body)
    if(!result.success){
        return res.sendStatus(400)
    }
    const {email, password} = result.data

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
            isAdmin: user.isAdmin
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
    try{
        const user_id = req.user._id
        const user = await userModel.findById(user_id);
        if(!user){
            return res.sendStatus(403)
        }

        const code = 100000 + Math.ceil(Math.random() * 899999);

        user.emailVerificationOTP = code.toString()
        user.emailVerificationExpiresAt = Date.now() + 1000 * 60 * 15

        await user.save();
        
        await transporter.sendMail({
            from: process.env.BREVO_EMAIL,
            to: "j.abram1@wp.pl",
            subject: "Email verification",
            text: `Your code to verify your email on ecommerce example app is: ${code.toString()}. You have 15 minutes to enter it before it becomes invalid.`, // plain‑text body
        });

        res.sendStatus(200)

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export const confirmEmail = async (req, res) => {
    try{
        const user_id = req.user.id
        const user = await userModel.findById(user_id)
        if(!user){
            return res.sendStatus(403)
        }

        if(user.emailVerificationExpiresAt < Date.now()){
            res.status(409)
            res.send("Expired")
        }

        const {code} = req.body;
        if(user.emailVerificationOTP !== code){
            res.status(406)
            res.send("Wrong code")
        }

        user.emailVerified = true;
        user.emailVerificationExpiresAt = 0
        user.emailVerificationOTP = ""

        await user.save();

        const tokenPayload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            emailVerified: user.emailVerified
        }

        const accessToken = jwt.sign(
            tokenPayload,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        )

        res.json({user, accessToken});
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}


