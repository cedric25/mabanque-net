/*global define*/

/**
 * Defines a layout for the header region of the app
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'bootstrap'

], function ($, _, Backbone) {
    'use strict';

    var HeaderLayout = Backbone.Marionette.Layout.extend({

        //The template which is used to create the base
        template: 'header-layout',

        //There is a single region which will show either "Bienvenue" Or the user's name and a link to logout
        regions: {
            content: '.nav-collapse'
        }

    });

    return HeaderLayout;
});