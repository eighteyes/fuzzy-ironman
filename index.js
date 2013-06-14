var http = require('http')
  , fs = require('fs')
  , util = require('util')
  , exists = require('./plugins').exists
  , express = require('express')
  , app = express()
  , mobmen = require('mobmen')
  , path = require('path')

mobmen.init(function(){
  mobmen.conf.webPort = 8124;
  mobmen.conf.smtpPort = 587;
  mobmen.conf.publicDir = path.join(__dirname, "public", "app")

  // start server
  http.createServer(app).listen(mobmen.conf.webPort, function(err) {
      console.log(
        'server (%s): %s',
        mobmen.conf.webPort,
        ( exists(err) ) ? err : ' started' )
      });


  app.configure(function () {
    app.use(function(err, req, res, next){
      console.log("hey");
      next();
    });
    app.use(express.bodyParser());
    app.use(express.logger('dev'));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(mobmen.conf.publicDir));

    // TODO: replace with ngnix front - serves exports dir
    app.use(express.static(path.join(__dirname, "exports")));

    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    console.log(app.routes);
  });


  app.get('/', function( req, res ){
    res.sendfile(mobmen.conf.publicDir + '/index.html');
  });

  require('./models');
  require('./mail');
});
