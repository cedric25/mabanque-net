define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'bootstrap',
    'parsley',
    'bootbox'

], function ($, _, Backbone) {
    'use strict';

    var CreateAccountLayout = Backbone.Marionette.Layout.extend({

        tagName: 'form',

        className: 'form-horizontal',

        attributes: {
            'data-validate' : 'parsley'
        },

        template: 'update-account',

        regions: {
            userSelect: '#userSelect'
        },

        events: {
            'click .btn-primary': 'formSubmitted',
            'click .backToPrevious': 'goBackToPrevious'
        },

        onRender: function() {

            var $form = this.$el;

            var account = this.model;

            $form.find('#inputNumber').val(account.getNumber());
            $form.find('#inputName').val(account.getName());
            $form.find('#inputUser').val(String(account.getOwnerLogin()));
            $form.find('#inputBalance').val(account.getBalance());

        },

        formSubmitted: function(e) {

            e.preventDefault();

            var $form = this.$el;

            // Form validation
            $form.parsley();

            var isFormValid = $form.parsley('validate');

            if(isFormValid) {

                var account = this.model;

                var name = $form.find('#inputName').val();
                var ownerLogin = parseInt($form.find('#inputUser').val());
                var balance = parseInt($form.find('#inputBalance').val());

                account.set({
                    name: name,
                    ownerLogin: ownerLogin,
                    balance: balance
                }).save({token: sessionStorage.getItem('token')});

                Backbone.history.navigate('admin', true);

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