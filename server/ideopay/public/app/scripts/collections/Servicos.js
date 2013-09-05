/*global client, Backbone*/

gereMe.Collections.ServicosCollection = Backbone.Collection.extend({

    model: gereMe.Models.ServicosModel,
    url: serverURL + '/servicos'

});
