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

playlistSchema.statics.getUserPlaylists = async function(userId){
  const myPlaylists = await this.find({user: userId}); 
  // const savedPlaylists = await this.find({})
  return {'myPlaylists': myPlaylists, 'savedPlaylists': 'savedPlaylists'};
}

module.exports = mongoose.model('Playlist', playlistSchema);