/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/admin/accounts/user-option-item',
    'marionette',
    'bootstrap',
    'parsley'


], function ($, _, Backbone, UserOptionView) {
    'use strict';

    var UsersSelectView = Backbone.Marionette.CollectionView.extend({

        itemView: UserOptionView,

        tagName: 'select',

        attributes: {
            'data-required': true,
            id: 'inputUser'
        }

    });

    return UsersSelectView;
});