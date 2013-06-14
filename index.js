var http = require('http')
  , events = require('events')
  , hb = require('handlebars')
  , fs = require('fs')
  , util = require('util')
  , exists = require('./plugins').exists
  , app = require('express')
  , mobmen = require('mobmen')

mobmen.init(function(){
  require('./models');
});


webPort = 8124;
smtpPort = 587;

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  render( 'test', testData, function( err, data ){
    if (err) console.error(err);
    console.log(data);
    res.end(data);
    fs.writeFile('exports/test.html', data, function(err){
      if (err) throw err;
      console.log("saved!");
    });
  });
}).listen(webPort, function(err) { console.log('server (%s): %s', webPort, ( exists(err) ) ? err : ' started' )});
