/**
 * Router initialized by default
 * Defines all common routes
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette'

], function ($, _, Backbone) {
    'use strict';

    var MainRouter = Backbone.Marionette.AppRouter.extend({

        //Definition of the routes
        appRoutes: {
            'setVariables/:id/:login': 'setVariables',

            'accounts/:login': 'accounts',
            'accounts': 'accounts',

            'accountDetails/:number': 'accountDetails',
            'accountDetails': 'accountDetails',

            'transfer/:login': 'transfer',
            'transfer': 'transfer',

            '*page'   : 'index'
        },

        routes: {
            'router/backbone': 'myFunction'
        },

        myFunction: function() {
            console.log('hello');
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

    return MainRouter;
});