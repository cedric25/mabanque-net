define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'models/user-model',
    'marionette',
    'bootstrap',
    'parsley',
    'bootbox'

], function ($, _, Backbone, App, UserModel) {
    'use strict';

    var CreateUserView = Backbone.Marionette.ItemView.extend({

        tagName: 'form',

        className: 'form-horizontal',

        attributes: {
            'data-validate' : 'parsley'
        },

        template: 'create-user',

        events: {
            'click .btn': 'formSubmitted'
        },

        formSubmitted: function(e) {

            e.preventDefault();


            var $form = this.$el;

            // Form validation
            $form.parsley();

            var isFormValid = $form.parsley('validate');

            var login = parseInt($form.find('#inputLogin').val());
            var isLoginUsed = App.usersCollection.isLoginAlreadyUsed(login);

            if(isFormValid && !isLoginUsed) {

                var password = $form.find('#inputPassword').val();
                var firstName = $form.find('#inputFirstName').val();
                var lastName = $form.find('#inputLastName').val();

                var $adminInput = $form.find('#inputAdmin');
                var admin = $adminInput.is(':checked');

                var newUser = new UserModel({
                    login: login,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    admin: admin
                });

                newUser.save({token: sessionStorage.getItem('token')});

                App.usersCollection.add(newUser);

                Backbone.history.navigate('admin', true);

            } else if(isLoginUsed) {

                bootbox.alert('Ce login est déjà utilisé, veuillez en choisir un autre');

            } else{

                bootbox.alert('Veuillez remplir tous les champs');
            }

        }

    });

    return CreateUserView;
});