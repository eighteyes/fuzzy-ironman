
/*
USAGE : printMenu(1, 'test');
*/
var sqlite3 = require('sqlite3').verbose()
  , db = new sqlite3.Database('data.sql3')
  , render = require('../views/render')
  , fs = require('fs');

module.exports = function printMenu( menuId, fileName, cb ){
  console.log( ' Rendering Menu : ', menuId );

var menuId = program.menu || 1;
var templateName = program.template || 'test';

// todo
var customerId, locationId;

//make the menu
db.get('SELECT * FROM menus WHERE id = ' + menuId , function(err, menu){
  if (err) cb(new Error(err + ' No Menu Found'));
  var fileName = menu.url;
  var menuJSON = JSON.parse(menu.json);
  templateName = program.template || menu.template || test;

  render( templateName, menuJSON, function(err, html){
    if (err) cb(new Error(err + 'Render Failed'));

    fs.writeFile('exports/'+ fileName +'.html', html, function(err){
      if (err) cb(new Error(err + 'Save Failed'));
      console.log("Menu Saved :" + fileName);
      console.log(html);
      cb(null);
    });
  });
});
}

