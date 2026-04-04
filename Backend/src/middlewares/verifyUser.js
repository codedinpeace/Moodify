const jwt = require('jsonwebtoken')
const blackListModel = require('../models/blackList.mode')

const verifyUser = async (req,res,next) => {
    try {
        const token = req.cookies.token
        if(!token) return res.status(403).json({message:"Invalid Token"})

            const blackListedToken = await blackListModel.findOne({
                token
            })
            if(blackListedToken) return res.status(401).json({message:"unauthorized token"})

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            next()
    } catch (error) {
        res.status(400).json({message:"Something went wrong"})
        console.log(error);
    }
}

module.exports = verifyUser