var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Items = new Schema({
    name: String,
    price: String,
    picture: String,
    description: String
});

var Sections = new Schema({
    name: String,
    order: Number,
    description: String,
    items: [Items]
});

var Menu = new Schema({
  owner: ObjectId,
  location: ObjectId,
  json: String,
  items: [Items],
  sections: [Sections],
  created: Date,
  updated: Date,
  url: String
});

module.exports = Menu;
