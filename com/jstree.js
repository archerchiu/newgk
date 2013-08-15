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
			var $oriEle = this.$originEle,
					$ele = this.$ele,
					_tempXmlDoc;

			var createNode = function(doc, parentId, nodeName, nodeId) {
				var item = document.createElement("item"),
						content = document.createElement("content"),
						nameNode = document.createElement("name");

				nameNode.textContent = nodeName;
				content.appendChild(nameNode);
				item.appendChild(content);
				item.setAttribute('id', nodeId);
				item.setAttribute('parent_id', parentId);
				doc.documentElement.appendChild(item);
				return doc;
			};

			// deepTracing is boolean, true means deepTracing, not beginning.
			var _xmlAdapter = function(content, deepTracing, parentId) {
				if (!deepTracing) {
					_tempXmlDoc = $.parseXML("<root/>");
				}
				$(content).each(function() {
					_tempXmlDoc = createNode(_tempXmlDoc, parentId, $(this).context.tagName, $(this).context.id);

					if ($(this).context.innerHTML.trim() !== '') {
						_xmlAdapter($(this).context.innerHTML, true, $(this).context.id);
					}
				});
			};

			this.init = function() {
				var classic_theme = {
					theme: 'classic',
					dots: true,
					icons: true
				};

				var theme = $.extend(classic_theme, {
					theme: $oriEle.attr('theme'),
					dots: $oriEle.attr('dots') === 'false' ? false : true,
					icons: $oriEle.attr('icons') === 'false' ? false : true
				});

				var content = $oriEle.html().trim();

				var plugins = ['themes', 'html_data', 'json_data', 'xml_data'];

				if ($oriEle.attr('checkbox') === 'true') {
					plugins.push('checkbox');
				}

				// xml data perform
				if (content.match(/^\<ul\>/) === null) {
					// transfer xml to _tempXmlDoc variable
					// todo: maybe has better way ...
					_xmlAdapter(content, false);
					var xmlData = (new XMLSerializer()).serializeToString(_tempXmlDoc),
							xmlStr = xmlData.split(' xmlns="http://www.w3.org/1999/xhtml"').join('');

					$ele.jstree({
						"xml_data" : {
							"data" : xmlStr
						},
						"plugins" : ["themes","xml_data"],
						"themes" : {"theme":"classic"}
					});
				} else {
					$ele.jstree({
						"core" : {
							"initially_open" : ['root']
						},
						"plugins" : plugins,
						"themes" : theme
					});
				}

			};
		}
	};
});