const Wine = require("../../models/wine");

module.exports = {
    search,
}

async function search(req, res) {
    const wine = await Wine.findOne({title: req.body.title});
    res.json(wine);
}