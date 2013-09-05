/*global client, Backbone*/

gereMe.Collections.ClientesCollection = Backbone.Collection.extend({

    model: gereMe.Models.ClientesModel,
    url: serverURL + '/clientes'

});
