const jwt = require('jsonwebtoken')

const verifyUser = async (req,res,next) => {
    try {
        const token = req.cookies.token
        if(!token) return res.status(403).json({message:"Invalid Token"})

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            next()
    } catch (error) {
        res.status(400).json({message:"Something went wrong"})
        console.log(error);
    }
}

module.exports = verifyUser