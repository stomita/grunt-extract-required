require("fs");
require("path");
require("./bbb");
require("url");
global.require = function(name) { return require(name); };