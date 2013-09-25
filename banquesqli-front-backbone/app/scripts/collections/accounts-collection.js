/*global define*/

define([
    'underscore',
    'backbone',
    'models/account-model'

], function (_, Backbone, AccountModel) {
    'use strict';

    var AccountsCollection = Backbone.Collection.extend({

        //Set the model used for this collection
        model: AccountModel,

        //default url to get all accounts from the server
        url: 'http://localhost:3000/accounts',

        // Function to set default url (get all accounts)
        all: function() {

            this.url = 'http://localhost:3000/accounts';
            return this;

        },

        // function to get all account for a defined user
        user: function(login) {

            this.url = 'http://localhost:3000/accounts/user/' + login;
            return this;

        },

        // Get the balance of all accounts together
        getGlobalBalance: function() {

            var total = 0;
            //Iterate over all models in the collection
            this.each(function(account){

                total += account.getBalance();
            });

            return total;
        },

        // Get a specific account from this collection
        getAccount: function(number) {

            //force number to be an integer because it can be a string sometime
            var num = parseInt(number);

            return this.findWhere({number: num});

        },

        // Get all accounts owned by a specific user
        getUserAccounts: function(ownerLogin) {

            //To be sure that login is a number
            var login = parseInt(ownerLogin);

            // -.where function from underscore
            return this.where({ownerLogin: login});

        },

        // Get a boolean to know if an account number is already in use
        isNumberAlreadyUsed: function(number) {

            // We may already have 1 account maximum that has this number
            var account = this.getAccount(number);

            return account ? true : false;

        }


    });

    return AccountsCollection;
});