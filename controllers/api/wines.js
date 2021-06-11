const Wine = require("../../models/wine");

module.exports = {
    search,
    getTitles, 
    addPlaylist
}

async function search(req, res) {
    const wine = await Wine.findOne({title: req.body.title});
    res.json(wine);
}

async function getTitles(req, res) {
    const wines = await Wine.find({}, 'title')
    res.json(wines);
}

async function addPlaylist(req, res) {
    const newWine = await Wine.findById(`${req.params.id}`);
    newWine.playlists.push(req.body._id);
    newWine.save();
    res.json(newWine);
}