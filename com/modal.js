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
	'modal', ['bootstrap'],
	function() {
		return {
			template: "<div id='{{id}}' tabindex='-1' class='modal fade'><div class='modal-dialog'><div class='modal-content'><content></content></div></div></div>",
			script: function() {
				var $oriEle = this.$originEle;
				var $ele = this.$ele;

				this.init = function() {

				};
			}
		};
	});