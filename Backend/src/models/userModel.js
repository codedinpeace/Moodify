const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:[true, "user with that username already exists"],
        minLength:6,
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
})

userSchema.pre("save", async (next)=>{
    try {
        if(!isModified('password')) return next()
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } catch (error) {
        console.log(error)
    }
})

const userModel = mongoose.Model('user', userSchema)
module.exports = userModel