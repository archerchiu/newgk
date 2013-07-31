define(['gk'], function (gk) {
//    'use strict' ;
    return {
        name: 'igrid',
        template: '<div id="{{id}}"><table id="{{id}}-table"></table></div>',
        script: function () {
            var TAG_COLUMN = 'col',
                ATTRIB = /caption|rowNum|datasrc|navbarPos/,
                ATTRIB_MAPPING = {'datasrc':'url'};
            function buildFieldSetting($jqfield) {
                return {
                    name: $jqfield.attr('name'),
                    index: this.name,
                    width: $jqfield.attr('width'),
                    sortable: $jqfield.attr('sortable') || true
                }
            }

            this.gridcfg = {
                datatype: "json",
                mtype: 'GET',
                rowNum: 30,
                rowList: [10, 20, 30, 40, 50, 75, 100],
                viewrecords: true,
                navbarPos: 'top',
                sortname: null,
                url: null,
                sortorder: 'desc',
                caption: null,
                colNames:null,
                colModels:null,
                url:null
            };



            this.init = function () {
                var processNavbar = function(navbarPos, $ele){
                    if (navbarPos==='top'){
                        $ele.prepend('<div id="'+$ele.attr('id')+'-navbar"></div>') ;
                    } else {
                        $ele.append('<div id="'+$ele.attr('id')+'-navbar"></div>') ;
                    }
                }

                var $origComponent = this.componentSettings(),
                    attribs=$origComponent[0].attributes,
                    colNames= [],
                    colModels=[],
                    custSettings={};
                $origComponent.children("col").each(function (idx, col) {
                    var $jqfield = $(col) ;
                    colNames.push($jqfield.attr('header')) ;
                    colModels.push( buildFieldSetting($jqfield)) ;
                });

                this.gridcfg.colNames = colNames ;
                this.gridcfg.colModels = colModels ;

                $.each(attribs, function(idx,attr){
                    if ( ATTRIB.test(attr.nodeName) ) {
                        var attrName = ATTRIB_MAPPING[attr.nodeName]||attr.nodeName ;
                        custSettings[attrName] = attr.nodeValue ;
                    }
                }) ;





            }
        }
    };
})

