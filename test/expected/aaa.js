require("fs");
require("path");
require("../test/fixtures/bbb");
require("url");
global.require = function externalRequire(mpath) {
  if (mpath.charAt(0) === ".") {
    var path = require('path');
    try {
      throw new Error();
    } catch(e) {
      var m = e.stack.split('\n')[2].match(/at ((\S+):\d+:\d+|[^\(]+\((\S+):\d+:\d+\))$/);
      var src = m && (m[2] || m[3]);
      if (src) {
        mpath = path.resolve(path.dirname(src), mpath);
        if (mpath.charAt(0) !== ".") {
          mpath = "./" + mpath;
        }
      }
    }
  }
  return require(mpath);
};