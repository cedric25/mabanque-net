/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'bootstrap'


], function ($, _, Backbone) {
    'use strict';

    var AccountOptionView = Backbone.Marionette.ItemView.extend({

        tagName: 'option',

        attributes: function() {
            return {
                value: this.model.getLogin()
            }
        },

        template: 'user-option-item'
    });

    return AccountOptionView;
});