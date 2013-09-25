/*global define*/

/**
 * AccountsCompositeView which is shown in the details layout, in operations region
 * It is composed by a collection of operations and based on OperationItemView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'views/details/operation-item-view',
    'marionette',
    'bootstrap'


], function ($, _, Backbone, OperationItemView) {
    'use strict';

    var AccountsView = Backbone.Marionette.CompositeView.extend({

        // ItemView to render
        itemView: OperationItemView,

        // The template to use
        template: 'operations-composite',

        // Where all the ItemViews have to be rendered
        itemViewContainer: 'tbody'

    });

    return AccountsView;
});