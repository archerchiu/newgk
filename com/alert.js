requirejs.config({
	context: 'gk',
	paths: {
		'jquery': 'lib/jquery/jquery.min',
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
	'alert', ['bootstrap'],
	function() {
		return {
			template: "<div id='{{id}}' class='alert'><a href='#' class='close'>&times;</a><content></content></div>",
			script: function() {
				var $oriEle = this.$originEle;
				var $ele = this.$ele;

				this.init = function() {
					var connotation = $oriEle.attr('connotation') || "";
					if (/^(success|danger|info)$/.test(connotation)) {
						$ele.addClass('alert-'.concat(connotation));
					}

					$ele.hide();

					$ele.find('.close').click(function(event) {
						event.preventDefault();
						$ele.hide();
					});
				};

				this.success = function(msg) {
					show('success', msg);
				};

				this.danger = function(msg) {
					show('danger', msg);
				};

				this.info = function(msg) {
					show('info', msg);
				};

				this.warn = function(msg) {
					show('', msg);
				};

				function show(className, msg) {
					$ele.removeClass('alert-success alert-danger alert-info');
					if (className !== '') {
						$ele.addClass('alert-'.concat(className));
					}

					// 保留「x」按鈕，其他移除
					$ele.contents().filter(function(index) {
						return index !== 0;
					}).remove();

					$ele.append(msg);
					$ele.show();
				}
			}
		};
	});