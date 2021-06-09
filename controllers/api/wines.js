const Wine = require("../../models/wine");

module.exports = {
    search,
    getTitles
}

async function search(req, res) {
    const wine = await Wine.findOne({title: req.body.title});
    res.json(wine);
}

async function getTitles(req, res) {
    const wines = await Wine.find({}, 'title')
    res.json(wines);
}