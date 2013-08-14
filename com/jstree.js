requirejs.config({
	context: 'gk',
	paths: {
		'jquery': 'lib/jquery/jquery-1.10.1',
		'jquery_jstree': 'lib/jstree/jquery.jstree'
	},
	shim: {
		'jquery_jstree': {
			deps: ['jquery']
		}
	}
});

// define module (component)
define('jstree', ['jquery_jstree'], function() {
	return {
		template: "<div id='{{id}}'><content></content></div>",
		script: function() {
			var $oriEle = this.$originEle;
			var $ele = this.$ele;

			this.init = function() {
				var default_theme = {
					theme: 'default',
					dots: true,
					icons: true
				};

				var theme = $.extend(default_theme, {
					theme: $oriEle.attr('theme'),
					dots: $oriEle.attr('dots') === 'false' ? false : true,
					icons: $oriEle.attr('icons') === 'false' ? false : true
				});

				var plugins = ['themes', 'html_data', 'json_data'];

				if ($oriEle.attr('checkbox') === 'true') {
					plugins.push('checkbox');
				}

				$ele.jstree({
					"core": {
						"initially_open": ['root']
					},
					"plugins": plugins,
					'themes': theme,
				});
			};
		}
	};
});