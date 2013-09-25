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

    var AdminLayout = Backbone.Marionette.Layout.extend({

        template: 'admin-layout',

        regions: {
            users: '#users',
            accounts: '#accounts',
            operations: '#operations'
        }

    });

    return AdminLayout;
});