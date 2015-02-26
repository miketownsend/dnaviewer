var grunt = require('grunt');
module.exports = {
	test: {
		options:{
			context: {
				TESTING: true
			}
		},
		files: {
			"tmp/test.html": "app/index.html"
		}
	},
	dev: {
		options: {
			context: {
			}
		},
		files: {
			"tmp/index.html": "app/index.html"
		}
	}
}