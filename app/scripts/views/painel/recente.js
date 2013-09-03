/*global gereMe, Backbone, JST*/

gereMe.Views.RecenteView = Backbone.View.extend({

    template: JST['app/scripts/templates/recente.ejs'],
    events: { },
    el: '#recent-box',
    
    initialize: function() {
        console.log("[RecenteView] Created.");
        // get recente
        this.render();
        this.initHook();
    },

    render: function() {
    	$('#recent-box').html(this.template());
    },

    initHook: function() {
    	$('.contas-line').disableSelection();
		$('.contas-line input:checkbox').removeAttr('checked').on('click', function(){
			if(this.checked) $(this).closest('li').addClass('selected');
			else $(this).closest('li').removeClass('selected');
		});

		$('table th input:checkbox').on('click' , function(){
			var that = this;
			$(this).closest('table').find('tr > td:first-child input:checkbox')
			.each(function(){
				this.checked = that.checked;
				$(this).closest('tr').toggleClass('selected');
			});
				
		});
    }


});
