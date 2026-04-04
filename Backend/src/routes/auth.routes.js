const express = require('express')
const authController = require('../controllers/auth.controllers')
const verifyUser = require('../middlewares/verifyUser')

const authRoutes = express.Router()

authRoutes.post("/register", authController.register)
authRoutes.post("/login", authController.login)
authRoutes.post("/logout", authController.logout)
authRoutes.get("/check", verifyUser, authController.check)

module.exports = authRoutes