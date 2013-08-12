requirejs.config({
	context: 'gk',
	paths: {
		'jquery': 'lib/jquery/jquery-1.10.1',
		'bootstrap': 'lib/bootstrap/js/bootstrap.min'
	},
	shim: {
		'bootstrap': {
			deps: ['jquery']
		}
	}
});

// define module (component)
define(
	'modal-footer', ['bootstrap'],
	function() {
		return {
			template: "<div id='{{id}}' class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button><content></content></div>",
			script: function() {
				var $oriEle = this.$originEle;
				var $ele = this.$ele;

				this.init = function() {

				};
			}
		};
	});