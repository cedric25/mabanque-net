/*global define*/

/**
 * This view shows all the accounts of a specific user
 * It is based on the AccountItemView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'views/accounts/account-item-view',
    'marionette',
    'bootstrap'


], function ($, _, Backbone, AccountItemView) {
    'use strict';

    var AccountsView = Backbone.Marionette.CompositeView.extend({

        // ItemView to render
        itemView: AccountItemView,

        // The template to use
        template: 'accounts-composite',

        // Where all the ItemViews have to be rendered
        itemViewContainer: 'tbody',

        // Callback function, called after all the elements in the collection have been rendered
        onCompositeCollectionRendered: function() {

            this.$el.find('tbody').append(
                '<tr>' +
                    '<td><strong>Total</strong></td>' +
                    '<td>' + this.collection.getGlobalBalance() + ' €</td>' +
                '</tr>'
            );
        }


    });

    return AccountsView;
});