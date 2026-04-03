const jwt = require('jsonwebtoken')

const createToken = (userId, res) => {
    try {
        const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:"1d"})
        res.cookie("token", token)
    } catch (error) {
        console.log(error);
                
    }
}

module.exports = createToken