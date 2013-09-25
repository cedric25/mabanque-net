/* global define */
define([
    // All your tests go here.
    // Some are commented to have something readable on the interface
    //'spec/app.test',
    'spec/controller.test',
    //'spec/models/user.test',
    //'spec/models/account.test',
    //'spec/models/operation.test',
    'spec/collections/accounts.test'

], function () {
    'use strict';

    window.console = window.console || function() {}; // protect from barfs
    window.notrack = true; // don't track
    console.log(window.mochaPhantomJS);
    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { mocha.run(); }
});