#!/usr/bin/env node

var program = require('commander')
  , sqlite3 = require('sqlite3').verbose()
  , db = new sqlite3.Database('data.sql3')
  , render = require('../views/render')
  , fs = require('fs');

program
  .version('0.0.1')
  .option('-t, --template [name]', 'Use Template [name]', 'test' )
  .option('-m, --menu <n>', 'Use Menu ID')
  .option('-c, --customer <n>', 'Use Customer ID')
  .option('-l, --location <n>', 'Use Location ID')
  .parse(process.argv);

console.log( ' Rendering Menu ');

var menuId = program.menu || 1;
var templateName = program.template || 'test';

// todo
var customerId, locationId;

if ( program.template ) {
  console.log('Template: ', templateName);
}
if ( program.menu ) {
  console.log('MenuId : ', menuId);
}

//todo
if ( program.customer ) console.log(program.customer);
if ( program.location ) console.log(program.location);

//make the menu
db.get('SELECT * FROM menus WHERE id = ' + menuId , function(err, menu){
  if (err) throw new Error(err + ' No Menu Found');
  var fileName = menu.url;
  var menuJSON = JSON.parse(menu.json);
  templateName = program.template || menu.template || test;
  console.log("Menu Found" , menuJSON);

  render( templateName, menuJSON, function(err, html){
    if (err) throw new Error(err + 'Render Failed');
    console.log("Menu Rendered");

    fs.writeFile('exports/'+ fileName +'.html', html , function(err){
      if (err) throw new Error(err + 'Save Failed');
      console.log("Menu Saved!");
      console.log(html);
    });
  });
});
