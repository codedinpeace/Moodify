require('dotenv').config()
const express = require('express')
const connectDB = require('./config/connectDb')
const authRoutes = require('./routes/auth.routes')
const redis = require('./config/cache.config')
const cors = require('cors')

const app = express()

app.use((req, res, next) => {
    console.log("HIT:", req.method, req.url);
    next();
});

// middlewares
app.use(express.json()) 

// Database
connectDB()

// Redis
redis

// cors
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

// routes
app.use("/api/auth", authRoutes)

module.exports = app