/*global define*/

/**
 * View for a single account
 * This view is made to create the options of the select in the transfer form
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'bootstrap'

], function ($, _, Backbone) {
    'use strict';

    var AccountOptionView = Backbone.Marionette.ItemView.extend({

        //The tag in which the template is wrapped
        tagName: 'option',

        //Set the value attribute of the item.
        //have to use a function because we need to use a function in it
        attributes: function() {
            return {
                value: this.model.getNumber()
            }
        },

        //The template used to show the item
        template: 'account-option-item'
    });

    return AccountOptionView;
});