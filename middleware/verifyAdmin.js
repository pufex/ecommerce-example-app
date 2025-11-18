export const verifyAdmin = (req, res, next) => {
    if(!req.user){
        return res.sendStatus(403)
    }

    if(!req.user.isAdmin){
        return res.sendStatus(403)
    }

    next();
}