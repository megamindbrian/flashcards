const webpackConfig = require('./config/webpack.test');

module.exports = function (config) {
    const _config = {
        basePath: '',

        frameworks: ['jasmine'],

        files: [
            {pattern: 'src/app/**/*.ts', included: false, watched: false, served: false},
            {
                pattern:
                    typeof config.grep !== 'undefined' && config.grep.match(/trial/ig)
                        ? './config/karma-branch-trial.shim.js'
                        : (typeof config.grep !== 'undefined' && config.grep.match(/apc/ig)
                        ? './config/karma-branch-apc.shim.js'
                        : (typeof config.grep !== 'undefined' && config.grep.match(/auth/ig)
                            ? './config/karma-branch-auth.shim.js'
                            : ('./config/karma-test-shim.js'))), watched: false
            },
        ],

        preprocessors: {
            './config/karma*shim.js': ['webpack', 'sourcemap'],
            'src/app/**/*.ts': ['sourcemap']
        },

        coverageReporter: {
            dir: './coverage/',
            exclude: [
                "node_modules",
                "**/*.spec.ts"
            ],
            includeAllSources: true,
            reporters: [
//                {type: 'lcov'},
                {type: 'text-summary'},
                {type: 'text'},
            ],
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only'
        },

        webpackServer: {
            noInfo: true
        },

        reporters: ['spec', 'coverage'],
        specReporter: {
            maxLogLines: 5,         // limit number of lines logged per test
            suppressErrorSummary: true,  // do not print error summary
            suppressFailed: false,  // do not print information about failed tests
            suppressPassed: false,  // do not print information about passed tests
            suppressSkipped: true,  // do not print information about skipped tests
            showSpecTiming: false // print the time elapsed for each spec
        },
        browserNoActivityTimeout: 33000,
        port: 9876,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true,
    };

    config.set(_config);
};
