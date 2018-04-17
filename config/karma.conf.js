/**
 * @author: @Vged
 *
 * Configuración de karma para la ejecución de tests unitarios
 */
module.exports = function(config) {
    var testWebpackConfig = require('./webpack.test.js')({ env: 'test' });

    var configuration = {

        // Ruta base que será usada para todos los patrones (archivos, exclude, etc)
        basePath: '',

        // Frameworks a utilizar (https://npmjs.org/browse/keyword/karma-adapter)
        frameworks: ['jasmine'],

        // Archivos a excluir del análisis
        exclude: [],

        client: {
            captureConsole: false
        },

        // Archivos / Patrones a incluir. Utilizamos el archivo spec-bundle.js para construir el entorno
        files: [
            { pattern: './config/spec-bundle.js', watched: false },
            { pattern: './src/assets/**/*', watched: false, included: false, served: true, nocache: false }
        ],

        // Por defecto todos los assets se sirven desde http://localhost:[PORT]/base/
        proxies: {
            "/assets/": "/base/src/assets/"
        },

        // Preprocesado de archivos antes de servirlos en el navegador (https://npmjs.org/browse/keyword/karma-preprocessor)
        preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },

        // Configuración de webpack para test en webpack.test.js
        webpack: testWebpackConfig,

        coverageReporter: {
            type: 'in-memory'
        },

        remapCoverageReporter: {
            'text-summary': null,
            json: './coverage/coverage.json',
            html: './coverage/html'
        },

        // Minimizando la información de webpack por consola
        webpackMiddleware: {
            noInfo: true,
            stats: {
                chunks: false
            }
        },

        // Resultados de test (https://npmjs.org/browse/keyword/karma-reporter)
        reporters: ['mocha', 'coverage', 'remap-coverage'],

        // Puerto para tests
        port: 9876,

        // Habilitamos colores para los logs
        colors: true,

        // Nivel de logging (config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG)
        logLevel: config.LOG_WARN,

        // Habiltar / Deshabilitar el modo de escucha de cambios
        autoWatch: false,
        singleRun: true,

        // Navegador a utilizar (https://npmjs.org/browse/keyword/karma-launcher)
        browsers: [
            'PhantomJS'
        ]
    };

    config.set(configuration);
};
