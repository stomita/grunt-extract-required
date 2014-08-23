var fs = require('fs');
var path = require('path');
var extractRequiedModules = require('extract-required');

var localRequire = function(name) {
  // prevent recursive require call
  if (requireCalled) { throw new Error("Cannot find module '" + name + "'"); }
  requireCalled = true;
  try {
    return require(name);
  } finally {
    requireCalled = false;
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
      output.push("var requireCalled;")
      output.push("module.exports = " + localRequire.toString() + ";");
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
