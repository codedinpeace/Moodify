const createToken = require("../config/create-token")
const blackListModel = require("../models/blackList.mode")
const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')

const register = async (req,res) =>{
    const {username, email, password } = req.body
    try {
        const existingUser = await userModel.findOne({$or:[{email}, {username}]})
        if(existingUser) return res.status(409).json({message: "user already exists"})

            const user = await userModel.create({
                username,
                email,
                password,
            })

            createToken(user._id, res)

            res.status(201).json({message:"User registered successfully", RegisterdUser:{
                id: user._id,
                username : user.username,
                email:user.email,
                createdAt:user.createdAt
            }})
    } catch (error) {
        res.status(400).json({message:"Something went wrong"})
        console.log(error)
    }
}
const login = async (req,res) =>{
    const {username,email,password } = req.body

    try {
        const user = await userModel.findOne({$or:[{username}, {email}]})
        if(!user) return res.status(404).json({message:"user not found"})

            const comparedPassword = await bcrypt.compare(password, user.password)
            if(!comparedPassword) return res.status(401).json({message:"Invalid email or password"})

                createToken(user._id, res)

                res.status(200).json({message:"User loggedIn successfully", loggedInUser: {
                    id:user._id,
                    username:user.username,
                    email:user.email,
                    createdAt:user.createdAt
                }})
    } catch (error) {
        res.status(400).json({message:"Something went wrong"})
        console.log(error);
        
    }
}
const logout = async (req,res) =>{
    try {
        const token = req.cookies.token
        res.cookie("token", "")

        await blackListModel.create({
            token
        })

        res.status(200).json({message:"Token created successfully"})
    } catch (error) {
        res.status(400).json({message:"Something went wrong"})
        console.log(error);
    }
}
const check = async (req,res) =>{

}

module.exports = {register, login, logout, check}