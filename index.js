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

    app.use(express.bodyParser());
    app.use(express.logger('dev'));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(mobmen.conf.publicDir));

    // TODO: replace with ngnix front - serves exports dir
    app.use(express.static(path.join(__dirname, "exports")));

    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

  });


  app.get('/', function( req, res ){
    res.sendfile(mobmen.conf.publicDir + '/index.html');
  });

  app.get('/api', function( req, res ){
    res.send('API is running');
  });

  app.get('/api/menus', function(){
    return mobmen.menus.find(function (err, menus){
      if (err) return console.log(err);
      else {
        return res.send(menus);
      }
    })
  });

  app.get('/api/locations', function(){

  });

  app.get('/api/customers', function(){

  });



  require('./models');
  require('./mail');
});
