var http = require('http')
  , events = require('events')
  , hb = require('handlebars')
  , fs = require('fs')
  , util = require('util')
  , exists = require('./plugins').exists
  , app = require('express');

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



var Stream = require('stream');
var s = new Stream;
var raw = "";
s.writable = true;

  s.write = function(buf){
    raw += buf;
    console.log(buf);
  };

  s.end = function(buf){
    if (arguments.length) s.write(buf);
    s.writable = false;
  };

  s.destroy = function() {
    s.writable = false;
  };

  s.pipe(process.stdout);



var error;
var simplesmtp = require("simplesmtp");
var smtp = simplesmtp.createServer();
var parse = require("./plugins/parseEmail");

smtp.listen(smtpPort, function(err) { console.log('mailer (%s): %s', smtpPort, ( exists(err) ) ? err : ' started' ); });

smtp.on("startData", function (connection) {
    raw = "";
    console.log("Message from:", connection.from);
    console.log("Message to:", connection.to);
    // TODO: check to see if from / to is valid
});

smtp.on("data", function(connection, chunk){
    if (!error) s.write(chunk.toString());
});

smtp.on("dataReady", function(connection, callback){

    menuText = raw;

    parse( menuText, function(err, menu) {
      if (err) callback(err, "Menu Not Accepted");
      else {
        console.log(menu);
        if (error) {
          callback(error, "Invalid Authentication");
        } else {
          callback(null, "MenuAccepted");
          console.log("Email Processed");
        }
      }
    })
});