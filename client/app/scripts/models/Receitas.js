/*global client, Backbone*/

gereMe.Models.ReceitasModel = Backbone.Model.extend({

	name: 'receita',
	urlRoot: serverURL + '/receitas',

	url: function() {
		return serverURL + '/receitas';
	}
	//url: serverURL + '/receitas/'

});
