/**
 * @author: @Vged
 *
 * Configuración de webpack para test
 */
const helpers = require('./helpers');

// Plugins
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

// Constantes
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = function (options) {
    return {

        // Herramienta de debuggeo (https://github.com/webpack/docs/wiki/build-performance#sourcemaps)
        // NO CAMBIAR
        devtool: 'inline-source-map',

        // Opciones para la resolución de módulos (http://webpack.github.io/docs/configuration.html#resolve)
        resolve: {
            // Array de extensiones a resolver (http://webpack.github.io/docs/configuration.html#resolve-extensions)
            extensions: ['.ts', '.js'],

            // Array de directorios a resolver
            modules: [helpers.root('src'), 'node_modules']
        },

        // Opciones que afectan a los módulos (http://webpack.github.io/docs/configuration.html#module)
        module: {
            rules: [
                // (https://github.com/webpack/source-map-loader)
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: 'source-map-loader',
                    exclude: [
                        // Estos paquetes dan problemas con sus sourcemaps
                        helpers.root('node_modules/rxjs'),
                        helpers.root('node_modules/@angular')
                    ]
                },

                // Loader para typescript y rutas asíncronas
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'awesome-typescript-loader',
                            query: {
                                // activar inlineSourceMap para el reporte de  "karma-remap-coverage"
                                sourceMap: false,
                                inlineSourceMap: true,
                                compilerOptions: {
                                    removeComments: true
                                }
                            },
                        },
                        'angular2-template-loader'
                    ],
                    exclude: [/\.e2e\.ts$/]
                },

                // Loader json
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                    exclude: [helpers.root('src/index.html')]
                },

                // Loader raw
                {
                    test: /\.css$/,
                    loader: ['to-string-loader', 'css-loader'],
                    exclude: [helpers.root('src/index.html')]
                },
                {
                    test: /\.scss$/,
                    loader: ['raw-loader', 'sass-loader'],
                    exclude: [helpers.root('src/index.html')]
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader',
                    exclude: [helpers.root('src/index.html')]
                },

                // Instrumentación para el reporte de coverage (https://github.com/deepsweet/istanbul-instrumenter-loader)
                {
                    enforce: 'post',
                    test: /\.(js|ts)$/,
                    loader: 'istanbul-instrumenter-loader',
                    include: helpers.root('src'),
                    exclude: [
                        /\.(e2e|spec)\.ts$/,
                        /node_modules/
                    ]
                }
            ]
        },

        // Plugins
        plugins: [
            // Definición de variables globales para la aplicación (https://webpack.github.io/docs/list-of-plugins.html#defineplugin)
            new DefinePlugin({
                'ENV': JSON.stringify(ENV),
                'HMR': false,
                'process.env': {
                    'ENV': JSON.stringify(ENV),
                    'NODE_ENV': JSON.stringify(ENV),
                    'HMR': false,
                }
            }),

            // Provee de contexto para el uso de System.import en Angular (https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin)
            // Consultar: https://github.com/angular/angular/issues/11580
            new ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                helpers.root('src'),
                {
                    // Rutas asincronas de angular relativas al directorio root
                }
            ),

            // Opciones para los loaders
            new LoaderOptionsPlugin({
                debug: false,
                options: {}
            }),
        ],

        // (https://github.com/a-tarasyuk/rr-boilerplate/blob/master/webpack/dev.config.babel.js#L41)
        performance: {
            hints: false
        },

        // Polyfills node
        node: {
            global: true,
            process: false,
            crypto: 'empty',
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    };
}
