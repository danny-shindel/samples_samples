const Playlist = require("../../models/playlist");
const fetch = require('node-fetch');

module.exports = {
    searchAPI,
    create
};

async function searchAPI(req, res) {
    const resultsAPI = await fetch(`https://genius.p.rapidapi.com/search?q=${req.body.searchAPI}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": process.env.GENIUS_KEY,
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    })
    const results = await resultsAPI.json()
    res.json(results.data)
};

async function create(req,res){
    const newPlaylist = await Playlist.create(req.body);
    res.json(newPlaylist);
};
