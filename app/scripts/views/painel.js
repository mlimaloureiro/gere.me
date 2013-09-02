/*global gereMe, Backbone, JST*/

gereMe.Views.PainelView = Backbone.View.extend({

    template: JST['app/scripts/templates/painel.ejs'],
    loaded: false,
    events: { },

    initialize: function() {
    	console.log("[PainelView] Created.");
    	if(!this.loaded) {
    		this.load();
    	}
    },

    render: function() {},

    load: function() {
    	this.loaded = true;
    	console.log('[PainelView] Loaded.');
    },

    unload: function() {
    	this.loaded = false;
		console.log('[PainelView] Unloaded.');
    },

    show: function() {

    },

    hide: function() {

    }

});
