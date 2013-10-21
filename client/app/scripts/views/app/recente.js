/*global gereMe, Backbone, JST*/

gereMe.Views.RecenteView = Backbone.View.extend({

    template: JST['app/scripts/templates/recente.ejs'],
    events: { },
    el: '#recent-box',
    
    initialize: function() {
        console.log("[RecenteView] Created.");
        // get recente

        gereMe.porReceberList.on('reset',this.render, this);
        gereMe.porReceberList.fetch({reset:true});
    },

    render: function() {
        /* criar função para preparar o model */

        gereMe.porReceberList.each(function(r) {
                var servico = [];
                var cliente = [];
                var aux = gereMe.servicosList.findWhere({'id':parseInt(r.get('servico_id'))});
                var aux2 = gereMe.clientesList.findWhere({'id':parseInt(r.get('cliente_id'))});
                servico['titulo'] = aux.get('titulo');
                servico['id'] = aux.get('id');
                cliente['nome'] = aux2.get('nome');
                cliente['id'] = aux2.get('id');
                r.set('servico',servico);
                r.set('cliente',cliente);
            });


    	$('#recent-box').html(this.template({lista: gereMe.porReceberList}));

        this.initHook();
        return this;
    },

    initHook: function() {
    	$('.contas-line').disableSelection();
		$('.contas-line input:checkbox').removeAttr('checked').on('click', function(){

            var $el = $(this).closest('li');
            var objID = $el.attr('data-id');
            var $tableBtn = $('button[data-id="' + objID +'"');
            var model = gereMe.receitasList.get(objID);

			if(this.checked) {
                /* vai procurar o botao na tabela de pago/nao pago */
                var that = this;
                bootbox.dialog({
                    message: '<form class="form-horizonal"><label class="control-label" for="form-field-1">Data de Pagamento</label><div class="controls"><div class="input"><input class="span2 date-picker-boot" value="' + gereMe.currentTimeString + '" data-date-format="yyyy-mm-dd"></div></div></form>',
                    buttons: {
                        
                        danger: {
                            label: "Cancelar",
                            className: "btn-default",
                            callback: function() {
                                console.log($(that).attr('checked',false));
                            }
                        },
                        success: {
                            label: "Confirmar",
                            className: "btn-success",
                            callback: function() {

                                $el.addClass('selected');   
                                $tableBtn.removeClass('btn-danger');
                                $tableBtn.addClass('btn-success');
                                $tableBtn.html('Recebido');

                                model.set('data_pago',$('.date-picker-boot').val());
                                model.set('pago',1);
                                model.save();
                            }
                        },
                    }, 
                });

            } else {

                $el.addClass('selected');   
                $tableBtn.removeClass('btn-danger');
                $tableBtn.addClass('btn-success');
                $tableBtn.html('Recebido');
                console.log($(that).attr('checked',false));

                model.set('data_pago',null);
                model.set('pago',0);
                model.save();

            }
		});

		$('table th input:checkbox').on('click' , function(){
			var that = this;
			$(this).closest('table').find('tr > td:first-child input:checkbox')
			.each(function(){
				this.checked = that.checked;
				$(this).closest('tr').toggleClass('selected');
			});

        
		});
    }


});
