/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
    var app = new EmberApp(defaults, {
        // Add options here
    });
    app.import('bower_components/jquery/dist/jquery.js');
    app.import('bower_components/materialize/dist/css/materialize.css');
    app.import('bower_components/materialize/dist/js/materialize.js');
    app.import('vendor/js/init.js');
    app.import('vendor/fonts/roboto/Roboto-Regular.woff2');
    app.import('vendor/fonts/roboto/Roboto-Regular.woff');
    app.import('vendor/fonts/roboto/Roboto-Medium.woff2');
    app.import('vendor/fonts/roboto/Roboto-Medium.woff');
    app.import('vendor/fonts/roboto/Roboto-Light.woff2');
    app.import('vendor/fonts/roboto/Roboto-Light.woff');
    //console.log('▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ DEVNIGAM24@CSU.FULLERTON.EDU ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
    return app.toTree();
};
