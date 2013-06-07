var http = require('http')
  , events = require('events')
  , hb = require('handlebars')
  , fs = require('fs');

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
}).listen(8124);

function render( template, data, next ){
  fs.readFile('templates/' + template + '.hbs', {encoding:'ascii'},
    function ( err, template ) {
      if (err) next(err);
      var page = hb.compile(template);
      var str = page(data);
      return next(null, str);
  });
}
