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
    template: "<span><span id='{{id}}_label'></span><select id='{{id}}' allowBlank='{{allowBlank}}' class='{{class}}' empty='{{data-placeholder}}' enable='{{enable}}' height='{{height}}' label='{{label}}' labelWidth='{{labelWidth}}' name='{{name}}' style='{{style}}' title='{{title}}' value='{{value}}' visible='{{visible}}' width='{{width}}' multiple='{{multiple}}' gk-onclick='{{onclick}}'><content></content></select></span>",
    script: function() {
      var $ = window.jQuery,
          _id;

      // c is string, not object
      // format is "value1:text1,value2:text2"
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
            content = $ele.gk().$originEle.html(),
            w = $ele.attr('width'),
        	  h = $ele.attr('height'),
            ab = $ele.attr('allowBlank'),
            v = $ele.attr('visible'),
            value = $ele.attr('value'),
            enable = $ele.attr('enable'),
            label = $ele.attr('label'),
            labelWidth = $ele.attr('labelWidth'),
            click = $ele.attr('gk-onclick');
        
        _id = self.id;
        
        // add blank one at first: <option value=""></option>
        $ele.append("<option value=''></option>");
        // set width
        $ele.css('width', typeof w === 'undefined' ? '250px' : w);

        // transfer content to options
        this.addList(content);
        
        // decide class type
        $ele.addClass(ab === 'true' ? 'chzn-select-deselect' : 'chzn-select');
        
        // chosen perform
        if (ab === 'true') {
          $('.chzn-select-deselect').chosen({allow_single_deselect:true});
        } else {
          $('.chzn-select').chosen({});
        }
        // https://github.com/harvesthq/chosen/issues/235
        // For multi selects, most of the height (though not all) is driven by the input field.
        // .chzn-container-multi .chzn-choices .search-field input
        
        // settings on init
        if (typeof h !== 'undefined') {
        	//$('.chzn-container-single .chzn-single').css('height', h).css('line-height', h);
          if (!this.isMultiple()) {
            $ele.next().find('a').css('height', h);
          }
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

        // event handler
        if (typeof click !== 'undefined') {
          $ele.parent().prop('onclick', null);
          $ele.next().find('a').on('click', function() {
            eval(click);
          });
        }

      };
      
      this.add = function(item) {
      	if (typeof item === 'string') {
          if (item === '') return;

          // parse to JSON object
          try {
            this.addList(JSON.parse(item));
          } catch(error) {
            this.addList(_parseContent(item));
          }
      	}
      };
      
      this.addList = function(list) {
      	var options = '';
      	
        if (typeof list === 'string') {
          if (list === '') return;

          // parse to JSON object
          try {
            list = JSON.parse(list);
          } catch(error) {
            list = _parseContent(list);
          }
        }

      	for (var item in list) {
      	  options += "<option value='" + item + "'>" + list[item] + "</option>";
      	}
      	this.$ele.append(options);
      	this.$ele.trigger("liszt:updated");
      };

      this.list = function() {
        var oa = [];
        this.$ele.find('option').each(function() {
          var o = {};
          if (this.value !== '') {
            o['value'] = this.value;
            o['text'] = this.text;
            oa.push(o);
          }
        });
        return oa;
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
        var $ele = this.$ele;

        // getter
        if (arguments.length === 0) {
          if (this.isMultiple()) {
            var oa = [];
            $ele.next().find('.search-choice span').each(function() {
              var o = {};
              o['value'] = $ele.find("option:contains('"+this.textContent+"')").val();
              o['text'] = this.textContent;
              oa.push(o);
            });
            return oa;
          } else {
            var o = {};
            $ele.find('option').each(function() {
              if (this.selected) {
                o['value'] = this.value;
                o['text'] = this.text;
              }
            });
            return o;
          }
        } else {
          // setter
          // 給定一個list所沒有的key值，是保留在原選項，還是回到未選擇狀態
          // 這還牽涉到 single or multiple mode
          $ele.find('option').each(function() {
            if (!this.selected && this.value === key) {
              this.selected = true;
            }
          });
          $ele.trigger("liszt:updated");
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
          if (!this.isMultiple()) {
            this.$ele.next().find('a').css('height', h);
          }
        }
      };

      this.label = function(l) {
        if (arguments.length === 0) {
          return $('#'+_id+'_label').text();
        } else {
          $('#'+_id+'_label').text(l);
        }
      };

    }
  };
});
