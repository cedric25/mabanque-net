/*global require*/
'use strict';

/**
 * Main file of the app
 */

require([
    'backbone',
    'mustache',
    'routers/main-router',
    'app',
    'controllers/main-controller',
    'views/header/header-layout',
    'views/header/header-login-view',
    'views/login-view',
    'marionette',
    'bootstrap',
    'templates'

], function (Backbone, Mustache,
             MainRouter, App, MainController,
             HeaderLayout, HeaderLoginView, LoginView) {

    // In order to force navigation between Backbone routes when there is click on links with # refs
    //See http://stackoverflow.com/questions/12081894/backbone-router-navigate-and-anchor-href for explanations
    $(document).on('click', 'a:not([data-bypass])', function(evt) {
        var href = { prop: $(this).prop('href'), attr: $(this).attr("href") };
        var root = location.protocol + '//' + location.host + App.root;

        if (href.prop && href.prop.slice(0, root.length) === root) {
            evt.preventDefault();
            Backbone.history.navigate(href.attr, true);
        }
    });

    // Add a transition effect between views
    //It could have been done for every regions separately for different effects
    Marionette.Region.prototype.open = function(view){
        this.$el.hide();
        this.$el.html(view.el);
        this.$el.slideDown('slow');
    };

    // Set mustache as rendering engine
    Backbone.Marionette.Renderer.render = function(template, data){
        //Use JST
        if (!JST[template]) throw "Template '" + template + "' not found!";
        return Mustache.render(JST[template],data);
    };


    // Set views by default
    App.headerLayout = new HeaderLayout();
    App.header.show(App.headerLayout);
    App.headerLayout.content.show(new HeaderLoginView());
    App.content.show(new LoginView());

    var mainController = new MainController();

    //Start the router and the history (keep this order)
    //We associate the controller with the AppRouter
    App.mainRouter = new MainRouter({controller: mainController});

    Backbone.history.start({pushState: true, urlRoot: '/'});



});