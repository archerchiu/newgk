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
define('layout-north', ['jquery_layout'], function() {
	return {
		template: "<div id='{{id}}' class='ui-layout-north'><content></content></div>",
		script: function() {
			var $oriEle = this.$originEle;
			var $ele = this.$ele;

			this.init = function() {

			};
		}
	};
});