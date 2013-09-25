/*global define*/

define([
    'underscore',
    'backbone',
    'models/user-model'

], function (_, Backbone, UserModel) {
    'use strict';

    var UsersCollection = Backbone.Collection.extend({

        //Model used for this collection
        model: UserModel,

        //Default url to call to fetch this collection
        url: 'http://localhost:3000/users',

        parse: function(response) {

            /*if(!response.authenticated) {
                Backbone.history.navigate('login', true);
            }*/

            return response;
        },

        //Get a specific user from this collection
        getUser: function(login) {
            var log = parseInt(login);

            return this.findWhere({login: log});
        },

        //Test if a login number is already used
        isLoginAlreadyUsed: function(login) {

            var user = this.getUser(login);

            return user ? true : false;

        }

    });

    return UsersCollection;
});