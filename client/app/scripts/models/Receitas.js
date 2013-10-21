/*global client, Backbone*/

gereMe.Models.ReceitasModel = Backbone.Model.extend({

	name: 'receita',
	urlRoot: serverURL + '/receitas',

	url: function() {
		if(this.get('id') != undefined)
			return serverURL + '/receitas/' + this.get('id');
		else
			return serverURL + '/receitas';
	}
	//url: serverURL + '/receitas/'

});



