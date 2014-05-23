
/* global describe, it */
var fs = require('fs');
var assert = require('power-assert');

describe("extract-required-modules", function() {
  it("should extract js file with module list", function() {
    var filenames = fs.readdirSync(__dirname + '/../tmp/').filter(function(filename) {
      return /\.js$/.test(filename);
    });
    filenames.forEach(function(filename) {
      var generated = fs.readFileSync(__dirname + '/../tmp/' + filename, 'utf-8');
      var expected = fs.readFileSync(__dirname + '/expected/' + filename, 'utf-8');
      assert.ok(generated === expected);
    });
  });
});