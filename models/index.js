var mongoose = require('mongoose')
  , mobmen = require('mobmen')

var Menu = mongoose.model('Menu', require('./menu'));
var Customer = mongoose.model('Customer', require('./customer'));
var Location = mongoose.model('Location', require('./location'));

mobmen.menu = Menu;
mobmen.customer = Customer;
mobmen.location = Location;