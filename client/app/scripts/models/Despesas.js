/*global client, Backbone*/

gereMe.Models.DespesasModel = Backbone.Model.extend({

	name: 'despesa',
	urlRoot: serverURL + '/despesas',

	url: function() {
		return serverURL + '/despesas';
	}

});
