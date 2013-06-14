var mobmen = require('mobmen')
  , mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mobileMenus');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var MenuSchema = new Schema({
  owner: ObjectId,
  location: ObjectId,
  json: String,
  created: Date,
  updated: Date
});

var CustSchema = new Schema({
  name: String,
  address: String,
  phone: String,
  info: String,
  created: Date,
  updated: Date
});

var LocationSchema = new Schema({
  address: String,
  owner: ObjectId,
  menu: ObjectId,
  hours: String,
  phone: String
})

var Menu = mongoose.model('Menu', MenuSchema);
var Customer = mongoose.model('Customer', CustSchema);
var Location = mongoose.model('Location', LocationSchema);

mobmen.menu = Menu;
mobmen.customer = Customer;
mobmen.location = Location;