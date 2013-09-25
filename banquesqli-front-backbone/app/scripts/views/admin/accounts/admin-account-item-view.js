/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'marionette',
    'bootstrap'


], function ($, _, Backbone, App) {
    'use strict';

    var AdminAccountItemView = Backbone.Marionette.ItemView.extend({

        tagName: 'tr',

        template: 'admin-account-item',

        onBeforeRender: function() {

            var loginNumber = this.model.getOwnerLogin();

            var user = App.usersCollection.findWhere({login: loginNumber});

            var ownerName = user.getFirstName() + ' ' + user.getLastName();
            this.model.set('ownerName', ownerName);

        }
    });

    return AdminAccountItemView;
});