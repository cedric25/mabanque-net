/*global define*/

/**
 * CollectionView to show all items of an AccountCollection
 * Based on the AccountOptionItemView
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'views/transfer/account-option-item',
    'marionette',
    'bootstrap',
    'parsley'


], function ($, _, Backbone, AccountOptionView) {
    'use strict';

    var AccountSelectView = Backbone.Marionette.CollectionView.extend({

        //The itemView on which this view is based
        itemView: AccountOptionView,

        //The tag in which the view is wrapped
        tagName: 'select',

        //Attribute added to the view
        //data-required is an attribute specific to parsley (a form validator)
        attributes: {
            'data-required': true
        }

    });

    return AccountSelectView;
});