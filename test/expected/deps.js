module.exports = function(name) { return require(name); };
require("fs");
require("path");
require("./bbb");
require("url");
global.require = module.exports;