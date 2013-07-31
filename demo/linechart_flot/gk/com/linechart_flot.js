requirejs.config({
	context : 'gk',
	paths : {
		'flot' : 'lib/flot/jquery.flot.min',
		'flot_axisLabels' : 'lib/flot/jquery.flot.axislabels'
	},
	shim : {
		'flot_axisLabels' : {
			deps : [ 'flot' ]
		}
	}
});

// define module (component)
define(
		'linechart_flot',
		[ 'flot', 'flot_axisLabels' ],
		function() {
			return {
				template : "<div id='{{id}}' width='{{width}}' height='{{height}}' xlabel='{{xlabel}}' ylabel='{{ylabel}}'></div>",
				script : function() {
					var $ele = this.$ele;
					var defaults = {
						series : {
							lines : {
								show : true
							},
							points : {
								show : true
							}
						},
						grid : {
							hoverable : true,
							clickable : true
						},
						xaxis : {
							axisLabel : $ele.attr('xlabel'),
							axisLabelUseCanvas : true
						},
						yaxis : {
							axisLabel : $ele.attr('ylabel'),
							axisLabelUseCanvas : true
						}
					};
					this.init = function() {
						var defaults = {
							width : '500px',
							height : '300px'
						};
						var settings = $.extend(defaults, {
							width : $ele.attr('width'),
							height : $ele.attr('height')
						});
						$ele.css(settings);
					};

					this.render = function(data, inputs) {
						var options = $.extend(defaults, inputs);
						return $ele.plot(data, options);
					};
				}
			};
		});