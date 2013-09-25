/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/admin/users/admin-user-item-view',
    'marionette',
    'bootstrap'


], function ($, _, Backbone, AdminUserItemView) {
    'use strict';

    var AccountsView = Backbone.Marionette.CompositeView.extend({

        // ItemView to render
        itemView: AdminUserItemView,

        // The template to use
        template: 'users-composite',

        // Where all the ItemViews have to be rendered
        itemViewContainer: 'tbody'

    });

    return AccountsView;
});