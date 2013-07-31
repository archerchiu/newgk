(function (global) {

  var script = getScript(),
    baseUrl = script.getAttribute('gk-baseUrl') || getScriptFolder(script),
    gkPkg = script.getAttribute('gk-pkg') || 'com',
    gkTags = script.getAttribute('gk-tags'),
    context = 'gk',
    config = {},
    defined;

  function each(ary, func) {
    if (ary) {
      var i;
      for (i = 0; i < ary.length; i += 1) {
        if (ary[i] && func(ary[i], i, ary)) {
          break;
        }
      }
    }
  }

  function getScript() {
    var scriptTags = document.getElementsByTagName('script');
    return scriptTags[scriptTags.length - 1];
  }

  function getScriptFolder(script) {
    return script.src.split('?')[0].split('/').slice(0, -1).join('/');
  }

  function checkUndefined(tags) {
    var undef = false;
    each(tags, function (tag) {
      if (!defined[tag]) {
        undef = true;
        return true;
      }
    });
    return undef;
  }

  function setUpRequire() {
    baseUrl && (config.baseUrl = baseUrl);
    context && (config.context = context);
    requirejs.config(config);
    if (typeof $ !== 'undefined' && $.gk) {
      define('gk', function () {
        return $.gk;
      });
    }
    defined = requirejs.s.contexts[context].defined;
  }

  function setPaths(tags) {
    var prefix = gkPkg ? gkPkg.replace(/\./g, '/') + '/' : '';
    if (prefix) {
      config.paths = config.paths || {};
      config.shim = config.shim || {};
      each(tags, function (tag) {
        config.paths[tag] = prefix + tag;
        config.shim[tag] = {
          deps: ['gk']
        };
      });
    }
  }

  global.registryGK = function (tags, callback) {
    setPaths(tags);
    if (checkUndefined(tags)) {
      requirejs.config(config)(tags, function () {
        if (typeof callback === 'function') {
          callback(arguments);
        }
      });
    } else {
      if (typeof callback === 'function') {
        var modules = [];
        each(tags, function (tag) {
          modules.push(defined[tag]);
        });
        callback(modules);
      }
    }
  };

  setUpRequire();
  if (gkTags) {
    var tags = gkTags.split(/[\s,]+/);
    registryGK(tags, function (components) {
      each(tags, function (val, idx) {
        $.gk.registry(val, components[idx]);
      });
      $.gk.init();
    });
  }

}(this));