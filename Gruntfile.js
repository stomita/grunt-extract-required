module.exports = function(grunt) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('./package.json'),

    extract_required: {
      test: {
        files: [{
          src: 'test/fixtures/**/*.js',
          dest: 'tmp/deps.js'
        }],
        options: {
          baseDir: 'test/fixtures',
          exposeToGlobal: true
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
