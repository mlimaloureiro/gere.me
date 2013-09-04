/*global gereMe, $*/

var serverURL = 'http://localhost:8000/api/v1';

window.gereMe = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Starting gere.me!');

        this.receitasList = new gereMe.Collections.ReceitasCollection();
        this.clientesList = new gereMe.Collections.ClientesCollection();
        this.servicosList = new gereMe.Collections.ServicosCollection();
        this.despesasList = new gereMe.Collections.ServicosCollection();

        this.servicosList.fetch();
        this.clientesList.fetch();

    }
};

$(document).ready(function () {
    'use strict';
    gereMe.init();

    new gereMe.Routers.RouteRouter();
    
    Backbone.history.start();
});
