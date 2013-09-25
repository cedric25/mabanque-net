/*global define*/
/**
 * View for a single Account model
 * This view is used by the Accounts Composite View
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'marionette',
    'bootstrap'


], function ($, _, Backbone) {
    'use strict';

    var AccountView = Backbone.Marionette.ItemView.extend({

        //The template is wrapped in a tr tag
        tagName: 'tr',

        //Gives the class account to the DOM element created
        className: 'account',

        //Set the template (templates/accounts/account-item.mustache)
        template: 'account-item',

        //This view has to be render each time the model changes
        modelEvents: {
            'change': 'render'
        }
    });

    return AccountView;
});