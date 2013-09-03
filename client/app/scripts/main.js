/*global gereMe, $*/


window.gereMe = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Starting gere.me!');
    }
};

$(document).ready(function () {
    'use strict';
    gereMe.init();

    new gereMe.Routers.RouteRouter();
    
    Backbone.history.start();
});
