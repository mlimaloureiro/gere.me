/*global gereMe, Backbone, JST*/

gereMe.Views.ServicosView = Backbone.View.extend({

    template: JST['app/scripts/templates/servicos.ejs'],

    loaded: false,
    events: { },

    initialize: function() {
    	console.log("[ServicosView] Created.");
    	if(!this.loaded) {
    		this.load();
    	}
    },

    render: function() {},

    load: function() {
    	this.loaded = true;
    	console.log('[ServicosView] Loaded.');
    },

    unload: function() {
    	this.loaded = false;
		console.log('[ServicosView] Unloaded.');
    },

    show: function() {

    },

    hide: function() {
    	
    }

});
