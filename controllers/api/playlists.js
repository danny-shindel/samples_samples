const Playlist = require("../../models/playlist");
const fetch = require('node-fetch');

module.exports = {
    searchAPI,
    create, 
    getUserPlaylists
};

async function searchAPI(req, res) {
    const resultsAPI = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${req.body.searchAPI}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": process.env.DEEZER_KEY,
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    })
    const results = await resultsAPI.json()
    res.json(results.data)
};

async function create(req,res){
    const newPlaylist = await Playlist.create({...req.body, user: req.user._id});
    res.json(newPlaylist);
};

async function getUserPlaylists(req,res){
    const userPlaylists = await Playlist.getUserPlaylists(req.user._id);
    res.json(userPlaylists);
};


