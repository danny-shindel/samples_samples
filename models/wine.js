const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wineSchema = new Schema({
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
  winery: String,
  TEST: String
});

module.exports = mongoose.model('Wine', wineSchema);