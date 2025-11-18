const verifyEmail = (req, res, next) => {
    if(!req.user){
        res.status(403)
        return res.json({error: true, message: "Forbidden"})      
    }

    if(req.user.emailVerified === false){
        res.status(403)
        return res.json({error: true, message: "Forbidden"}) 
    }

    next();
}

export default verifyEmail