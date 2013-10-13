/*global gereMe, Backbone, JST*/

gereMe.Views.ReceitasView = Backbone.View.extend({

    template: JST['app/scripts/templates/receitas.ejs'],

    loaded: false,
    events: { },

    initialize: function() {
    	console.log("[ReceitasView] Created.");
        _.bindAll(this,'togglePago','criaReceita','resetTable','hide');
    	if(!this.loaded) {

            gereMe.receitasList.on('reset', this.render, this);
            gereMe.receitasList.on('change', this.updateStats, this);
            gereMe.receitasList.on('add', this.resetTable, this);
            gereMe.receitasList.on('remove', this.resetTable,this);


            gereMe.servicosList.on('add', this.renderServicos, this);
            gereMe.servicosList.on('remove', this.renderServicos, this);

            gereMe.clientesList.on('add', this.renderClientes, this);
            gereMe.clientesList.on('remove', this.renderClientes, this);

    	}
    },

    render: function() {
        if(!this.loaded) {
            /* create sub views */

            /* popula elements associados */
            gereMe.receitasList.each(function(r) {
                var servico = [];
                var cliente = [];
                var aux = gereMe.servicosList.findWhere({'id':parseInt(r.get('servico_id'))});
                var aux2 = gereMe.clientesList.findWhere({'id':parseInt(r.get('cliente_id'))})
                servico['titulo'] = aux.get('titulo');
                servico['id'] = aux.get('id');
                cliente['nome'] = aux2.get('nome');
                cliente['id'] = aux2.get('id');
                r.set('servico',servico);
                r.set('cliente',cliente);
            });

            $('#page').append(this.template({receitas:gereMe.receitasList}));

            this.renderClientes();
            this.renderServicos();
            this.updateStats();
            this.loaded = true;

            this.initHook();

            console.log('[ReceitasView] Loaded.');
            
        } else {
            this.resetTable();
        }
    
        return this;
    },

    updateStats: function() {
        var estatisticas = this.calculaStats();
        console.log(estatisticas);

        $('#receitas-stats-areceber').html(parseFloat(estatisticas.areceber).toFixed(2) + ' €');
        $('#receitas-stats-porpagar').html(parseFloat(estatisticas.porpagar).toFixed(2) + ' €');
        $('#receitas-stats-pago').html(parseFloat(estatisticas.pago).toFixed(2) + ' €');

        if(!isNaN(estatisticas.percentagempaga)) {
            console.log('actualiza percentagem paga com ' + estatisticas.percentagempaga);
            $('#percentagem-receitas-prog').attr('data-percent', estatisticas.percentagempaga + '% pago');
            $('#percentagem-receitas').css('width', estatisticas.percentagempaga + '%');
        } else { 
            $('#percentagem-receitas-prog').attr('data-percent','0% pago');
            $('#percentagem-receitas').css('width', '0%');
        }
    },

    renderClientes: function() {
        var el = $("#receitas-clientes-select");
        var options = '';
        gereMe.clientesList.each(function(c) {
            options += '<option value="' + c.get('id') + '"> ' + c.get('nome') + ' </option>';
        });

        options += '<optgroup label="----------"></optgroup><option value="create"> Criar novo cliente </option>';

        el.off();
        el.on('change', function(evt) {
            if(el.val() == 'create') {
                $('#newclient-name-form').show();
            } else {
                $('#newclient-name-form').hide();
                $('#newclient-name-form').val('');
            }
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

        var that = this;
        this.oTable = $('#receitas-table').dataTable( 
                            {
                                "aoColumns": [
                                  { "bSortable": true },
                                   null,null,null, null, null,
                                  { "bSortable": false }
                                ],
                                fnDrawCallback: function( oSettings ) {
                                    $el = $('.toggle-pago');

                                    $el.off();
                                    $el.on('click',that.togglePago);

                                    $remEl = $('.remove-receita');
                                    $remEl.off();
                                    $remEl.on('click',that.removeReceita);
                                }
                            }
                        );


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

        //$('.toggle-pago').on('click',this.togglePago);

        

        $('.toggle-nova-receita').on('click',function() {
            $('#nova-receita-form').toggle();
        });
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
        evt.preventDefault();

        /* vemos se tem prestacoes ou nao */
        var titulo = $('input[name=titulo]').val();
        var servico_id = $('select[name=servico_id]').val();
        var cliente_id = $('select[name=cliente_id]').val();
        var newclient_name = $('input[name=cliente_nome]').val();
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

        var models = [];

        // var para contar quantos model saves foram feitos
        // para saber quando devemos fazer resetTables;
        var countPrestacoes = 0;

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
                                'pago' : pago,
                                'newclient_name': newclient_name
                            };

                model = new gereMe.Models.ReceitasModel();
                model.save(obj,{
                    success: function(model,response) {
                        model.set('id',response.model.id);
                        model.set('data_limite',response.model.data_limite);
                        model.set('cliente_id', response.model.cliente_id);

                        if(response.model.data_pago != undefined)
                            model.set('data_pago', response.model.data_pago);

                        /* caso va criar um novo cliente, adiciona-o na collection */
                        if(response.newClient != undefined) {
                            gereMe.clientesList.add({id:response.model.cliente_id,nome:model.get('newclient_name')});
                        }


                        /* limpa o os dados recebido do request */
                        model.unset('model');
                        model.unset('error');
                        model.unset('message');
                        model.unset('prestacoes');
                        model.unset('pronto_pagamento');

                        countPrestacoes++;

                        if(countPrestacoes == meses) {
                            gereMe.receitasList.add(model);
                        } else {
                            gereMe.receitasList.add(model,{silent:true});
                        } 
                    }
                });

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
                            'pago' : pago,
                            'newclient_name': newclient_name
                        };

            model = new gereMe.Models.ReceitasModel();
            model.save(obj,{
                    success: function(model,response) {
                        
                        model.set('id',response.model.id);
                        model.set('data_limite',response.model.data_limite);
                        model.set('cliente_id', response.model.cliente_id);

                        if(response.model.data_pago != undefined)
                            model.set('data_pago', response.model.data_pago);

                        if(response.newClient != undefined) {
                            gereMe.clientesList.add({id:response.model.cliente_id,nome:model.get('newclient_name')});
                        }

                        /* limpa o os dados recebido do request */
                        model.unset('model');
                        model.unset('error');
                        model.unset('message');
                        model.unset('prestacoes');
                        model.unset('pronto_pagamento');


                        gereMe.receitasList.add(model);
                    }
                });
        }

        $('#nova-receita-form').hide();
        $('#receita-inputs').each(function() {
            this.reset();
        });
    },

    removeReceita:function(evt) {
        evt.preventDefault();
        $el = $(evt.target).parent();
        var modelID = $el.attr('data-id');
        var model = gereMe.receitasList.get(modelID);

        //gereMe.despesasList.remove(model);

        model.destroy();

    },

    resetTable:function() {
        console.log('reset table receitas');
        this.oTable.fnClearTable();
        var that = this;
        gereMe.receitasList.each(function(r) {

            testDate = new Date(r.get('data_limite'));

            if(testDate.getMonth() + 1 == gereMe.currentMonth) {
                td2 = r.get('titulo');
                td3 = parseFloat(r.get('valor')).toFixed(2) + '€' ;
                if(r.get('servico') != undefined)
                    td4 = r.get('servico')['titulo'];
                else
                    td4 = gereMe.servicosList.findWhere({'id':parseInt(r.get('servico_id'))}).get('titulo');

                td5 = r.get('data_limite');

                if(r.get('cliente') != undefined)
                    td6 = r.get('cliente')['nome'];
                else
                    td6 = gereMe.clientesList.findWhere({'id':parseInt(r.get('cliente_id'))}).get('nome');

                //console.log('cliente_id = ' + r.get('cliente_id'));
                //console.log(gereMe.clientesList.where({'id':r.get('cliente_id')}));

                if(r.get('pago') == 1)
                    aux = '<button data-id = "' + r.id + '" class="btn btn-minier toggle-pago btn-success ' + r.get('id') + '_line_buttom">Pago</button>';
                else
                    aux = '<button data-id = "' + r.id + '" class="btn btn-minier toggle-pago btn-danger ' + r.get('id') + '_line_buttom">Por pagar</button>';

                td7 = aux;
                td8 = '<td><div class="hidden-phone visible-desktop action-buttons"><a class="red remove-receita" href="#"  data-id = "' + r.id + '"><i class="icon-trash bigger-130"></i></a></div></td>';

                that.oTable.fnAddData([td2,td3,td4,td5,td6,td7,td8]);
            }
        });

        this.updateStats();
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
            model.set('data_pago',null);
            model.set('pago',0);
            
            model.save();

        } else {

            bootbox.dialog({
                message: '<form class="form-horizonal"><label class="control-label" for="form-field-1">Data de Pagamento</label><div class="controls"><div class="input"><input class="span2 date-picker-boot" value="' + gereMe.currentTimeString + '" data-date-format="yyyy-mm-dd"></div></div></form>',
                buttons: {
                    success: {
                        label: "Confirmar",
                        className: "btn-success",
                        callback: function() {
                            $el.removeClass('btn-danger');
                            $el.addClass('btn-success');
                            $el.html('Pago');
                            model.set('data_pago',$('.date-picker-boot').val());
                            model.set('pago',1);

                            model.save();
                        }
                    },
                },
                danger: {
                    label: "Cancelar",
                    className: "btn-danger",
                    callback: function() {
                        ;
                    }
                },
            });

            $('.date-picker-boot').datepicker();
        }
        
    },



});
