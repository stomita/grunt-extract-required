var fs = require('fs');
var path = require('path');
var extractRequiedModules = require('extract-required');

function externalRequire(mpath) {
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
}

module.exports = function(grunt) {

  grunt.registerMultiTask('extract_required', 'extract required modules from given JS codes', function() {
    var options = this.options();
    this.files.forEach(function(f) {
      var modules = [];
      f.src.forEach(function(src) {
        var code = fs.readFileSync(src, 'utf-8');
        extractRequiedModules(code, {
          src: src,
          cwd: options.baseDir || path.dirname(f.dest),
          ignore: options.ignore
        }).forEach(function(m) {
          modules[m] = true;
        });
      });
      var output = [];
      for (var m in modules) {
        output.push("require(\"" + m + "\");");
      }
      output.push(
        (options.openToGlobal ? "global.require = " : "module.exports = ") +
        "function(name) { return require(name); };"
      );
      output = output.join('\n');
      grunt.file.write(f.dest, output, 'utf-8'); 
    });
  });

};
