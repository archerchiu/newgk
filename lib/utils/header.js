
(function () {
    var css = [
        'lib/jquery-ui/jquery-ui-1.10.2.custom/css/ui-ezo/jquery-ui-1.10.2.custom.min.css',
        'lib/jqgrid/jqgrid-4.5.2/css/ui.jqgrid.css',
        'lib/jqgrid/jqgrid-4.5.2/css/ui.jqgrid.gk.css'
    ] ;
    var scripts = [
        'lib/jquery/jquery-1.10.1.js',
        'lib/utils/gku.js'
    ] ;

    for(var i=0;i<css.length;i++) {
//        document.write('<link type="text/css" rel="stylesheet" href="'+css[i]+'">') ;
    }
    for(var i=0;i<scripts.length;i++) {
        document.write('<script type="text/javascript" src="'+scripts[i]+'"></script>') ;
    }

})() ;
