module.exports = function(grunt) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('./package.json'),

    extract_required: {
      test: {
        files: [{
          expand: true,
          flatten: false,
          cwd: 'test/fixtures/',
          src: [ '**/*.js' ],
          dest: 'tmp/',
          ext: '.js'
        }],
        options: {
          openToGlobal: true
        }
      }
    },

    clean: {
      test: ['tmp'],
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('test', ['clean:test', 'extract_required:test' ]);
  grunt.registerTask('default', ['test']);
};