require('dotenv').config()
const express = require('express')
const connectDB = require('./config/connectDb')
const authRoutes = require('./routes/auth.routes')
const redis = require('./config/cache.config')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const songRouter = require('./routes/song.routes')

const app = express()

app.use((req, res, next) => {
    console.log("HIT:", req.method, req.url);
    next();
});

// middlewares
app.use(express.json()) 
app.use(cookieParser())

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
app.use("/api/song", songRouter)

module.exports = app