const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoSchema = new Schema({
  points: Number,
  title: String,
  description: String,
  taster_name: String,
  taster_twitter_handle: String,
  price: Number,
  designation: String,
  variety: String,
  region_1: String,
  region_2: String,
  province: String,
  country: String,
  winery: String
}, {
  timestamps: true
});

const wineSchema = new Schema({
  info: { infoSchema }
});

module.exports = mongoose.model('Wine', wineSchema);