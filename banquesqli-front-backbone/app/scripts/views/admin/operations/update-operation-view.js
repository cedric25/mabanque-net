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

        template: 'update-operation',

        events: {
            'click .btn-primary': 'formSubmitted',
            'click .backToPrevious': 'goBackToPrevious'
        },

        onRender: function() {

            var $form = this.$el;

            var operation = this.model;

            $form.find('#inputReason').val(operation.getReason());
            $form.find('#inputAmount').val(operation.getAmount());
            $form.find('#inputAccountNumber').val(operation.getAccountNumber());

        },

        formSubmitted: function(e) {

            e.preventDefault();

            var $form = this.$el;

            // Form validation
            $form.parsley();

            var isFormValid = $form.parsley('validate');

            if(isFormValid) {

                var operation = this.model;

                var reason = $form.find('#inputReason').val();

                operation.set({
                    reason: reason
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