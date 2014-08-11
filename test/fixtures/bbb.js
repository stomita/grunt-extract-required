var fs = require('fs');

module.exports = function(p) {
  var url = require('url').parse(p);
  return url.hostname;
};


