/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var UserModel = Backbone.Model.extend({

        idAttribute: '_id',

        //Url to communicate with the server
        urlRoot: 'http://localhost:3000/users',

        //Custom getters and setters
        getFirstName: function() {
            return this.get('firstName');
        },

        setFirstName: function(firstName) {
            this.set('firstname', firstName);
        },

        getLastName: function() {
            return this.get('lastName');
        },

        setLastName: function(lastName) {
            this.set('lastName', lastName);
        },

        getFullName: function() {
            return this.getFirstName() + ' ' + this.getLastName();
        },

        getPassword: function() {
            return this.get('password');
        },

        setPassword: function(pass) {
            this.set('password', pass);
        },

        getLogin: function() {
            return this.get('login');
        },

        isAdmin: function() {
            return this.get('admin');
        }

    });

    return UserModel;
});