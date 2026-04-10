const express = require('express')
const songRouter = express.Router()
const verifyUser = require("../middlewares/verifyUser")
const upload = require('../services/multer.service')
const songControllers = require('../controllers/song.controllers')

songRouter.post("/create-post",upload('song'), verifyUser, songControllers.getSongs)
songRouter.post("/get-post", verifyUser, songControllers.createSongs)

module.exports = songRouter