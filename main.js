
require.config({
    baseUrl: 'webcomponent',
    paths: {
        gk:'../lib/gk/jquery.gk-0.5.1',
        jquery:'../lib/jquery/jquery-1.10.1',
        underscore: '../lib/utils/underscore',
        domReady: '../lib/require/domReady',
        jqgrid: 'jqgrid/jqgrid',
        jqcol: 'jqgrid/jqcol',
        jqcolend: 'jqgrid/jqcolend'
    },
    shim: {'gk': {deps: ['jquery']} }
});

require(['gk'], function(gk){
    $.gk.createTag(['jqgrid', 'jqcol', 'jqcolend']);
    require(['jqgrid', 'jqcol', 'jqcolend'], function () {
        $.gk.init(arguments);
    });
}) ;

/** fix ie8

require(['gk'], function (gk) {
    $.gk.createTag(['jqgrid', 'jqcol', 'jqcolend']);
    require(['jqgrid', 'jqcol', 'jqcolend'], function () {
        $.gk.init(arguments);
    });
});

 **/
