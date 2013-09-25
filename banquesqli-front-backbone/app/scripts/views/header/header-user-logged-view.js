/**
 * View to be shown in the 'content' region of the header when a user is logged
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'bootstrap'


], function ($, _, Backbone) {
    'use strict';

    var HeaderUserLoggedView = Backbone.Marionette.ItemView.extend({

        //The template is wrapped into an ul tag
        tagName: 'ul',

        //Set a class to the DOM element generated
        className: 'nav pull-right',

        //template used by this view
        template: 'user-loggedin',

        //When the user click on the element with class logout, the function lougout is called
        events: {
            'click .logout': 'logout'
        },

        //Function to log out
        logout: function() {

            //Do a classical jQuery.ajax request in GET to logout.
            $.ajax({
                url: 'http://localhost:3000/logout',
                type: 'GET'

            }).done(function(){
                //Erase the session token
                sessionStorage.setItem('token', '');

                //Force navigation to the login page
                Backbone.history.navigate('login', true);
            });
        }
    });



    return HeaderUserLoggedView;
});