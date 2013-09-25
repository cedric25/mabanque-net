/*global define*/

/**
 * View for the header when nobody is logged in
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'bootstrap'

], function ($, _, Backbone) {
    'use strict';

    var HeaderLoginView = Backbone.Marionette.ItemView.extend({

        //Tag in which the template is wrapped
        tagName: 'ul',

        //the class added to this tag
        className: 'nav pull-right',

        //The template to use (templates/header/unlogged.mustache)
        template: 'unlogged'


    });

    return HeaderLoginView;
});