require('dotenv').config()
const express = require('express')
const connectDB = require('./config/connectDb')
const authRoutes = require('./routes/auth.routes')
const redis = require('./config/cache.config')

const app = express()

// middlewares
app.use(express.json())

// Database
connectDB()

// Redis
redis

// routes
app.use("/api/auth", authRoutes)

module.exports = app