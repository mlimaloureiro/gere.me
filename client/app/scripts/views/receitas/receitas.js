/*global gereMe, Backbone, JST*/

gereMe.Views.ReceitasView = Backbone.View.extend({

    template: JST['app/scripts/templates/receitas.ejs'],

    loaded: false,
    events: { },

    initialize: function() {
    	console.log("[ReceitasView] Created.");
        _.bindAll(this,'togglePago');
    	if(!this.loaded) {

            gereMe.receitasList.on('reset', this.render, this);
            gereMe.receitasList.on('change', this.render, this);
            gereMe.receitasList.on('add', this.render, this);

            gereMe.clientesList.on('add', this.render, this);
            gereMe.servicosList.on('add', this.render, this);
            
            gereMe.servicosList.on('remove', this.render, this);
            gereMe.clientesList.on('remove', this.render, this);

    	}
    },

    render: function() {
        var estatisticas = this.calculaStats();
        if(!this.loaded) {
            /* create sub views */

            $('#page').append(this.template({receitas:gereMe.receitasList}));
            this.loaded = true;
            this.initHook();

            console.log('[ReceitasView] Loaded.');
        } 

        this.renderClientes();
        this.renderServicos();

        $('#receitas-stats-areceber').html(estatisticas.areceber + ' €');
        $('#receitas-stats-porpagar').html(estatisticas.porpagar + ' €');
        $('#receitas-stats-pago').html(estatisticas.pago + ' €');

        $('#percentagem-receitas-prog').attr('data-percent', estatisticas.percentagempaga + '% pago');
        $('#percentagem-receitas').css('width', estatisticas.percentagempaga + '%');
    
        return this;
    },

    renderClientes: function() {
        var el = $("#receitas-clientes-select");
        var options = '';
        gereMe.clientesList.each(function(c) {
            options += '<option value="' + c.get('id') + '"> ' + c.get('nome') + ' </option>';
        });

        el.html(options);
    },

    renderServicos: function() {
        var el = $("#receitas-servicos-select");
        var options = '';
        gereMe.servicosList.each(function(c) {
            options += '<option value="' + c.get('id') + '"> ' + c.get('titulo') + ' </option>';
        });

        el.html(options);
    },

    initHook: function() {

        var oTable1 = $('#receitas-table').dataTable( {
                            "aoColumns": [
                              { "bSortable": false },
                              null, null,null,null, null, null,
                              { "bSortable": false }
                            ] } );

    
        $('#recorrente-check-box').on('click', function(e) {
            var that = $(this);
            if (that.is (':checked')) {
                $('.recorrente-form').show();
            } else {
                $('.recorrente-form').hide();
            }
        });

        // dinam add row on table
        //oTable1.fnAddData(['ola','ola','ola','ola','ola','ola','ola']);

        $('.toggle-pago').on('click',this.togglePago);
    },

    load: function() {
        //this.receitasList.fetch({reset:true});
    },

    unload: function() {
    	this.loaded = false;
		console.log('[ReceitasView] Unloaded.');
    },

    show: function() {
        if(!this.loaded) {
            gereMe.receitasList.fetch({reset:true}).then(function() {
                $('#receitas-page-js').show();
            });
        }
        $('#receitas-page-js').show();
    },

    hide: function() {
    	$('#receitas-page-js').hide();
    },

    calculaStats: function() {
        var areceber = 0.0;
        var pago = 0.0;
        var porpagar = 0.0;
        var percentagempaga = 0.0;

        gereMe.receitasList.each(function(r) {
            if(r.get('pago') == 1) {
                pago += parseFloat(r.get('valor'));
            } else {
                porpagar += parseFloat(r.get('valor'));
            }
            areceber += parseFloat(r.get('valor'));
        });

        percentagempaga = Math.round(pago / areceber * 100);

        return {'areceber' : areceber, 'pago': pago, 'porpagar': porpagar, 'percentagempaga': percentagempaga};

    },

    togglePago: function(evt) {

        $el = $(evt.target);
        var modelID = $el.attr('data-id');
        var model = gereMe.receitasList.get(modelID);

        /* se tem classe btn-success e pq foi pago */
        if($el.hasClass('btn-success')) {
            $el.removeClass('btn-success');
            $el.addClass('btn-danger');
            $el.html('Por pagar');
            model.set('pago',0);

        } else {
            $el.removeClass('btn-danger');
            $el.addClass('btn-success');
            $el.html('Pago');
            model.set('pago',1);
        }

        this.render();
    }

});
