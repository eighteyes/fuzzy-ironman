var load = require('./helpers/load')
  , sql = require('./helpers/sql')

exports.up = function(next){
  load('004-up-locations.sql', next);
};

exports.down = function(next){
  sql('DROP TABLE IF EXISTS `locations`', next)
};
