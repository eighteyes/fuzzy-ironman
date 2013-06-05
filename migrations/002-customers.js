var load = require('./helpers/load')
  , sql = require('./helpers/sql')

exports.up = function(next){
  load('002-up-customers.sql', next);
};

exports.down = function(next){
  sql('DROP TABLE IF EXISTS `customers`', next)
};
