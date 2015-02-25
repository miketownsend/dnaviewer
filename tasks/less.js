module.exports = {
  compile: {
  	options: {
  		sourceMap: true,
  		sourceMapRootpath: '../../'
  	},
    files: {
      'tmp/app/styles/styles.css': 'app/styles/main.less'
    }
  }
};
