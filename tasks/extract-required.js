var fs = require('fs');
var path = require('path');
var extractRequiedModules = require('extract-required');

var localRequire = function(name) {
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
};

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
      output.push("module.exports = " + localRequire.toString());
      for (var m in modules) {
        output.push("require(\"" + m + "\");");
      }
      if (options.exposeToGlobal) {
        var globalFn = options.exposeToGlobal === true ? "require" : options.exposeToGlobal;
        output.push("global." + globalFn + " = module.exports;");
      } 
      output = output.join('\n');
      grunt.file.write(f.dest, output, 'utf-8'); 
    });
  });

};
