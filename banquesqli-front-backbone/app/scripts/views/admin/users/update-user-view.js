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

    var UpdateUserView = Backbone.Marionette.ItemView.extend({

        tagName: 'form',

        className: 'form-horizontal',

        attributes: {
            'data-validate' : 'parsley'
        },

        template: 'update-user',

        events: {
            'click .btn-primary': 'formSubmitted',
            'click .backToPrevious': 'backToPrevious'
        },
        
        onRender: function() {

            var $form = this.$el;

            var user = this.model;

            $form.find('#inputLogin').val(user.getLogin());
            $form.find('#inputFirstName').val(user.getFirstName());
            $form.find('#inputLastName').val(user.getLastName());

            if(user.isAdmin()){

                $form.find('#inputAdmin').attr('checked', 'checked');
            }

        },

        formSubmitted: function(e) {

            e.preventDefault();

            var $form = this.$el;

            // Form validation
            $form.parsley();

            var isFormValid = $form.parsley('validate');

            if(isFormValid) {

                var firstName = $form.find('#inputFirstName').val();
                var lastName = $form.find('#inputLastName').val();
                var password = $form.find('#inputPassword').val();

                var $adminInput = $form.find('#inputAdmin');
                var admin = $adminInput.is(':checked');

                var user = this.model;

                user.set({
                    firstName: firstName,
                    lastName: lastName,
                    admin: admin,
                    password: password
                }).save({token: sessionStorage.getItem('token')});

                Backbone.history.navigate('admin', true);

            } else {

                bootbox.alert('Veuillez remplir tous les champs');
            }

        },


        goBackToPrevious: function(e) {

            e.preventDefault();

            Backbone.history.navigate('router', true);

        }

    });

    return UpdateUserView;
});