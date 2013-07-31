require.config({
  paths: {
    requirejs: "lib/require/require",
    gk: "lib/gk/jquery.gk-0.5",
    jquery: "lib/jquery/jquery-1.9.1.min",
    jqueryqrcode: "lib/jqueryqrcode/jquery.qrcode",
    qrcodejs: "lib/jqueryqrcode/qrcode",
    dragendjs: 'lib/dragend/jquery.dragend-0.1.3.min',
    hammer: 'lib/hammer/jquery.hammer-1.0.5.min',
    ratyjs: 'lib/jqueryraty/jquery.raty.min',
    raphael: 'lib/raphael/raphael',
    jqgrid_core: 'lib/jqgrid/jqgrid-4.5.2/js/jquery.jqGrid.min',
    jqgrid_i18n_tw: 'lib/jqgrid/jqgrid-4.5.2/js/i18n/grid.locale-tw',
    blockUI: 'lib/blockUI/jquery.blockUI.min',
    modernizr: 'lib/modernizr/modernizr.custom.min',
    mobipickjs: 'lib/mobipick/mobipick',
    xdate: 'lib/xdate/xdate',
    xdate_i18n: 'lib/xdate/xdate.i18n',
    'g.raphael': 'lib/raphael/g.raphael',
    'g.pie': 'lib/raphael/g.pie',
    'g.line': 'lib/raphael/g.line',
    'g.bar': 'lib/raphael/g.bar',
    page: "com/page",
    qrcode: "com/qrcode",
    dragend: "com/dragend",
    raty: "com/raty"
  },
  shim: {
    gk: {deps: ["requirejs"]},
    jquery: {deps: ["requirejs"]},
    qrcodejs: {deps: ['jqueryqrcode']},
    dragendjs: {deps: ['hammer']},
    jqgrid_i18n_tw: {deps: ['jqgrid_core']},
    'mobipickjs': {deps: ['xdate_i18n']},
    'xdate_i18n': {deps: ['xdate']},
    'xdate': {deps: ['modernizr']},
    'g.raphael': {deps: ['raphael']},
    'g.bar': {deps: ['g.raphael']}
  }
});

require(['gk','jquery','qrcode','dragend'], function () {
  var list = arguments;
  $(document).ready(function () {
    $.gk.init(list);
  });
});