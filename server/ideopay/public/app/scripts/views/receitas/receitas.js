/*global gereMe, Backbone, JST*/

gereMe.Views.ReceitasView = Backbone.View.extend({

    template: JST['app/scripts/templates/receitas.ejs'],

    loaded: false,
    events: { },

    initialize: function() {
    	console.log("[ReceitasView] Created.");
        _.bindAll(this,'togglePago','criaReceita');
    	if(!this.loaded) {

            gereMe.receitasList.on('reset', this.render, this);
            gereMe.receitasList.on('change', this.render, this);
            gereMe.receitasList.on('add', this.render, this);

            gereMe.servicosList.on('add', this.renderServicos, this);
            gereMe.servicosList.on('remove', this.renderServicos, this);

            gereMe.clientesList.on('add', this.renderClientes, this);
            gereMe.clientesList.on('remove', this.renderClientes, this);

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

        $('#receitas-stats-areceber').html(parseFloat(estatisticas.areceber).toFixed(2) + ' €');
        $('#receitas-stats-porpagar').html(parseFloat(estatisticas.porpagar).toFixed(2) + ' €');
        $('#receitas-stats-pago').html(parseFloat(estatisticas.pago).toFixed(2) + ' €');

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

        /* form */ 
        $('#recorrente-check-box').on('click', function(e) {
            var that = $(this);
            if (that.is (':checked')) {
                $('.limite-form').hide();
                $('.pronto_check').attr('checked', false);
                $('.recorrente-form').show();
            } else {
                $('.recorrente-form').hide();

                $('.limite-form').show();
            }
        });

        $('#receita-inputs').submit(this.criaReceita);

        /* init datepicker */

        $('.date-picker').datepicker();

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

    criaReceita: function(evt) {
        console.log('---------- CRIA RECEITA -----------');
        /* vemos se tem prestacoes ou nao */
        var titulo = $('input[name=titulo]').val();
        var servico_id = $('select[name=servico_id]').val();
        var cliente_id = $('select[name=cliente_id]').val();
        var valor = $('input[name=valor]').val();
        var prestacoes = $('#recorrente-check-box').is(':checked');
        var automatico = $('#automatico-check').is(':checked');
        var pronto_pagamento = $('#pronto-check').is(':checked');
        var data_limite = $('input[name=data_limite]').val();
        var meses = $('select[name=meses]').val();

        /*
        console.log('titulo: ' + titulo);
        console.log('servico: ' + servico_id);
        console.log('cliente: ' + cliente_id);
        console.log('valor: ' + valor);
        console.log('prestacoes: ' + prestacoes);
        console.log('automatico: ' + automatico);
        console.log('pronto_pagamento: ' + pronto_pagamento);
        console.log('data_limite: ' + data_limite);
        console.log('meses: ' + meses);
        */

        

        if(prestacoes) {

            var valorDaPrestacao = valor / meses;

            for(var i = 1; i <= meses; i++) {
                pago = automatico ? 1 : 0; 
                automatico = automatico ? 1 : 0;

                var obj =   {   'user_id':1,
                                'servico_id':servico_id,
                                'cliente_id':cliente_id,
                                'valor': valorDaPrestacao,
                                'titulo': i + 'ª prest. ' + titulo,
                                'prestacoes' : 1,
                                'automatico' : automatico,
                                'mes':i,
                                'pago' : pago   
                            };

                //console.log(obj);

                model = new gereMe.Models.ReceitasModel(obj);
                model.save();
                console.log(model);
                gereMe.receitasList.add(model);
                //gereMe.receitasList.create(obj,{wait:true});
            }

        } else {
            pronto_pagamento = pronto_pagamento ? 1 : 0;
            pago = pronto_pagamento;

            var obj =   {   'user_id':1,
                            'servico_id':servico_id,
                            'cliente_id':cliente_id,
                            'valor': valor,
                            'titulo': titulo,
                            'prestacoes' : 0,
                            'automatico' : automatico,
                            'data_limite' : data_limite,
                            'pronto_pagamento': pronto_pagamento,
                            'pago' : pago   
                        };

            gereMe.receitasList.create(obj,{wait:true});
        }

        

        evt.preventDefault();
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
