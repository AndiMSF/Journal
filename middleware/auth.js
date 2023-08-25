const jwt = require("jsonwebtoken")

// For Authorization
const verifyToken = async (req, res, next) => {
    try {
        // Search if user have a token or not
        let token = req.cookies.jwt
        if(!token) {return res.redirect("/auth/login")}

        // if there is a token & verified
        if(token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    res.redirect("/")
                } else {
                    req.user = decodedToken
                    next()
                }
            })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = verifyToken