var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Menu = new Schema({
  owner: ObjectId,
  location: ObjectId,
  json: String,
  created: Date,
  updated: Date
});

module.exports = Menu;
