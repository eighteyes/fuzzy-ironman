var fs = require('fs')
, util = require('util');


module.exports = function parseEmail( email, cb ){

  testStr = email.replace(/\n+/g, '');
  indices = {};

  indices.start = testStr.indexOf("=== BEGIN MENU ===") + 18;
  indices.end = testStr.indexOf("=== END MENU ===");


  if ( indices.start == -1 + 18) {
    return cb(new Error("Improper Menu Format"));
  }

  testStr = testStr.slice(indices.start, indices.end);
  sections = testStr.split("==").slice(1);

  titleRegex = /(?:==)(.*)(?:==)/;
  itemRegex = /\[(.*?)\]/;

  for (var i in sections) {
    //replace array
    var repObj = {};
    var items = [];
    var thisSect = sections[i];
    var itemStrs = thisSect.split('--').slice(1);
    for ( var o in itemStrs ){
      var thisItem = itemStrs[o].trim();
      var repItem = {};
      var itemInfo = thisItem.split('-');
      repItem.name = itemInfo[0].match(itemRegex)[1].trim();
      repItem.price = itemInfo[1].match(itemRegex)[1].trim();
      if (itemInfo.length > 2) {
        repItem.description = itemInfo[2].match(itemRegex)[1].trim();
      }
      items.push(repItem);
    }
    repObj.items = items;
    repObj.name = thisSect.slice(0, thisSect.indexOf('--')).trim();

    //force to integer
    repObj.order = +i + 1;

    sections[i] = repObj;
  }

  return cb(null, { sections: sections });
};
