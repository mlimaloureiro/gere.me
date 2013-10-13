/*global client, Backbone*/

gereMe.Collections.DespesasCollection = Backbone.Collection.extend({

    model: gereMe.Models.DespesasModel,
    url:function() {
    	if(gereMe.currentYear != undefined && gereMe.currentMonth != undefined) {
    		return serverURL + '/despesas?' + 'y=' + gereMe.currentYear + '&m=' + gereMe.currentMonth;
    	} else {
    		return serverURL + '/despesas';
    	}
    }
});
