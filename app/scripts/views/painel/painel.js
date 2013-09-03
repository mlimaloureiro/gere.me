/*global gereMe, Backbone, JST*/

gereMe.Views.PainelView = Backbone.View.extend({

    template: JST['app/scripts/templates/painel.ejs'],
    loaded: false,
    events: { },
    el: '#painel-page-js',
    initialize: function() {
        console.log("[PainelView] Created.");
        if(!this.loaded) {
            this.load();
        }
    },

    render: function() {
    
        $('#page').html(this.template());
        var recente = new gereMe.Views.RecenteView();
        var piechart = new gereMe.Views.PiechartView();
        var insercaorapida = new gereMe.Views.InsercaorapidaView();
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



