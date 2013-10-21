/*global gereMe, Backbone, JST*/

gereMe.Views.PainelView = Backbone.View.extend({

    template: JST['app/scripts/templates/painel.ejs'],
    loaded: false,

    events: { 
        'click .add_nova_receita' : 'toggleForm'
    },

    el: '#painel-page-js',

    initialize: function() {
        console.log("[PainelView] Created.");
        this.el = '#painel-page-js';

        if(!this.loaded) {
            this.load();
        }

    },

    toggleForm: function() {
        console.log('toggling form');
        $('#nova-receita-form').show();
    },

    render: function() {
        if(!this.loaded) {
            $('#page').append(this.template());
            this.insercaorapida = new gereMe.Views.InsercaorapidaView();
        }

        this.delegateEvents();
    },

    load: function() {
        this.render();
        this.loaded = true;
        console.log('[PainelView] Loaded.');
    },

    unload: function() {
        this.loaded = false;
        console.log('[PainelView] Unloaded.');
    },

    show: function() {
        console.log('[PainelView] Show.');
        $('#painel-page-js').show();
    },

    hide: function() {
        $('#painel-page-js').hide();
    }

});



