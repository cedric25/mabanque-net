define([
    // Libraries.
    'jquery',
    'underscore',
    'backbone',
    'marionette'

], function($, _, Backbone) {

    // We use Marionette to instantiate the App
    var App = new Backbone.Marionette.Application();

    //Add a variable to the app that can be used after
    App.root = '/';

    // This App contains 4 regions
    App.addRegions({
        header: '#header',
        menu: '#menu',
        content: '#content',
        footer: '#footer'
    });

    return App;

});
