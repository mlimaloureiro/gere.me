/*global gereMe, Backbone, JST*/

gereMe.Views.PiechartView = Backbone.View.extend({

    template: JST['app/scripts/templates/piechart.ejs'],
    el: '#pie-chart-box',

    initialize: function() {
    	this.render();
    	this.initHook();
    	console.log("[PiecharView] Created.");

    },

    render: function() {
    	$('#pie-chart-box').html(this.template());
    	return this;
    },

    initHook: function() {
    	var placeholder = $('#piechart-placeholder').css({'width':'90%' , 'min-height':'150px'});
		
		var data = [
			{ label: "impressão",  data: 38.7, color: "#68BC31"},
			{ label: "desenvolvimento web",  data: 24.5, color: "#2091CF"},
			{ label: "decoração",  data: 8.2, color: "#AF4E96"},
			{ label: "design",  data: 18.6, color: "#DA5430"},
			{ label: "outros",  data: 10, color: "#FEE074"}
		]

		this.drawPieChart(placeholder, data);
				
		/**
		we saved the drawing function and the data to redraw with different position later when switching to RTL mode dynamically
		so that's not needed actually.
		*/
		placeholder.data('chart', data);
		placeholder.data('draw', this.drawPieChart);

		var $tooltip = $("<div class='tooltip top in hide'><div class='tooltip-inner'></div></div>").appendTo('body');
		var previousPoint = null;
	
		placeholder.on('plothover', function (event, pos, item) {
			if(item) {
				if (previousPoint != item.seriesIndex) {
					previousPoint = item.seriesIndex;
					var tip = item.series['label'] + " : " + item.series['percent']+'%';
					$tooltip.show().children(0).text(tip);
				}
				$tooltip.css({top:pos.pageY + 10, left:pos.pageX + 10});
			} else {
				$tooltip.hide();
				previousPoint = null;
			}
		
	 	});
    },

    drawPieChart: function(placeholder, data, position) {
 		$.plot(placeholder, data, {
			series: {
				pie: {
					show: true,
					tilt:0.8,
					highlight: {
						opacity: 0.25
					},
					stroke: {
						color: '#fff',
						width: 2
					},
					startAngle: 2
				}
			},
			legend: {
				show: true,
				position: position || "ne", 
				labelBoxBorderColor: null,
				margin:[-30,15]
			},
			grid: {
				hoverable: true,
				clickable: true
			}
		});
	}

});
