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
    return raw;
  };

  s.destroy = function() {
    s.writable = false;
  };

  s.pipe(process.stdout);

module.exports.stream = s;
module.exports.raw = raw;