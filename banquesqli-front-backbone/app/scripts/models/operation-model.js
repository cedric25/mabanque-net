/*global define*/

define([
    'underscore',
    'backbone'

], function (_, Backbone) {
    'use strict';

    var OperationModel = Backbone.Model.extend({

        //The object's id will be the same as the object server's id (which is _id)
        idAttribute: '_id',

        //Default attributes at the creation of the object
        defaults: {
            reason: 'Opération bancaire',
            date: new Date(),
            amount: 20
        },

        //Url to communicate with the server
        urlRoot: 'http://localhost:3000/operations',

        //Custom getter and setters

        getId: function() {
            return this.get('_id');
        },

        getReason: function() {
            return this.get('reason');
        },

        setReason: function(reason) {
            this.set('reason', reason);
        },

        getDate: function() {
            return new Date(this.get('date'));
        },

        getStringDate: function() {

            var date = new Date(this.get('date'));
            return date.getDate() + ' - ' + (date.getMonth()+1)+ ' - ' + date.getFullYear();

        },

        getAmount: function() {
            return this.get('amount');
        },

        setAmount: function(amount) {
            this.set('amount', amount);
        },

        getAccountNumber: function() {
            return this.get('accountNumber');
        }

    });

    return OperationModel;
});