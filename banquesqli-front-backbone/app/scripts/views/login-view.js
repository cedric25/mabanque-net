/*global define*/

/**
 * The login view which appears by default when the app is launched
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'marionette',
    'bootstrap',
    'bootbox'

], function ($, _, Backbone) {
    'use strict';

    var LoginView = Backbone.Marionette.ItemView.extend({

        //When the form is submitted, the function loginSubmitted is called
        events: {
            'submit form': 'loginSubmitted'
        },

        //the template used (templates/login.mustache)
        template: 'login',

        //Function called after the user submitted the form
        loginSubmitted: function(e) {

            e.preventDefault();

            //Get values from the form
            var login = this.$el.find('#inputLogin').val();
            var password = this.$el.find('#inputPassword').val();

            //Do an ajax post to the server
            $.ajax({
                url: 'http://localhost:3000/login',
                type: 'POST',
                data: {
                    password: password,
                    login: login
                }

                //get the response
            }).done(function(response){

                //The user exists and can access the app
                if(response.authenticated) {

                    //We set the token as a session variable
                    var token = response.token;
                    sessionStorage.setItem('token', token);

                    //Navigate to the setVariables url to init evrything needed
                    Backbone.history.navigate('setVariables/' + response._id + '/' + response.login, true);

                    //The user made a mistake or does not exist in the DB
                } else {
                    bootbox.alert('Mauvais login et/ou mot de passe');
                }

            });

        }

    });

    return LoginView;
});