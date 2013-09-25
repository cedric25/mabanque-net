define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'models/account-model',
    'marionette',
    'bootstrap',
    'parsley',
    'bootbox'

], function ($, _, Backbone, App, AccountModel) {
    'use strict';

    var CreateAccountLayout = Backbone.Marionette.Layout.extend({

        tagName: 'form',

        className: 'form-horizontal',

        attributes: {
            'data-validate' : 'parsley'
        },

        template: 'create-account',

        regions: {
            userSelect: '#userSelect'
        },

        events: {
            'click .btn-primary': 'formSubmitted',
            'click .backToPrevious': 'goBackToPrevious'
        },

        formSubmitted: function(e) {

            e.preventDefault();


            var $form = this.$el;

            // Form validation
            $form.parsley();

            var isFormValid = $form.parsley('validate');

            var number = parseInt($form.find('#inputNumber').val());
            var alreadyUsed = App.adminAccountsCollection.isNumberAlreadyUsed(number);
            

            if(isFormValid && !alreadyUsed) {

                
                var name = $form.find('#inputName').val();
                var ownerLogin = parseInt($form.find('#inputUser').val());
                console.log(ownerLogin, $form.find('#inputUser').val());
                var balance = parseInt($form.find('#inputBalance').val());

                var newAccount = new AccountModel({
                    number: number,
                    name: name,
                    ownerLogin: ownerLogin,
                    balance: balance
                });

                newAccount.save({token: sessionStorage.getItem('token')});

                App.adminAccountsCollection.add(newAccount);

                Backbone.history.navigate('admin', true);

            } else if(alreadyUsed) {

                bootbox.alert('Ce numéro de compte est déjà utilisé, veuillez en choisir un autre');

            } else {

                bootbox.alert('Veuillez remplir tous les champs');
            }

        },

        goBackToPrevious: function(e) {

            e.preventDefault();

            Backbone.history.navigate('admin', true);

        }

    });

    return CreateAccountLayout;
});