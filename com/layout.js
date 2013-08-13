requirejs.config({
	context: 'gk',
	paths: {
		'jquery': 'lib/jquery/jquery-1.10.1',
		'jquery_layout': 'lib/layout/jquery.layout-latest'
	},
	shim: {
		'jquery_layout': {
			deps: ['jquery']
		}
	}
});

// define module (component)
define('layout', ['jquery_layout'], function() {
	return {
		template: "<div id='{{id}}'><content></content></div>",
		script: function() {
			var $oriEle = this.$originEle;
			var $ele = this.$ele;

			this.init = function() {
				var defaults = {
					height: '100%'
				};

				var config = $.extend(defaults, {
					height: $oriEle.attr('height')
				});

				$ele.css(config);

				$ele.layout({
					applyDefaultStyles: true
				});
			};
		}
	};
});