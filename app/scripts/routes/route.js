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
		
		this.ClientesView = new gereMe.Views.ClientesView();
		this.DespesasView = new gereMe.Views.DespesasView();
		this.PainelView = new gereMe.Views.PainelView();
		this.ServicosView = new gereMe.Views.ServicosView();
		
	},

	index: function() {
		this.navigate('painel', {trigger:true});
	},

	painel: function() {
		this.PainelView.show();
	},

	despesas: function() {
		this.DespesasView.show();
	},

	clientes: function() {
		this.PainelView.show();
	},

	servicos: function() {
		this.ServicosView.show();
	}


});
