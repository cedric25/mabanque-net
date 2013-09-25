/*global define*/

/**
 * Defines a layout for the details of an account
 *
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'marionette',
    'bootstrap'

], function ($, _, Backbone, App) {
    'use strict';

    var AccountDetailsView = Backbone.Marionette.Layout.extend({

        //Template to use for this layout
        template: 'account-details-layout',

        //Defines regions of the application
        //Content will be shown in those regions
        regions: {
            title: '#title',
            operations: '#operations'
        },

        //When the user clicks on the "back" button, the goBack function is called
        events: {
            'click .btn-primary': 'goBack'
        },

        // Go back in Backbone.history (see MainRouter::back function)
        goBack: function() {

            App.mainRouter.back();

        }

    });

    return AccountDetailsView;
});