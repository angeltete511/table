/**
 * @author: @Vged
 *
 * Cuando hacemos tests con WebPack y ES6, se deben realizar algunas acciones extra.
 * Debemos transcompilar los tests, ya que los vamos a escribir en ES6. Esto lo hace el plugin karma-webpack-plugin.
 * Al igual que cuando construimos un bundle para producción se crean los archivos para el navegador, este archivo
 * crea algo similar con las condiciones adecuadas para test.
 */
Error.stackTraceLimit = Infinity;

require('core-js/es6');
require('core-js/es7/reflect');
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('rxjs/Rx');

const testing = require('@angular/core/testing');
const browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(
    browser.BrowserDynamicTestingModule,
    browser.platformBrowserDynamicTesting()
);

// Contexto para tests. Utilizamos la función require de webpack para obtener una lista de archivos
const testContext = require.context('../src', true, /\.spec\.ts/);

// Recorremos los archivos para que se carguen
function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

// Procesamos
const modules = requireAll(testContext);
