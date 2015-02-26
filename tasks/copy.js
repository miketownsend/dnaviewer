module.exports = {
	assets: {
		files: [{
			expand: true,
			cwd: 'public/',
			src: [
			'**/*.*',
			],
			dest: 'tmp/assets/'
		}
		]
	},
	less: {
		files: [{
			expand: true,
			cwd: 'app/',
			src: [
			'**/*.less'
			],
			dest: 'tmp/app/'
		}
		]
	},
	app: {
		files: [{
			expand: true,
			cwd: 'app/',
			src: [
			'**/*.js',
			'**/*.less'
			],
			dest: 'tmp/app/'
		},
		{
			expand: true,
			cwd: 'app/',
			src: [
			'*.html',
			],
			dest: 'tmp/'
		}
		]
	},
	vendor: {
		files: [{
			expand: true,
			cwd: 'bower_components/',
			src: [
				'**/*.*'
			],
			dest: 'tmp/bower_components/'
		}]
	},
	templates: {
		'tmp/template.html': 'app/template.html'
	},
	tests: {
		files: [
			{
				expand: true,
				cwd: 'tests/',
				src: [
					'test_initialiser.js',
					'test.css',
				],
				dest: 'tmp/tests/'
			},
			{
				expand: true,
				cwd: 'tests/',
				src: ['test.html'],
				dest: 'tmp/'
			}
		]
	},
};
