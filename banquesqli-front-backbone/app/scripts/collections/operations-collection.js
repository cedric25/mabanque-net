/*global define*/

define([
    'underscore',
    'backbone',
    'models/operation-model'

], function (_, Backbone, OperationModel) {
    'use strict';

    var OperationsCollection = Backbone.Collection.extend({

        // Set the model used for this collection
        model: OperationModel,

        //Set the default url to fetch
        url: 'http://localhost:3000/operations',

        //Set the default url to fetch if necessary and returns the collection
        all: function() {
            this.url = 'http://localhost:3000/operations';
            return this;
        },

        //Set the url to get operations for a specific account
        account: function(number) {

            this.url = 'http://localhost:3000/operations/account/' + number;
            return this;

        },


        //Function to order collection when fetching
        //Here it's ordered by date decreasing
        comparator: function(operation) {
            return -operation.getDate().getTime();
        },

        // Get a specific account in the collection
        getOperation: function(id) {

            // _.findWhere underscore method, returns the first element in the collection that matches to arguments
            return this.findWhere({_id: id});

        }

    });

    return OperationsCollection;
});