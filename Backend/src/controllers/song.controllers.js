const mm = require("music-metadata");

const createSongs = async (req,res) => {
    const {mood} = req.query    
    const metadata = await mm.parseBuffer(req.file.buffer);
    res.send(metadata, mood)
}
const getSongs = async (req,res) => {

}

module.exports = {createSongs, getSongs}