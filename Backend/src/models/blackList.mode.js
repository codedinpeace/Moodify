const mongoose = require('mongoose')

const blackListSchema = mongoose.Schema({
    token:{
        type:String,
        required:[true, "Token is required for blacklisting"],
    }
})

const blackListModel = mongoose.model('blackList', blackListSchema)
module.exports = blackListModel