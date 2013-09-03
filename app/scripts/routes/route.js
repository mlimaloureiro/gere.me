/*global gereMe, Backbone*/

gereMe.Routers.RouteRouter = Backbone.Router.extend({

	routes: {
		'' : 'index',
		'painel' : 'painel',
		'despesas' : 'despesas',
		'receitas' : 'receitas',
		'clientes' : 'clientes',
		'servicos' : 'servicos'
	},

	initialize: function() {
		console.log('router initted');
		
		this.ClientesView = new gereMe.Views.ClientesView();
		this.DespesasView = new gereMe.Views.DespesasView();
		this.ReceitasView = new gereMe.Views.ReceitasView();
		this.PainelView = new gereMe.Views.PainelView();
		this.ServicosView = new gereMe.Views.ServicosView();
		
	},

	index: function() {
		this.navigate('painel', {trigger:true});
	},

	painel: function() {
		this.PainelView.show();
		this.ClientesView.hide();
		this.ServicosView.hide();
		this.DespesasView.hide();
		this.ReceitasView.hide();
	},

	despesas: function() {
		this.PainelView.hide();
		this.ClientesView.hide();
		this.ServicosView.hide();
		this.DespesasView.show();
		this.ReceitasView.hide();
	},

	receitas: function() {
		this.PainelView.hide();
		this.ClientesView.hide();
		this.ServicosView.hide();
		this.DespesasView.hide();
		this.ReceitasView.show();
	},

	clientes: function() {
		this.PainelView.hide();
		this.ClientesView.show();
		this.ServicosView.hide();
		this.DespesasView.hide();
		this.ReceitasView.hide();
	},

	servicos: function() {
		this.PainelView.hide();
		this.ClientesView.hide();
		this.ServicosView.show();
		this.DespesasView.hide();
		this.ReceitasView.hide();
	}


});
