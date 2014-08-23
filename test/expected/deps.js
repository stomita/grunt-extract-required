module.exports = function (name) {
  var grequire;
  if (typeof global.require === 'function') {
    grequire = global.require;
    global.require = undefined;
  }
  var mod;
  try {
    return require(name);
  } finally {
    if (grequire) {
      global.require = grequire;
    }
  }
}
require("fs");
require("path");
require("./bbb");
require("url");
global.require = module.exports;