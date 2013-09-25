/**
 * MainController which is used in every case
 * Manage all the "classic" user part
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'routers/admin-router',
    'controllers/admin-controller',
    'models/account-model',
    'models/operation-model',
    'models/user-model',
    'collections/accounts-collection',
    'collections/operations-collection',
    'views/accounts/accounts-composite-view',
    'views/login-view',
    'views/menu-view',
    'views/details/account-title-view',
    'views/details/account-details-layout',
    'views/details/operations-composite-view',
    'views/transfer/accounts-select-view',
    'views/transfer/transfer-layout',
    'views/header/header-login-view',
    'views/header/header-user-logged-view',
    'marionette'

], function ($, _, Backbone, App,
             AdminRouter, AdminController,
             AccountModel, OperationModel, UserModel, AccountsCollection, OperationsCollection,
             AccountsView, LoginView, MenuView, AccountTileView, AccountDetailsLayout, OperationsView, AccountSelectView,
             TransferLayout, HeaderLoginView, HeaderUserLoggedView) {
    'use strict';

    var MainController = Backbone.Marionette.Controller.extend({

        //Function called just after the login to set global variables that can be called after
        setVariables: function(id, login) {

            //Get the token to be authenticated
            var token = sessionStorage.getItem('token');

            //Set a new user (actually the app's user)
            var user = new UserModel({
                _id: id
            });

            //Instantiates a new AccountsCollection
            //We'll change the url just after to get only the accounts related to the user
            var accounts = new AccountsCollection();

            //After every datas are fetched, we set global variables and show real content
            $.when(user.fetch({ data: $.param({ token: token}) }),
                    accounts.user(login).fetch({ data: $.param({ token: token}) })
            ).done( function() {

                App.user = user;
                App.accounts = accounts;

                    //If the user is an admin, he can access links related to the admin part
                if(App.user.isAdmin()){
                    var adminController = new AdminController();
                    App.adminRouter = new AdminRouter({controller: adminController});
                }

                //We force url to change
                Backbone.history.navigate('accounts/' + login, true);

            });

        },


        //Show all accounts for a user
        accounts: function(login) {

            if(App.user && App.accounts && sessionStorage.getItem('token')) {

                //We create an other headerView and set the model associated with (the user)
                var loggedinLayout = new HeaderUserLoggedView({
                    model: App.user
                });

                //and we show this header instead of the previous one
                App.headerLayout.content.show(loggedinLayout);

                //Initializes the menu
                App.menu.show(new MenuView({
                    model: App.user
                }));

                //Inits the accountsView with the accounts collection fetched before
                var accountsView = new AccountsView({
                    collection: App.accounts
                });

                //Show this view in the content part
                App.content.show(accountsView);

            } else {

                //The user is not logged in
                Backbone.history.navigate('login', true);
            }


        },

        //To show all details
        //Same principles as before, but there is a layout inside content region
        //We put an item view (account) in a first region
        //And all operations in a second one
        accountDetails: function(number){

            if(App.user && App.accounts && sessionStorage.getItem('token')) {

                var token = sessionStorage.getItem('token');

                // Get everything needed for an account
                var account = App.accounts.getAccount(number);

                var operations = new OperationsCollection();
                operations.account(account.getNumber()).fetch({ data: $.param({ token: token}) });

                // Show views
                var accountDetailsLayout = new AccountDetailsLayout();

                App.content.show(accountDetailsLayout);

                var accountTitleView1 = new AccountTileView({
                    model: account
                });
                accountDetailsLayout.title.show(accountTitleView1);

                operations.on('sync', function() {

                    var operationsView = new OperationsView({
                        collection: operations
                    });

                    accountDetailsLayout.operations.show(operationsView);
                });

            } else {

                Backbone.history.navigate('login', true);
            }
        },

        //To allow user to do transfers
        //Same principles as before
        //There is layout with two regions that contains 2 CollectionsView (accounts to be selected)
        transfer: function() {

            if(App.user && App.accounts && sessionStorage.getItem('token')) {

                var transferLayout = new TransferLayout();
                App.content.show(transferLayout);

                var firstSelectView = new AccountSelectView({
                    collection: App.accounts,
                    attributes: {id: 'fromAccount'}
                });
                var secondSelectView = new AccountSelectView({
                    collection: App.accounts,
                    attributes: {id: 'toAccount'}
                });

                transferLayout.fromAccount.show(firstSelectView);

                transferLayout.toAccount.show(secondSelectView);

            } else {

                Backbone.history.navigate('login', true);
            }

        },

        //Default view
        //A default header with static text
        //A login form
        index: function() {

            if(App.menu){

                App.menu.close();
            }

            App.accounts = {};
            App.user = {};

            App.headerLayout.content.show(new HeaderLoginView());
            App.content.close();
            App.content.show(new LoginView());

        }

    });

    return MainController;
});