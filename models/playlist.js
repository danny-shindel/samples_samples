const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  title: String,
  coverImage: String,
  about: String,
  // songs: [songSchema],
  // comments: [commentSchema],
  user: {type: Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Playlist', playlistSchema);