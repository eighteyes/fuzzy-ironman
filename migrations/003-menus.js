var load = require('./helpers/load')
  , sql = require('./helpers/sql')

exports.up = function(next){
  load('003-up-menus.sql', next);
};

exports.down = function(next){
  sql('DROP TABLE IF EXISTS `menus`', next)
};
