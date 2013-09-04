/*global client, Backbone*/

gereMe.Models.ClientesModel = Backbone.Model.extend({

	name: 'cliente',
	urlRoot: serverURL + '/clientes/'

});
