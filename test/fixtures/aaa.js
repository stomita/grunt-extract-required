var fs = require('fs');
var path = require('path');
var bbb = require('./bbb');

module.exports = function(url) {
  var pathname = require('url').parse(url).pathname;
  return fs.readdirSync(path.dirname(pathname));
};
