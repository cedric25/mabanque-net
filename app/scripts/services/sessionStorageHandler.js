'use strict';

angular.module('banquesqliAngular01App')

	.factory('SessionStorageHandler', function() {

		return {

			isSet: function (propertyName) {
				if (sessionStorage.getItem(propertyName) !== 'undefined') {
					return true;
				}
				return false;
			},

			get: function (propertyName) {
				if (this.isSet(propertyName)) {
					return sessionStorage.getItem(propertyName);
				}
				return null;
			},

			set: function (propertyName, value) {
				sessionStorage.setItem(propertyName, value);
			}

		};

	});