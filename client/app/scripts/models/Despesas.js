/*global client, Backbone*/

gereMe.Models.DespesasModel = Backbone.Model.extend({

	name: 'despesa',
	urlRoot: serverURL + '/despesas',

	url: function() {
		if(this.get('id') != undefined)
			return serverURL + '/despesas/' + this.get('id');
		else
			return serverURL + '/despesas';
	}
});
