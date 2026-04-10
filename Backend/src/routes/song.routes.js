const express = require('express')
const songRouter = express.Router()
const verifyUser = require("../middlewares/verifyUser")
const upload = require('../services/multer.service')
const songControllers = require('../controllers/song.controllers')

songRouter.post("/create-song",upload.single('song'), verifyUser, songControllers.createSongs)
songRouter.post("/get-song", verifyUser, songControllers.getSongs   )

module.exports = songRouter