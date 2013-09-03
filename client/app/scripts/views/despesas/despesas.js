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

    render: function() {
        if(!this.loaded) {
            /* create sub views */
            var despesas = [];
            
            for(var i = 0; i <= 2000; i++) {
                despesas.push({'nome': 'logotipo','valor' :'100€','servico':'Design','date' : '31-08-2013', 'estado' : 'Pago'});
            }


            $('#page').append(this.template({despesas: despesas}));
        }

        return this;

    },

    initHook: function() {
        var oTable1 = $('#despesas-table').dataTable( {
                            "aoColumns": [
                              { "bSortable": false },
                              null, null,null, null, null,
                              { "bSortable": false }
                            ] } );
    },

    load: function() {
        this.render();
        this.initHook();
        this.loaded = true;
        console.log('[DespesasView] Loaded.');
    },

    unload: function() {
    	this.loaded = false;
		console.log('[DespesasView] Unloaded.');
    },

    show: function() {
        $('#despesas-page-js').show();
    },

    hide: function() {
        $('#despesas-page-js').hide();
    }

});
