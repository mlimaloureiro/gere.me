/*global gereMe, Backbone, JST*/

gereMe.Views.DespesasView = Backbone.View.extend({

    template: JST['app/scripts/templates/despesas.ejs'],

    loaded: false,
    events: { },

    initialize: function() {
        console.log("[DespesasView] Created.");
        _.bindAll(this,'togglePago','criaDespesa','resetTable','hide');
        if(!this.loaded) {

            gereMe.despesasList.on('reset', this.render, this);
            gereMe.despesasList.on('change', this.updateStats, this);
            gereMe.despesasList.on('remove', this.resetTable,this);

            gereMe.despesasList.on('add', this.resetTable, this);

            gereMe.servicosList.on('add', this.renderServicos, this);
            gereMe.servicosList.on('remove', this.renderServicos, this);

        }
    },

    render: function() {
        if(!this.loaded) {
            /* create sub views */

            /* popula elements associados */
            gereMe.despesasList.each(function(r) {
                var servico = [];
                var aux = gereMe.servicosList.findWhere({'id':parseInt(r.get('servico_id'))});
                servico['titulo'] = aux.get('titulo');
                servico['id'] = aux.get('id');
                r.set('servico',servico);


            });

            $('#page').append(this.template({despesas:gereMe.despesasList}));

            this.renderServicos();
            this.updateStats();
            this.loaded = true;

            this.initHook();

            console.log('[DespesasList] Loaded.');
            
        } else {
            this.resetTable();
        }
    
        return this;
    },

    updateStats: function() {
        var estatisticas = this.calculaStats();

        $('#despesas-stats-areceber').html(parseFloat(estatisticas.areceber).toFixed(2) + ' €');
        $('#despesas-stats-porpagar').html(parseFloat(estatisticas.porpagar).toFixed(2) + ' €');
        $('#despesas-stats-pago').html(parseFloat(estatisticas.pago).toFixed(2) + ' €');

        if(!isNaN(estatisticas.percentagempaga)) {
            $('#percentagem-despesas-prog').attr('data-percent', estatisticas.percentagempaga + '% pago');
            $('#percentagem-despesas').css('width', estatisticas.percentagempaga + '%');
        } else { 
            $('#percentagem-despesas-prog').attr('data-percent','0% pago');
            $('#percentagem-despesas').css('width', '0%');
        }
    },

    renderServicos: function() {
        var el = $("#despesas-servicos-select");
        var options = '';
        gereMe.servicosList.each(function(c) {
            options += '<option value="' + c.get('id') + '"> ' + c.get('titulo') + ' </option>';
        });

        el.html(options);

        $(".chosen-select-servicos-desp").chosen(); 
        $('.chosen-container').css('width',300);
    },

    initHook: function() {

        var that = this;
        this.oTable = $('#despesas-table').dataTable( 
                            {
                                "aoColumns": [
                                  { "bSortable": true },
                                   null,null,null, null,
                                  { "bSortable": false }
                                ],
                                fnDrawCallback: function( oSettings ) {
                                    $el = $('.toggle-pago-despesa');

                                    $el.off();
                                    $el.on('click',that.togglePago);

                                    $remEl = $('.remove-despesa');
                                    $remEl.off();
                                    $remEl.on('click',that.removeDespesa);
                                }
                            }
                        );

        $('#despesa-form-inputs').submit(this.criaDespesa);

        /* init datepicker */

        $('.date-picker').datepicker();
        
        $('.toggle-nova-despesa').on('click',function() {
            $('#nova-despesa-form').toggle();
        });
    },

    load: function() {
        //this.receitasList.fetch({reset:true});
    },

    unload: function() {
        this.loaded = false;
        console.log('[DespesasView] Unloaded.');
    },

    show: function() {
        if(!this.loaded) {
            gereMe.despesasList.fetch({reset:true}).then(function() {
                $('#despesas-page-js').show();
            });
        }
        $('#despesas-page-js').show();
    },

    hide: function() {
        $('#despesas-page-js').hide();
    },

    calculaStats: function() {
        var areceber = 0.0;
        var pago = 0.0;
        var porpagar = 0.0;
        var percentagempaga = 0.0;

        gereMe.despesasList.each(function(r) {
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

    criaDespesa: function(evt) {

        evt.preventDefault();

        /* vemos se tem prestacoes ou nao */
        var titulo = $('input[name=titulo]').val();
        var servico_id = $('select[name=servico_id]').val();
        var valor = $('input[name=valor]').val();
        var data_limite = $('input[name=data_limite]').val();

        var obj =   {   'user_id':1,
                        'servico_id':servico_id,
                        'valor': valor,
                        'titulo': titulo,
                        'data_limite' : data_limite,
                        'pago' : 0   
                    };

        model = new gereMe.Models.DespesasModel();
        model.save(obj,{
                success: function(model,response) {
                    
                    model.set('id',response.model.id);
                    model.set('data_limite',response.model.data_limite);

                    /* limpa o os dados recebido do request */
                    model.unset('model');
                    model.unset('error');
                    model.unset('message');

                    gereMe.despesasList.add(model);
                }
            });
        
        $('#nova-despesa-form').hide();
        $('#despesa-form-inputs').each(function() {
            this.reset();
        });
    },

    removeDespesa:function(evt) {
        evt.preventDefault();
        $el = $(evt.target).parent();
        var modelID = $el.attr('data-id');
        var model = gereMe.despesasList.get(modelID);

        //gereMe.despesasList.remove(model);

        model.destroy();

    },

    resetTable:function() {
        console.log('reset table despesas');
        this.oTable.fnClearTable();
        var that = this;
        gereMe.despesasList.each(function(r) {

            var testDate = new Date(r.get('data_limite'));
            if(testDate.getMonth() + 1 == gereMe.currentMonth) {

                td2 = r.get('titulo');
                td3 = parseFloat(r.get('valor')).toFixed(2) + '€' ;
                if(r.get('servico') != undefined)
                    td4 = r.get('servico')['titulo'];
                else
                    td4 = gereMe.servicosList.findWhere({'id':parseInt(r.get('servico_id'))}).get('titulo');

                td5 = r.get('data_limite');

                //console.log('cliente_id = ' + r.get('cliente_id'));
                //console.log(gereMe.clientesList.where({'id':r.get('cliente_id')}));

                if(r.get('pago') == 1)
                    aux = '<button data-id = "' + r.id + '" class="btn btn-minier toggle-pago-despesa btn-success ' + r.get('id') + '_line_buttom">Pago</button>';
                else
                    aux = '<button data-id = "' + r.id + '" class="btn btn-minier toggle-pago-despesa btn-danger ' + r.get('id') + '_line_buttom">Por pagar</button>';

                td6 = aux;
                td7 = '<td><div class="hidden-phone visible-desktop action-buttons"><a class="red remove-despesa" href="#"  data-id = "' + r.id + '"><i class="icon-trash bigger-130"></i></a></div></td>';

                that.oTable.fnAddData([td2,td3,td4,td5,td6,td7]);
            }    
        });
        
        this.updateStats();
    },

    togglePago: function(evt) {
        $el = $(evt.target);
        var modelID = $el.attr('data-id');
        var model = gereMe.despesasList.get(modelID);

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
