var fs = require('fs')
  , sqlite3 = require('sqlite3').verbose()
  , db = new sqlite3.Database('data.sql3')
  , path = require('path');


  module.exports = function (filename, next){
    var file = path.resolve('migrations', 'sql', filename);
    fs.exists(file, function (exists){
      if (!exists) console.error("No SQL file found : ", file);
      fs.readFile(file, 'utf8', function (err, data){
        if (err) throw err;
        db.run(data, function(err){
          if (err) throw err;
          next();
        })
      })
    });
  }