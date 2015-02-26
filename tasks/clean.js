module.exports = {
    hbs: 'tmp/app/templates.js',
    app: ['tmp/app/**/*.js', 'tmp/index.html', '!tmp/app/templates.js', '!tmp/app/styles.css'],
    assets: 'tmp/assets',
    vendor: 'tmp/vendor',
    styles: 'tmp/styles',
    all: "tmp/app",
    tests: "tmp/tests"
}