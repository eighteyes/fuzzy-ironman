var fs = require('fs')
  , sqlite3 = require('sqlite3').verbose()
  , db = new sqlite3.Database('menus.sql')
  , path = require('path');

module.exports = function( command ){
  db.run(command, function(err){
    if (err) throw err;
    db.close();
    next();
  })
};