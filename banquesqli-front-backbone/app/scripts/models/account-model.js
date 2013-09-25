/*global define*/

define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    'use strict';

    var AccountModel = Backbone.Model.extend({

        //The object's id will be the same as the object server's id (which is _id)
        idAttribute: '_id',

        //Url to communicate with the server
        urlRoot: 'http://localhost:3000/accounts',

        //Default attributes at the creation of the object
        defaults: {
            name: 'Compte chèque',
            balance: 0,
            number: 0
        },

        //Custom getter and setters
        getName: function() {
            return this.get('name');
        },

        setName: function(name) {
            this.set('name', name);
        },

        getBalance: function() {
            return this.get('balance');
        },

        setBalance: function(balance) {
            this.set('balance', balance);
        },

        getId: function() {
            return this.get('_id');
        },

        getNumber: function() {
            return this.get('number');
        },

        getOwnerLogin: function() {
            return this.get('ownerLogin');
        },


        //Custom methods

        //Test if it is possible to debit the account
        testSolvency: function(amount) {

            var balance = this.getBalance();
            return balance >= amount;
        },

        //Add an amount in the account
        creditAccount: function(amount) {

            var previousBalance = this.getBalance();
            var newBalance = previousBalance + amount;

            this.setBalance(newBalance);

            this.save({token: sessionStorage.getItem('token')});

        },

        //withdraw money from the account
        debitAccount: function(amount) {
            var previousBalance = this.getBalance();
            var newBalance = previousBalance - amount;

            this.setBalance(newBalance);

            this.save({token: sessionStorage.getItem('token')});

        }

    });

    return AccountModel;
});