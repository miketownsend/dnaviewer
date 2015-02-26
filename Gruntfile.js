module.exports = function( grunt ) {
  'use strict';

	var config = {
		pkg: grunt.file.readJSON('package.json'),
		env: process.env,
		adapter: process.adapter
	};

	grunt.util._.extend(config, loadConfig('./tasks/'));
	grunt.initConfig(config);

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.loadTasks('tasks');

  	grunt.registerTask('serve', "Run app locally and watch for changes.", [
		'build',
		'connect:app',
		'watch'
	]);

  	grunt.registerTask('test', "Run qunit tests in phantom.", [
		'build',
		'connect:app',
		'qunit'
	]);

	grunt.registerTask('build','Build local dev copy',function(){
		grunt.task.run([
			'clean',
			'copy:less',
			'less',
			"emberTemplates",
			'copy:app',
			'copy:vendor',
			'copy:assets',
			'concat',
			'copy:tests',
			'preprocess'
		]);
	});
};

// TODO: extract this out
function loadConfig(path) {
  var string = require('string');
  var glob = require('glob');
  var object = {};
  var key;

  glob.sync('*', {cwd: path}).forEach(function(option) {
    key = option.replace(/\.js$/,'');
    key = string(key).camelize().s;
    object[key] = require(path + option);
  });

  return object;
}
