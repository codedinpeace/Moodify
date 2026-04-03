const express = require('express')
const connectDB = require('./config/connectDb')
require('dotenv').config()

const app = express()

// Database
connectDB()

module.exports = app