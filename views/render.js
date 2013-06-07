var fs = require('fs')
  , hb = require('handlebars')

module.exports = function render( template, data, next ){
  fs.readFile('templates/' + template + '.hbs', {encoding:'ascii'},
    function ( err, template ) {
      if (err) next(err);
      var page = hb.compile(template);
      var str = page(data);
      return next(null, str);
  });
}
