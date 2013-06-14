var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Location = new Schema({
  address: String,
  owner: ObjectId,
  menu: ObjectId,
  hours: String,
  phone: String
});

module.exports = Location;