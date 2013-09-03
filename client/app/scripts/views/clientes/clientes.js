/*global gereMe, Backbone, JST*/

gereMe.Views.ClientesView = Backbone.View.extend({

    template: JST['app/scripts/templates/clientes.ejs'],
    loaded: false,
    events: { },

    initialize: function() {
    	console.log("[ClientesView] Created.");
    	if(!this.loaded) {
    		this.load();
    	}
    },

    render: function() {},

    load: function() {
    	this.loaded = true;
    	console.log('[ClientesView] Loaded.');
    },

    unload: function() {
    	this.loaded = false;
		console.log('[ClientesView] Unloaded.');
    },

    show: function() {

    },

    hide: function() {
    	
    }

});
