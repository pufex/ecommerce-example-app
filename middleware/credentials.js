const credentials = (req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Origin", "http://localhost:5173")
    next()
}

export default credentials