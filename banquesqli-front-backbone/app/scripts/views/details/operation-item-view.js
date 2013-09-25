/*global define*/

/**
 * View for a single operation
 * Is used by the OperationCompositeView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'bootstrap'


], function ($, _, Backbone) {
    'use strict';

    var AccountView = Backbone.Marionette.ItemView.extend({

        //Tag in which the template is wrapped into
        tagName: 'tr',

        //Template used for this item
        template: 'operation-item',

        //before rendering, redefine the date attribute to show a lisible date
        onBeforeRender: function() {
            var stringDate = this.model.getStringDate();
            this.model.set('date', stringDate);
        }
    });

    return AccountView;
});