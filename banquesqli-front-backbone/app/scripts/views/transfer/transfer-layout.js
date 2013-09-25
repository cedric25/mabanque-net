/*global define*/
/**
 * The layout for a transfer
 * Will have 2 regions that will be 2 AccountsCollectionView ('from' and 'to' accounts)
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'models/account-model',
    'models/operation-model',
    'marionette',
    'bootstrap',
    'parsley',
    'bootbox'

], function ($, _, Backbone, App, AccountModel, OperationModel) {
    'use strict';

    var TransferLayout  = Backbone.Marionette.Layout.extend({

        // The template to use
        template: 'transfer-layout',

        //The regions in which we will put our accountsCollection
        regions: {
            fromAccount: '#selectFromAccount',
            toAccount: '#selectToAccount'
        },

        //When the form is submitted, the function formSubmitted is called
        events: {
            'submit form': 'formSubmitted'
        },

        //Function called when the form is submitted
        formSubmitted: function(e) {
            e.preventDefault();

            //Set a variable $form which contain the jQuery objects found in this $el
            var $form = this.$el.find('form');

            //We use parsley to validate form
            $form.parsley();

            //We checked everything is OK
            var isFormValid = $form.parsley('validate');

            //Get the accounts' numbers selected
            var fromAccountNumber = parseInt(this.$el.find('#fromAccount').val());
            var toAccountNumber = parseInt(this.$el.find('#toAccount').val());

            //Check the user chose 2 different accounts
            var areDifferentAccounts = fromAccountNumber !== toAccountNumber;

            //If it isn't the case, we alert the user and do nothing else, he has to change this
            if(!areDifferentAccounts) {
                bootbox.alert('Vous devez choisir 2 comptes différents');
            }

            //If everything is ok, we do the transfer
            if(isFormValid && areDifferentAccounts) {

                //get values from the form
                var reason = $form.find('#reason').val();
                var amount = parseInt($form.find('#amount').val());

                //Get the corresponding accounts
                var fromAccount = App.accounts.getAccount(fromAccountNumber);
                var toAccount = App.accounts.getAccount(toAccountNumber);

                //Test if we can debit the account
                if(fromAccount.testSolvency(amount)){

                    // Change accounts' balances
                    fromAccount.debitAccount(amount);
                    toAccount.creditAccount(amount);

                    // Add operations and save them
                    this.saveOperation(fromAccountNumber, -amount, reason);
                    this.saveOperation(toAccountNumber, amount, reason);

                    bootbox.alert('Le transfert a bien été effectué');

                    // Redirection
                    var login = fromAccount.getOwnerLogin();
                    Backbone.history.navigate('accounts/' + login, true);

                } else {
                    //Some fields are not valid

                    bootbox.alert('Vous n\'êtes pas autorisés à retirer sur ce compte');
                }

            }
        },

        //Create a new operation and save it on the server
        saveOperation: function(accountNumber, amount, reason) {

            var operation = new OperationModel({
                accountNumber: accountNumber,
                amount: amount,
                reason: reason
            });

            operation.save({token: sessionStorage.getItem('token')});

        }

    });

    return TransferLayout;
});