/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/admin/operations/admin-operation-item-view',
    'marionette',
    'bootstrap'


], function ($, _, Backbone, AdminOperationItemView) {
    'use strict';

    var AccountsView = Backbone.Marionette.CompositeView.extend({

        // ItemView to render
        itemView: AdminOperationItemView,

        // The template to use
        template: 'admin-operations-composite',

        // Where all the ItemViews have to be rendered
        itemViewContainer: 'tbody'

    });

    return AccountsView;
});