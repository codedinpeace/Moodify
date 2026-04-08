const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:[true, "user with that username already exists"],
        required:true
    },

    email:{
        type:String,
        unique:[true, "user with that email already exists"],
        required:true,
    },

    password:{
        type:String,
        required:true,
        minLength:6,
    }
}, {timestamps:true})

userSchema.pre("save", async function(){
    try {
        if(!this.isModified('password')) return
        this.password = await bcrypt.hash(this.password, 10)
    } catch (error) {
        console.log(error)
    }
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel