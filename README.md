# grunt-extract-required #
[![Build Status](https://secure.travis-ci.org/stomita/grunt-extract-required.png)](https://travis-ci.org/stomita/grunt-extract-required)

A grunt task to extract commonly required modules in src files, and genenrate a JS code to use as a loader.

Using [extract-required](https://github.com/stomita/extract-required) inside.

## Usage ##

A example grunt task in Gruntfile.js :

``` javascript

  ...

  extract_required: {
    lib: {
      files: {
        'output/core-require.js' : [ 'lib/core/**/*.js' ]
      },
      options: {
        baseDir: 'lib/',
        ignore: [ './submodule/**/*' ],
        exposeToGlobal: true
      }
    }
  },

  ...

```

## Options ###

### options.baseDir ###

 Specify a base directory to canonicalize relatively loaded module paths.

### options.ignore ###

 Specify a glob pattern or name of modules to ignore from the output.

### options.exposeToGlobal ###

 If you want to expose the generated loader function to global, set true (or custom global function name; by default it use `require`). Otherwise the function will be opened as a CommonJS-style module.

