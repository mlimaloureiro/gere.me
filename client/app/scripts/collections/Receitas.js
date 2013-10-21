/*global client, Backbone*/

gereMe.Collections.ReceitasCollection = Backbone.Collection.extend({

    model: gereMe.Models.ReceitasModel,
    
    url:function() {
    	if(gereMe.currentYear != undefined && gereMe.currentMonth != undefined) {
    		return serverURL + '/receitas?' + 'y=' + gereMe.currentYear + '&m=' + gereMe.currentMonth;
    	} else {
    		return serverURL + '/receitas';
    	}
    }

});

gereMe.Collections.PorReceberCollection = Backbone.Collection.extend({

    model: gereMe.Models.ReceitasModel,

    url:function() {
    	return serverURL + '/receitas?pp=1';
    }

});
