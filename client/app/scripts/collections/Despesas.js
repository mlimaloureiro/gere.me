/*global client, Backbone*/

gereMe.Collections.DespesasCollection = Backbone.Collection.extend({

    model: gereMe.Models.DespesasModel,
    url: serverURL + '/despesas'

});
