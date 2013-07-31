(function () {
    var css = [
        'lib/jquery-ui/jquery-ui-1.10.2.custom/css/ui-ezo/jquery-ui-1.10.2.custom.min.css',
        'lib/jqgrid/jqgrid-4.5.2/css/ui.jqgrid.css',
        'lib/jqgrid/jqgrid-4.5.2/css/ui.jqgrid.gk.css'
    ];
    $.each(css, function () {
        gku.loadcss(this);
    })

})();


require.config({
    baseUrl: 'webcomponent',
    paths: {
        'jqgrid_core': '../lib/jqgrid/jqgrid-4.5.2/js/jquery.jqGrid.min',
        'jqgrid_i18n_tw': '../lib/jqgrid/jqgrid-4.5.2/js/i18n/grid.locale-tw',
        'blockUI': '../lib/blockUI/jquery.blockUI.min'
    },
    shim: {
        'jqgrid_i18n_tw': {
            deps: ['jqgrid_core']
        }
    }
});


define(['gk', 'jqgrid_i18n_tw', 'blockUI'], function (gk) {
    'use strict';

    function mergeAttrib($origComponent, custsetting, attrib) {
        var cfgname = ATTRIB_MAPPING[attrib.nodeName];
        if ($.isFunction(cfgname)) {
            cfgname.call(ATTRIB_MAPPING, custsetting, $origComponent, attrib);
        } else if (cfgname) {
            custsetting[cfgname] = attrib.nodeValue;
        }
    }

    function buildFieldSetting($jqfield) {
        var exclusive = /header/,
            modelMapping = {
                summarytpl: 'summaryTpl',
                summarytype: 'summaryType'
            },
            model = {
                sortable: true
            },
            setting = {};
        $.each($jqfield[0].attributes, function (idx, attr) {
            if (!exclusive.test(attr.nodeName)) {
                var attrName = modelMapping[attr.nodeName] || attr.nodeName;
                setting[attrName] = attr.nodeValue;
            }
        });
        setting.index = setting.name;
        $.extend(model, setting);
        return model;
    }

    function buildGridCfg($origComponent, navbarId) {

        var gridcfg = {
            datatype: "json",
            mtype: 'GET',
            rowNum: 30,
            height: 'auto',
            rowList: [10, 30, 50, 75, 100],
            viewrecords: true,
            gridview: true,
            toppager: false,
            pager: '#' + navbarId,
            sortname: null,
            sortorder: 'desc',
            caption: null,
            colNames: null,
            colModel: null,
            subGrid: false,
            url: null,
            groupingView: {
                groupSummary: false
            }
        };


        var attribs = $origComponent[0].attributes,
            colNames = [],
            colModels = [],
            custSettings = {
                groupingView: {}
            };
        $origComponent.children("icol").each(function (idx, col) {
            var $jqfield = $(col);
            colNames.push($jqfield.attr('header'));
            colModels.push(buildFieldSetting($jqfield));
            if ($jqfield.attr('summaryType')) {
                custSettings.groupingView.groupSummary = [true];
            }
        });

        custSettings.colNames = colNames;
        custSettings.colModel = colModels;

        $.each(attribs, function (idx, attr) {
            mergeAttrib($origComponent, custSettings, attr);
        });

        $.extend(true, gridcfg, custSettings);
        return gridcfg ;
    }

    var ATTRIB_MAPPING = {
        'rownum': 'rowNum',
        'heading': 'caption',
        'sortname': 'sortname',
        'sortorder': 'sortorder',
        'groupcollapse': 'groupcollapse',
        'width': 'width',
        'height': 'height',
        'multiselect':'multiselect',
        'subgrid':'subGrid',
        'datatype':'datatype',
        'datasrc': function (custsetting, $origComponent, attrib) {
            if (/.*\(\)$/.test(attrib.nodeValue)) {
                custsetting['datatype'] = 'local';
                custsetting['data'] = eval(attrib.nodeValue);
            } else {
                custsetting['url'] = attrib.nodeValue;
            }
        },
        'groupfield': function (custsetting, $origComponent, attrib) {
            custsetting.grouping = true;
            var groupview = {
                groupField: [attrib.nodeValue],
                groupColumnShow: false,
                groupText: ['<b>{0} ( {1} )</b>']
            }
            if ($origComponent.attr('groupcollapse') === 'true') {
                groupview.groupCollapse = true;
            }
            $.extend(true, custsetting['groupingView'], groupview);
        }
    };


    return {
        name: 'igrid',
        template: '<div id="{{id}}"><table id="{{id}}_grid"></table><div id="{{id}}_pager"></div></div>',
        script: function () {
            this.$jqgrid = null;
            this.init = function () {
                var $origComponent = $(this.origElement()) ;
                var gridcfg = buildGridCfg($origComponent, this.id+'_pager'),
                    $subgrid = $origComponent.children('subgrid:first') ;
                if ($subgrid.length>0) {
                    gridcfg.subGrid = true ;
                    gridcfg.subGridRowExpanded = function(subgrid_id, row_id) {
                        var subgrid_table_id = subgrid_id+"_t",
                            pager_id = "p_"+subgrid_table_id,
                            subgridCfg = buildGridCfg($subgrid, pager_id) ;
                        $("#"+subgrid_id).html("<table id='"+subgrid_table_id+"' class='scroll'></table><div id='"+pager_id+"' class='scroll'></div>");
                        subgridCfg.url = subgridCfg.url.replace(/\$\{row_id\}/, row_id) ;
                        $("#"+subgrid_table_id).jqGrid(subgridCfg) ;
                    }
                    gridcfg.subGridRowColapsed=function(subgrid_id, row_id) {
                        // this function is called before removing the data
                        //var subgrid_table_id;
                        //subgrid_table_id = subgrid_id+"_t";
                        //jQuery("#"+subgrid_table_id).remove();
                    }
                }
                this.$jqgrid = $('#' + this.id+'_grid');
                console.log('jqgrid:'+this.id) ;
                this.$jqgrid.jqGrid(gridcfg);
            }
        }
    };
})

