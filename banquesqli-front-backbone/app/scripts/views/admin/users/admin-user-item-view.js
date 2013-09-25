/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'bootstrap'


], function ($, _, Backbone) {
    'use strict';

    var AdminUserItemView = Backbone.Marionette.ItemView.extend({

        tagName: 'tr',

        template: 'admin-user-item'
    });

    return AdminUserItemView;
});