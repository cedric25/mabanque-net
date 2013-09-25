/*global require*/
'use strict';

/**
 * Config file for RequireJS
 */

requirejs.config({

    //File that has to be loaded once config is done
    deps: ['main'],

    //Set paths of librairies
    paths: {
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore/underscore-min',
        backbone: '../bower_components/backbone/backbone-min',
        mustache: '../bower_components/mustache/mustache',
        parsley: '../bower_components/parsleyjs/parsley',
        bootstrap: 'vendor/bootstrap',
        marionette: '../bower_components/backbone.marionette/lib/backbone.marionette.min',
        bootbox: '../bower_components/bootbox/bootbox.min'
    },

    //Set dependencies and names of some librairies that are not AMD compliant
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        marionette: {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Marionette'
        },

        parsley: {
            deps: ['jquery'],
            exports: 'parsley'
        },

        bootbox: {
            deps: ['jquery', 'bootstrap'],
            exports: 'bootbox'
        }
    }

});