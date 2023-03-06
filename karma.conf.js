const isWindows = /^win/.test(process.platform);
const isMacOS = /^darwin/.test(process.platform);
const isUbuntu = /^linux/.test(process.platform);

module.exports = function (config) {
  let karmaConf = {
    logLevel: config.LOG_INFO,
    concurrency: 1,
    singleRun: true,
    colors: true,
    frameworks: ['mocha'],
    files: [
      'test/setup/karma.js',
      {
        pattern: 'src/assets/audios.mp4',
        included: false
      }
    ],
    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap'],
      'test/setup/karma.js': ['webpack', 'sourcemap']
    },
    reporters: ['mocha', 'coverage'],
    webpack: {
      ...require('./webpack.config.js'),
      externals: {}, //Need to remove externals otherwise they won't be included in test
      devtool: 'inline-source-map', // Need to define inline source maps when using karma
      mode: config.mode || 'development' // run in development mode by default to avoid minifying -> faster
    },
    webpackServer: {
      noInfo: true
    },
    client: {
      mocha: {
        reporter: 'html',
        timeout: 10000
      }
    }
  };

  if (isWindows) {
    karmaConf.browsers.push('IE');
  } else if (isMacOS) {
    karmaConf.browsers.push('Safari');
  } else if (isUbuntu) {
    karmaConf.browsers.push('Chrome');
    karmaConf.browsers.push('Firefox');
  }

  config.set(karmaConf);
};
