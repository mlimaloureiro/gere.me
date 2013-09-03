/*global gereMe, Backbone, JST*/

gereMe.Views.InsercaorapidaView = Backbone.View.extend({

    template: JST['app/scripts/templates/insercaorapida.ejs'],

    /*global gereMe, Backbone, JST*/
    events: { },
    el: '#insercaorapida-box',
    
    initialize: function() {
        console.log("[InsercaorapidaView] Created.");
        // get recente
        this.render();
        this.initHook();
    },

    render: function() {
    	$('#insercaorapida-box').html(this.template());
    },

    initHook: function() {
    	$(".chosen-select").chosen(); 
		$('#chosen-multiple-style').on('click', function(e){
			var target = $(e.target);
			var which = parseInt($.trim(target.text()));
			if(which == 2) $('#form-field-select-4').addClass('tag-input-style');
			 else $('#form-field-select-4').removeClass('tag-input-style');
		});
	
		$('#recorrente-check').on('click', function(e) {
			var that = $(this);
			if (that.is (':checked')) {
				$('.recorrente-form').show();
			} else {
				$('.recorrente-form').hide();
			}
		});

		$('[data-rel="tooltip"]').tooltip({placement: this.tooltip_placement});
    },

    tooltip_placement: function(context,source) {
    	var $source = $(source);
		var $parent = $source.closest('table')
		var off1 = $parent.offset();
		var w1 = $parent.width();

		var off2 = $source.offset();
		var w2 = $source.width();

		if( parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2) ) return 'right';
		return 'left';
    }
});

