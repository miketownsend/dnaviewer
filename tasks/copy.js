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
			cwd: 'vendor/',
			src: [
				'**/*.*'
			],
			dest: 'tmp/vendor/'
		}]
	},
	templates: {
		'tmp/template.html': 'app/template.html'
	}
};
