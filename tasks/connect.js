var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

module.exports = {
    options: {
	hostname: 'localhost',
	middleware: middleware
    
    },
    app: {
		options: {
		    port: 9000,
		    base: 'tmp'
		}
    }
};

function middleware(connect, options) {
    return [
	connect['static'](options.base),
	connect.directory(options.base)
    ];
}
