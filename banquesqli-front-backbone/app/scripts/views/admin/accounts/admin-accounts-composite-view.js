/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/admin/accounts/admin-account-item-view',
    'marionette',
    'bootstrap'


], function ($, _, Backbone, AdminAccountItemView) {
    'use strict';

    var AccountsView = Backbone.Marionette.CompositeView.extend({

        // ItemView to render
        itemView: AdminAccountItemView,

        // The template to use
        template: 'admin-accounts-composite',

        // Where all the ItemViews have to be rendered
        itemViewContainer: 'tbody'

    });

    return AccountsView;
});