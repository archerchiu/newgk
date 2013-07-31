// define resources
requirejs.config({
  context: 'gk',
  paths: {
    'chosen.jquery': 'lib/chosen/js/chosen.jquery.min'
  },
  callback: function () {
    function loadCss(url, req) {
      var link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = req.toUrl(url);
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    var req = requirejs.config({
      context: 'gk'
    });
    loadCss('lib/chosen/css/chosen.min.css', req);
    loadCss('lib/chosen/css/style.css', req);
  }
});

//define module (component)
define('chosen', ['chosen.jquery'], function () {
  return {
    template: "<span><span id='{{id}}_label'></span><select id='{{id}}' class='{{class}}' empty='{{data-placeholder}}' enable='{{enable}}' height='{{height}}' label='{{label}}' labelWidth='{{labelWidth}}' name='{{name}}' style='{{style}}' title='{{title}}' value='{{value}}' visible='{{visible}}' width='{{width}}' multiple='{{multiple}}' gk-onclick='{{onclick}}'><content></content></select></span>",
    script: function() {
      var $ = window.jQuery,
          _id;

      var _parseContent = function(c) {
        var rsObj = {};
            options = c.split(',');
        $.each(options, function(k, v) {
          var option = v.split(':');
          // key: option[0], value: option[1]
          rsObj[option[0]] = option[1];
        });
        return rsObj;
      };
      
      this.init = function() {
        var self = this,
            $ele = this.$ele,
            w = $ele.attr('width'),
        	  h = $ele.attr('height'),
            v = $ele.attr('visible'),
            value = $ele.attr('value'),
            enable = $ele.attr('enable'),
            label = $ele.attr('label'),
            labelWidth = $ele.attr('labelWidth');
        
        _id = self.id;
        
        // get the original element
        var $gkComOrigin = $ele.gk().$originEle(),
            content = $gkComOrigin.html();
        
        // add blank one at first: <option value=""></option>
        $ele.append("<option value=''></option>");

        // transfer content to options
        this.addList(content);
        
        $ele.addClass('chzn-select');
        $ele.css('width', typeof w === 'undefined' ? '250px' : w);
        
        // chosen perform
        $('.chzn-select').chosen({});
        // https://github.com/harvesthq/chosen/issues/235
        // For multi selects, most of the height (though not all) is driven by the input field.
        // .chzn-container-multi .chzn-choices .search-field input
        
        // settings on init
        if (typeof h !== 'undefined') {
        	$('.chzn-container-single .chzn-single').css('height', h).css('line-height', h);
        	// $('.chzn-container .chzn-results').css('height', h);
        }
        if (typeof v !== 'undefined' && v === "false") {
          this.visible(false);
        }
        if (typeof value !== 'undefined' && value.trim() !== '') {
          this.valueSelect(value);
        }
        if (typeof enable !== 'undefined') {
          enable === 'false' ? this.disable(true) : this.disable(false);
        }
        if (typeof label !== 'undefined' && label.trim() !== '') {
          var $label = $("#"+_id+"_label");
          $label.text(label.trim());
          $label.css('display', 'inline-block');
          if (typeof labelWidth !== 'undefined') {
            $label.width(labelWidth);
          } else {
            $label.width('90px');
          }
        }
      };
      
      this.add = function(item) {
      	if (typeof item !== 'object') {
      	  item = _parseContent(item);
      	}
        this.addList(item);
      };
      
      this.addList = function(list) {
      	var options = '';
      	
        if (typeof list !== 'object') {
        	 list = _parseContent(list);
        }

      	for (var item in list) {
      	  options += "<option value='" + item + "'>" + list[item] + "</option>";
      	}
      	this.$ele.append(options);
      	this.$ele.trigger("liszt:updated");
      };
      
      this.del = function(key) {
      	if (typeof key === 'string') {
      	  this.$ele.children().remove("option[value='" + key + "']");
      	  this.$ele.children().remove(":contains('" + key + "')");
      	} else if (typeof key === 'object') {
      	  
      	}
      	this.$ele.trigger("liszt:updated");
      };
      
      this.disable = function(disable) {
      	if (typeof disable !== "boolean") {
      	  return;
      	}
      	this.$ele.attr('disabled', disable).trigger("liszt:updated");
      };

      this.select = function(key) {
        if (arguments.length === 0) {
          var s;
          this.$ele.find('option').each(function() {
            if (this.selected) {
              return s = this.value;
            }
          });
          return s;
        } else {
          // 給定一個list所沒有的key值，是保留在原選項，還是回到未選擇狀態
          // 這還牽涉到 single or multiple mode
          this.$ele.find('option').each(function() {
            if (!this.selected && this.value === key) {
              this.selected = true;
            }
          });
          this.$ele.trigger("liszt:updated");
        }
      };

      this.valueSelect = function(value) {
        this.select(this.$ele.find("option:contains('"+value+"')").first().val());
      };
      
      this.clear = function() {
  	    this.$ele.find('option').each(function() {
      	  if (this.selected) {
      		this.selected = false;
      	  }
      	});
      	this.$ele.trigger("liszt:updated");
      };

      this.visible = function(v) {
        if (arguments.length === 0) {
          return this.$ele.parent().is(':visible');
        } else {
          v ? this.$ele.parent().show() : this.$ele.parent().hide();
        }
      };

      this.isMultiple = function() {
        return typeof this.$ele.attr('multiple') !== 'undefined';
      };
      
      this.width = function(w) {
        if (arguments.length === 0) {
          return this.$ele.next().width();
        } else {
    	    this.$ele.next().width(w);
        }
      };
      
      this.height = function(h) {
    	  if (arguments.length === 0) {
          return this.$ele.next().height();
        } else {
          $('.chzn-container-single .chzn-single').css('height', h).css('line-height', h);
        }
      };
    }
  };
});
