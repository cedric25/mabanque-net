module.exports = function (config) {
  config.set({
    basePath: '../',

    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-*/angular-*.js',
      'test/lib/angular/angular-*.js',
      'app/scripts/**/*.js',
      'test/spec/**/*.js'
    ],

    frameworks: ['jasmine'],

    autoWatch: true,

    browsers: ['Chrome'],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
