exports.up = function(next){
  sql('./sql/002-up-customers.sql', next);
};

exports.down = function(next){
  sql('DROP TABLE IF EXISTS `customers`', next)
};
