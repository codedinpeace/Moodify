const express = require('express')
const connectDB = require('./config/connectDb')
const authRoutes = require('./routes/auth.routes')
require('dotenv').config()

const app = express()

// middlewares
app.use(express.json())

// Database
connectDB()

// routes
app.use("/api/auth", authRoutes)

module.exports = app