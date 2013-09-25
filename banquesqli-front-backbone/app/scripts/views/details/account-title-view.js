/*global define*/

/**
 * Item view for an account
 * It is used to show the name of the account and the balance at the top
 * Will be displayed in the details layout (title region)
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'bootstrap'

], function ($, _, Backbone) {
    'use strict';

    var AccountDetailsView = Backbone.Marionette.ItemView.extend({

        //Just define the template
        //The tag will be a div with no other attribute (default behaviour)
        template: 'account-title'

    });

    return AccountDetailsView;
});