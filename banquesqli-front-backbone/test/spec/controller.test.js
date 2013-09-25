/* global define, describe, it, should */
define([
    'jquery',
    'controller',
    'app'

], function ($, Controller, App) {
    'use strict';

    // whatever tests are in here will run as soon as this module is loaded
    describe('Controller', function () {

        beforeEach(function(done) {
            this.controller = new Controller();

            this.server = sinon.fakeServer.create();
            this.server.autoRespond = true;

            var accounts =
                [
                    {
                        "name": "Compte chèque",
                        "number": 1,
                        "ownerLogin": 1234,
                        "__v": 0,
                        "_id": "51dd58bb7a06b27c14000002",
                        "balance": 90
                    },
                    {
                        "name": "Compte épargne",
                        "number": 2,
                        "ownerLogin": 1234,
                        "__v": 0,
                        "_id": "51dd58f28b5e856423000001",
                        "balance": 110
                    }
                ];

            var user = {
                "login": 1234,
                "passwordHash": "231e2e1f839c39f04d1f52ae625a7521dcb7eb42c871dd6a155336c57ef87226",
                "firstName": "Matthis",
                "lastName": "Duclos",
                "__v": 0,
                "_id": "51dd50d99cef86e820000001",
                "salt": "b0b58230-e95a-11e2-9e90-499bbdb71277"
            };

            //Sinon is used to mock
            this.server = sinon.fakeServer.create();
            this.server.respondWith(
                'GET',
                'http://localhost:3000/user/1234/accounts',
                [200, { "Content-Type": "application/json" , "Access-Control-Allow-Origin": "*"}, JSON.stringify(accounts)]
            );
            this.server.respondWith(
                'GET',
                'http://localhost:3000/users/1234',
                [200, { "Content-Type": "application/json" , "Access-Control-Allow-Origin": "*"}, JSON.stringify(user)]
            );

            done();
        });

        afterEach(function(done){

            this.server.restore();

            Backbone.history.navigate('test', true);

            done();
        });


        it('should exist', function() {
            should.exist(Controller);
            should.exist(App);
        });


        describe('Set variables', function() {

            it('should call user and his accounts', function() {

                sinon.spy($, 'ajax');

                this.controller.setVariables(1234);

                var firstCall = jQuery.ajax.getCall(0).args[0];
                var secondCall = jQuery.ajax.getCall(1).args[0];

                firstCall.url.should.equal('http://localhost:3000/users/1234');
                secondCall.url.should.equal('http://localhost:3000/user/1234/accounts');

            });

            it('should get user and his accounts', function() {

                this.controller.setVariables(1234);
                this.server.respond();

                should.exist(App.user);
                should.exist(App.accounts);

                App.user.getFirstName().should.equal('Matthis');
                App.user.getLastName().should.equal('Duclos');

                App.accounts.length.should.equal(2);
                App.accounts.getGlobalBalance().should.equal(200);

            });

            it('should redirect to accounts/1234', function() {

                this.controller.setVariables(1234);
                this.server.respond();

                Backbone.history.getFragment().should.equal('accounts/1234');

            });

        });

        describe('Accounts method', function() {

            beforeEach(function(done) {

                this.controller.setVariables(1234);
                this.server.respond();

                //We are redirected to /accounts/1234 and we get into Controller.accounts function
                
                done();

            });

            afterEach(function(done) {

                done();
            });

            it('should know App.user and accounts', function() {

                should.exist(App.user);
                should.exist(App.accounts);

                App.user.getFirstName().should.equal('Matthis');
                App.accounts.length.should.equal(2);

            });

            it('should show the menu', function() {

                should.exist(App.menu.$el);

            });

            it('should show the header with user lastname and firstname', function() {

                should.exist(App.header.$el);

                App.header.$el.html().should.match(/Matthis/);

            });

        });



    });
});