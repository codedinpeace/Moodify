const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
    song:{
        type:String,
        required:true,
    },
    songPoster:{
        type:String,
        required:true,
    },
    artist:{
        type:String,
        required:true,
    },
})

const songModel = mongoose.model("song", songModel)
module.exports = songModel