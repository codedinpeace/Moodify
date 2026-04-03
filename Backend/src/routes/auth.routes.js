const express = require('express')
const authController = require('../controllers/auth.controllers')

const authRoutes = express.Router()

authRoutes.post("/register", authController.register)
authRoutes.post("/login", authController.login)
authRoutes.post("/logout", authController.logout)
authRoutes.get("/check", authController.check)

module.exports = authRoutes