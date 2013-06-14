var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Customer = new Schema({
  name: String,
  address: String,
  phone: String,
  info: String,
  created: Date,
  updated: Date
});

module.exports = Customer;
