const Wine = require("../../models/wine");

module.exports = {
  search,
  getTitles,
  addPlaylist,
  addSavedPlaylists
}

async function search(req, res) {
  const wine = await Wine.findOne({ title: req.body.title })
    // Deep Populate for nested _ids
    .populate({
      path: 'playlists',
      populate: { path: 'user' }
    })
    .exec();
  res.json(wine);
}

async function getTitles(req, res) {
  const wines = await Wine.find({})
  .populate({
    path: 'playlists',
    populate: { path: 'user' }
  })
  .exec();
  res.json(wines);
}

async function addPlaylist(req, res) {
  const newWine = await Wine.findById(`${req.params.id}`);
  newWine.playlists.push(req.body._id);
  await newWine.save()
  const wines = await Wine.find({}).populate('playlists').exec();
  res.json(wines);
}

async function addSavedPlaylists(req, res) {
  const wine = await Wine.findById(req.params.id).populate({
    path: 'playlists',
    populate: { path: 'user' }
  })
    .exec();
  // use .id in query when we need the string version of ._id
  let playlist = wine.playlists.find(playlist => playlist.id === req.body.playlistId);
  if (!playlist.saved.includes(req.user._id)) {
    playlist.saved.push(req.user._id);
  } else {
    const idx = playlist.saved.indexOf(req.user._id)
    playlist.saved.splice(idx, 1)
  }
  // save the playlist doc
  playlist.save();
  res.json(wine);
}