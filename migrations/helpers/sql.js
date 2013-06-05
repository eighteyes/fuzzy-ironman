var fs = require('fs')
  , sqlite3 = require('sqlite3').verbose()
  , db = new sqlite3.Database('data.sql3')
  , path = require('path');

module.exports = function( command, next ){
  db.run(command, function(err){
    if (err) throw err;
    next();
  })
};