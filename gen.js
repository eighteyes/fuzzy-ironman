var mobmen = require('mobmen')
  , fakeMenu = require('./fakes/menu')
  , fakeHours = require('./fakes/hours')
  , util = require('util')
  , mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mobileMenus');

mobmen.init(function(){
  require('./models');
  var items = [];

  var menu = new mobmen.menus( {
    json: JSON.stringify(fakeMenu),
    created: Date.now(),
    updated: Date.now()
  });

  console.log(menu)
  menu.save(function(err){
    if (err) { return console.error(err); }
    else { return console.log('Saved'); }
  });
});
