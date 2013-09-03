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

    render: function() {
        if(!this.loaded) {
            /* create sub views */
            var receitas = [];
            for(var i = 0; i <= 1000; i++) {
                receitas.push({'nome': 'logotipo','valor' :'100€','servico':'Design','date' : '31-08-2013', 'estado' : 'Pago'});
            }

            /*var receitas = [
                {'nome': 'logotipo','valor' :'100€','servico':'Design','date' : '31-08-2013', 'estado' : 'Pago'},
                {'nome': 'cenas','valor' :'102€','servico':'Web','date' : '02-08-2013', 'estado' : 'Pago'},
                {'nome': 'logotipo','valor' :'100€','servico':'Design','date' : '31-08-2013', 'estado' : 'Pago'},
            ];
            */

            $('#page').append(this.template({receitas: receitas}));
        }

        return this;
    },

    initHook: function() {
        var oTable1 = $('#receitas-table').dataTable( {
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
    	console.log('[ReceitasView] Loaded.');
    },

    unload: function() {
    	this.loaded = false;
		console.log('[ReceitasView] Unloaded.');
    },

    show: function() {
        $('#receitas-page-js').show();
    },

    hide: function() {
    	$('#receitas-page-js').hide();
    }

});
