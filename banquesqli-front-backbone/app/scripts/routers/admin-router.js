/**
 * Router initialized when the user is logged as an admin
 * Defines all routes concerning the admin
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette'

], function ($, _, Backbone) {
    'use strict';

    var AdminRouter = Backbone.Marionette.AppRouter.extend({

        //Define all routes
        appRoutes: {

            'setAdminVariables': 'setAdminVariables',

            'admin': 'admin',

            'user/create': 'createUser',
            'user/edit/:login': 'updateUser',
            'user/delete/:login' : 'deleteUser',

            'account/create': 'createAccount',
            'account/edit/:number': 'updateAccount',
            'account/delete/:number': 'deleteAccount',

            'operation/edit/:id': 'updateOperation'

        },

        //The following functions are used to do a "back" in navigation with the code

        initialize: function() {
            this.routesHit = 0;
            //keep count of number of routes handled by your application
            Backbone.history.on('route', function() {
                this.routesHit++;
            }, this);
        },

        back: function() {
            if(this.routesHit > 1) {
                //more than one route hit -> user did not land to current page directly
                window.history.back();

            } else {
                //otherwise go to the home page. Use replaceState if available so
                //the navigation doesn't create an extra history entry
                this.navigate('/', true);
            }
        }

    });

    return AdminRouter;
});