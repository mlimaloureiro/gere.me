/*global gereMe, Backbone, JST*/

gereMe.Views.DespesasView = Backbone.View.extend({

    template: JST['app/scripts/templates/despesas.ejs'],
    loaded: false,
    events: { },

    initialize: function() {
    	console.log("[DespesasView] Created.");
    	if(!this.loaded) {
    		this.load();
    	}
    },

    render: function() {},

    load: function() {
    	this.loaded = true;
    	console.log('[DespesasView] Loaded.');
    },

    unload: function() {
    	this.loaded = false;
		console.log('[DespesasView] Unloaded.');
    },

    show: function() {

    },

    hide: function() {
    	
    }

});
