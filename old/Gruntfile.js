// Gruntfile.js
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    // JS TASKS ================================================================
    // check all js files for errors
    jshint: {
      all: ['app.js', 'public/javascripts/video.js']
    },

    //take all the js files and minify them into all.min.js
    uglify: {
      build: {
        files: {
          'public/javascripts/video.js': "public/dist/js/video.min.js",
          'app.min.js': 'app.js'
        }
      }
    },

    // CSS TASKS ===============================================================
    // sass
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'public/dist/stylesheets/style.css': 'public/dist/css/style.sass',
          'drafts/style.css': 'drafts/style.sass'
        }
      }
    },

    // JADE TASKS ===============================================================
    // jade
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          "index.html": ["views/index.jade"],
          "drafts/index.html":"drafts/index.jade"
        }
      }
    },

    // take the processed style.css file and minify
    cssmin: {
      build: {
        files: {
          'public/dist/css/style.min.css': 'public/dist/css/style.css'
        }
      }
    },

    // COOL TASKS ==============================================================
    // watch css and js files and process the above tasks
    watch: {
      css: {
        files: ['**/*.sass'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },


      html: {
        files: ['views/*.html','drafts/*.html'],
        tasks: ['jade'],
        options:{
          livereload:true
        }
      },

      configFiles: {
        files: ['Gruntfile.js'],
        options: {
          livereload: true
        }
      }


    },

    // watch our node server for changes
    nodemon: {
      dev: {
        script: 'bin/www',
        options: {
          nodeArgs: ['--debug']
        }
      }
    },

    // run watch and nodemon at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['sass','jade','concurrent']);

};
