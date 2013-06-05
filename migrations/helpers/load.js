var fs = require('fs')
  , sqlite3 = require('sqlite3').verbose()
  , db = new sqlite3.Database('data.sql')
  , path = require('path');


  module.exports = function (filename, next){
    file = path.resolve('migrations', filename);
    if (fs.exists(file)){
      fs.readFile(file, 'utf8', function (err, data){
        if (err) throw err;
        db.run(data, function(err){
          if (err) throw err;
          db.close();
          next();
        })
      })
    } else {
      throw new Error('File Not Found : ', filename);
    }
  }