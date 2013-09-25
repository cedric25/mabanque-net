/*global define*/

/**
 * View for the menu
 * Will be shown in the menu region of the App
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'bootstrap'

], function ($, _, Backbone) {
    'use strict';

    var MenuView = Backbone.Marionette.ItemView.extend({

        template: 'menu'

    });

    return MenuView;
});