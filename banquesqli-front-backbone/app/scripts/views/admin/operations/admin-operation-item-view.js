/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'marionette',
    'bootstrap'


], function ($, _, Backbone) {
    'use strict';

    var AdminOperationItemView = Backbone.Marionette.ItemView.extend({

        tagName: 'tr',

        template: 'admin-operation-item'
    });

    return AdminOperationItemView;
});