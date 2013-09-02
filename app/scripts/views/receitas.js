/*global gereMe, Backbone, JST*/

gereMe.Views.ReceitasView = Backbone.View.extend({

    template: JST['app/scripts/templates/receitas.ejs'],

    loaded: false,
    events: { },

    initialize: function() {
    	console.log("[ReceitasView] Created.");
    	if(!this.loaded) {
    		this.load();
    	}
    },

    render: function() {},

    load: function() {
    	this.loaded = true;
    	console.log('[ReceitasView] Loaded.');
    },

    unload: function() {
    	this.loaded = false;
		console.log('[ReceitasView] Unloaded.');
    },

    show: function() {

    },

    hide: function() {
    	
    }

});
