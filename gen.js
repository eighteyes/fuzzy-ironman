var mobmen = require('mobmen')
  , fakeMenu = require('./fakes/menu')
  , fakeCustomer = require('./fakes/customer')
  , fakeLocation = require('./fakes/location')
  , mongoose = require('mongoose')
  , async = require('async')

mongoose.connect('mongodb://localhost/mobileMenus');

mobmen.init(function(){
  require('./models');

  async.series({
    menu: function (callback) {
      var menu = new mobmen.menus( fakeMenu );
      menu.save( function ( err ){
        callback(null, menu);
      });
    },
    customer: function (callback) {
      var customer = new mobmen.customers( fakeCustomer );
      customer.save( function (err) {
        callback(null, customer)
      });
    }
  },
  function (err, results){
    console.log('results:', results)
    var location = new mobmen.locations( fakeLocation );
    location.owner = results.customer.id;
    location.menu = results.menu.id;
    location.save( function(err){
      console.log('location:', location);
      process.exit();
    })
  }
  );

});
