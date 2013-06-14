var mobmen = require('mobmen')
  , exists = require('./plugins/utils').exists


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

smtp.listen(mobmen.conf.smtpPort, function(err) {
    console.log('mailer (%s): %s', mobmen.conf.smtpPort, ( exists(err) ) ? err : ' started' ); });

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
