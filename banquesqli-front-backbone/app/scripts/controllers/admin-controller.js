/**
 * This controller is used for everything related to the admin part
 * It is instantiated only if the user has an admin role
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'models/account-model',
    'models/operation-model',
    'models/user-model',
    'collections/users-collection',
    'collections/accounts-collection',
    'collections/operations-collection',
    'views/admin/admin-layout',
    'views/admin/users/admin-users-composite-view',
    'views/admin/users/create-user-view',
    'views/admin/users/update-user-view',
    'views/admin/accounts/admin-accounts-composite-view',
    'views/admin/accounts/create-account-view',
    'views/admin/accounts/update-account-view',
    'views/admin/accounts/users-select-view',
    'views/admin/operations/admin-operations-composite-view',
    'views/admin/operations/update-operation-view',
    'marionette',
    'bootbox'

], function ($, _, Backbone, App,
             AccountModel, OperationModel, UserModel,
             UsersCollection, AccountsCollection, OperationsCollection,
             AdminLayout,
             UsersView, CreateUserView, UpdateUserView,
             AdminAccountsView, CreateAccountView, UpdateAccountView, UserSelectView,
             AdminOperationsView, UpdateOperationView) {
    'use strict';

    var AdminController = Backbone.Marionette.Controller.extend({

        //Function called just before the admin part is shown
        //It is used to set global variables through the app
        setAdminVariables: function() {

            //Get the token set after the login
            //It has to be passed when fetching
            var token = sessionStorage.getItem('token');

            //Instantiates collection
            App.usersCollection = new UsersCollection();
            App.adminAccountsCollection = new AccountsCollection();
            App.adminOperationsCollection = new OperationsCollection();

            //After all fetches are done, we can show the main admin part
            //Note that we send a param with every request because we need it for authentication
            $.when(
                App.usersCollection.fetch({ data: $.param({ token: token}) }),
                App.adminAccountsCollection.fetch({ data: $.param({ token: token}) }),
                App.adminOperationsCollection.fetch({ data: $.param({ token: token}) })
            ).done( function() {
                Backbone.history.navigate('admin', true);
            });
        },

        //To init all tabs in the admin part
        admin: function() {

            //Create a layout that is going to be populated
            App.adminLayout = new AdminLayout();

            //Put the previous layout in the "content" region of the App
            App.content.show(App.adminLayout);

            //Init tabs contents
            this.initUsersTab();
            this.initAccountsTab();
            this.initOperationsTab();

        },

        //Inits the tab for users
        //By default, it shows all the users
        initUsersTab: function() {

            //Instantiates a new view (list of all users)
            //Set the users collection in the view
            var usersView = new UsersView({
                collection: App.usersCollection
            });

            //Show this view in the region "user" of the admin layout
            App.adminLayout.users.show(usersView);

            // We remove the 'display: block' style attribute
            // Because it doesn't work with Bootstrap tabs
            App.adminLayout.users.$el.removeAttr('style');


        },

        //Inits the tab for accounts
        //Shows all the accounts by default
        //Same way of doing things as previous method
        initAccountsTab: function() {

            var adminAccountsView = new AdminAccountsView({
                collection: App.adminAccountsCollection
            });

            App.adminLayout.accounts.show(adminAccountsView);

            // We remove the 'display: block' style attribute
            // Because it doesn't work with Bootstrap tabs
            App.adminLayout.accounts.$el.removeAttr('style');

        },

        //Inits the tab for operations
        //Shows all the operations by default
        //Same as before
        initOperationsTab: function() {


            var adminOperationsView = new AdminOperationsView({
                collection: App.adminOperationsCollection
            });

            App.adminLayout.operations.show(adminOperationsView);

            // We remove the 'display: block' style attribute
            // Because it doesn't work with Bootstrap tabs
            App.adminLayout.operations.$el.removeAttr('style');

        },

        //Called when the admin wants to create a new user
        createUser: function() {

            //Create a new view (form to create a user)
            var createUserView = new CreateUserView();

            //Show this view in the user region of admin layout
            App.adminLayout.users.show(createUserView);

            // We remove the 'display: block' style attribute
            // Because it doesn't work with Bootstrap tabs
            App.adminLayout.users.$el.removeAttr('style');

        },

        //Called when the admin wants to edit/update a user
        updateUser: function(login) {

            //Get the user that has to be modified
            var user = App.usersCollection.getUser(login);

            //Inits a new view (updateUser view)
            //Put the user in it
            var updateUserView = new UpdateUserView({
                model: user
            });

            //Show this view
            App.adminLayout.users.show(updateUserView);

            // We remove the 'display: block' style attribute
            // Because it doesn't work with Bootstrap tabs
            App.adminLayout.users.$el.removeAttr('style');
        },

        //Called when a user has to be deleted
        deleteUser: function(login) {

            var confirmDelete;

            //Bootbox is a librairy to show alerts or confirms with bootstrap style
            bootbox.confirm('Voulez-vous vraiment supprimer cet utilisateur et tous ses comptes ?', function(result) {
                confirmDelete = result;
            });

            //If the admin confirmed the user has to be deleted
            if(confirmDelete) {

                //Remove user from collection
                var userToRemove = App.usersCollection.getUser(login);
                App.usersCollection.remove(userToRemove);

                //remove accounts associated with this user
                var accountsToRemove = App.adminAccountsCollection.getUserAccounts(login);
                App.adminAccountsCollection.remove(accountsToRemove);

                //Remove user from database (and DB automatically delete accounts associated with)
                var token = sessionStorage.getItem('token');
                userToRemove.destroy({ data: $.param({ token: token}) });

            }

        },


        //The following methods are using the same principles as explained before

        createAccount: function() {

            var createAccountView = new CreateAccountView();

            App.adminLayout.accounts.show(createAccountView);

            // We remove the 'display: block' style attribute
            // Because it doesn't work with Bootstrap tabs
            App.adminLayout.accounts.$el.removeAttr('style');

            var usersSelectView = new UserSelectView({
                collection: App.usersCollection
            });

            createAccountView.userSelect.show(usersSelectView);

        },

        updateAccount: function(number) {

            var account = App.adminAccountsCollection.getAccount(number);
            
            var updateAccountView = new UpdateAccountView({
                model: account
            });

            App.adminLayout.accounts.show(updateAccountView);

            // We remove the 'display: block' style attribute
            // Because it doesn't work with Bootstrap tabs
            App.adminLayout.accounts.$el.removeAttr('style');

            var usersSelectView = new UserSelectView({
                collection: App.usersCollection
            });

            updateAccountView.userSelect.show(usersSelectView);

        },

        deleteAccount: function(number) {

            var confirmDelete = confirm('Voulez-vous vraiment supprimer ce compte ?');

            if(confirmDelete) {

                //remove account from collections
                var accountsToRemove = App.adminAccountsCollection.getAccount(number);
                App.adminAccountsCollection.remove(accountsToRemove);

                //Remove user from database (and DB automatically delete accounts associated with)
                var token = sessionStorage.getItem('token');
                accountsToRemove.destroy({ data: $.param({ token: token}) });

            }

        },

        updateOperation: function(id) {

            var operation = App.adminOperationsCollection.getOperation(id);

            var updateOperationView = new UpdateOperationView({
                model: operation
            });

            App.adminLayout.operations.show(updateOperationView);

            // We remove the 'display: block' style attribute
            // Because it doesn't work with Bootstrap tabs
            App.adminLayout.operations.$el.removeAttr('style');

        }

    });

    return AdminController;
});