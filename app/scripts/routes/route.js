/*global gereMe, Backbone*/

gereMe.Routers.RouteRouter = Backbone.Router.extend({

	routes: {
		'' : 'index',
		'painel' : 'painel',
		'despesas' : 'despesas',
		'clientes' : 'clientes',
		'servicos' : 'servicos'
	},

	initialize: function() {
		console.log('router initted');
		new gereMe.Views.ClientesView();
		new gereMe.Views.DespesasView();
		new gereMe.Views.PainelView();
		new gereMe.Views.ServicosView();
	},

	index: function() {
		this.navigate('painel', {trigger:true});
	},

	painel: function() {

	}




});
