/*global client, Backbone*/

gereMe.Collections.ReceitasCollection = Backbone.Collection.extend({

    model: gereMe.Models.ReceitasModel,
    url: serverURL + '/receitas'

});
