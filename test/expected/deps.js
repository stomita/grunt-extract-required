var requireCalled;
module.exports = function (name) {
  // prevent recursive require call
  if (requireCalled) { throw new Error("Cannot find module '" + name + "'"); }
  requireCalled = true;
  try {
    return require(name);
  } finally {
    requireCalled = false;
  }
};
require("fs");
require("path");
require("./bbb");
require("url");
global.require = module.exports;