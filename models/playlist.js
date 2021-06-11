const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  title: String,
  coverImage: String,
  about: String,
  songs: [],
  // comments: [commentSchema],
  user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {
  timestamps: true
});

module.exports = mongoose.model('Playlist', playlistSchema);