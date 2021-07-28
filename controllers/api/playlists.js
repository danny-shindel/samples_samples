const Playlist = require("../../models/playlist");
const fetch = require('node-fetch');

module.exports = {
    searchAPI,
    searchPlaylists,
    create,
    getUserPlaylists,
    update,
    deletePlaylist
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

async function searchPlaylists(req, res) {
    // console.log(req.body.id);
    console.log("HERE");
    const searchPlaylists = await Playlist.find({user: req.body.id})
    console.log(searchPlaylists)
    res.json(searchPlaylists)
}

async function create(req, res) {
    const newPlaylist = await Playlist.create({ ...req.body, user: req.user._id });
    res.json(newPlaylist);
};

async function getUserPlaylists(req, res) {
    const userPlaylists = await Playlist.getUserPlaylists(req.user._id);
    res.json(userPlaylists);
};

async function update(req, res) {
    const newPlaylist = await Playlist.findOneAndUpdate({_id : req.body._id},{...req.body});
    res.json(newPlaylist);
};

async function deletePlaylist(req, res) {
    const playlist = await Playlist.findOneAndDelete({_id:req.params.id});
    res.json(playlist);
};


