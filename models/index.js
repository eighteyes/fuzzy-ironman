var mongoose = require('mongoose')
  , mobmen = require('mobmen')

var Menu = mongoose.model('Menu', require('./menu'));
var Customer = mongoose.model('Customer', require('./customer'));
var Location = mongoose.model('Location', require('./location'));

mobmen.menus = Menu;
mobmen.customers = Customer;
mobmen.locations = Location;
