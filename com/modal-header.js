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
	'modal-header', ['bootstrap'],
	function() {
		return {
			template: "<div id='{{id}}' class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button><content></content></div>",
			script: function() {
				var $oriEle = this.$originEle;
				var $ele = this.$ele;

				this.init = function() {

				};
			}
		};
	});