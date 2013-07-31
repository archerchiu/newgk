gku.loadbootstrap() ;

define(['bootstrap'], function () {
    return {
        name: 'menu',
        template: '<ul class="dropdown-menu"><content></content></ul>',
        script: function () {
            this.init=function() {
            }
        }
    };
})

//<div id="navbar-example" class="navbar navbar-static">
//    <div class="navbar-inner">
//        <div class="container" style="width: auto;">
//            <a class="brand" href="#">T28冶金技術服務雲</a>
//            <ul class="nav" role="navigation">
//                <li class="dropdown">
//                    <a id="drop1" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">產品成分<b class="caret"></b></a>
//                    <ul class="dropdown-menu" role="menu" aria-labelledby="drop1">
//                        <li ><a  tabindex="-1" href="http://google.com">鋼種代號</a></li>
//                        <li ><a  tabindex="-1" href="#anotherAction">化學成份管制</a></li>
//                        <li ><a  tabindex="-1" href="#">TP產品規範</a></li>
//                        <li  class="divider"></li>
//                        <li class="dropdown-submenu">
//                            <a href="#">LV2</a>
//                            <ul class="dropdown-menu">
//                                <li><a href="http://google.com">基本資料設定</a></li>
//                                <li><a href="http://google.com">傳票維護作業</a></li>
//                            </ul>
//                        </li>
//                    </ul>
//                </li>
//                <li class="dropdown">
//                    <a href="#" id="drop2" role="button" class="dropdown-toggle" data-toggle="dropdown">Dropdown 2 <b class="caret"></b></a>
//                    <ul class="dropdown-menu" role="menu" aria-labelledby="drop2">
//                        <li ><a  tabindex="-1" href="#">Action</a></li>
//                        <li ><a  tabindex="-1" href="#">Another action</a></li>
//                        <li ><a  tabindex="-1" href="#">Something else here</a></li>
//                        <li  class="divider"></li>
//                        <li ><a  tabindex="-1" href="#">Separated link</a></li>
//                    </ul>
//                </li>
//            </ul>
//            <ul class="nav pull-right">
//                <li id="fat-menu" class="dropdown">
//                    <a href="#" id="drop3" role="button" class="dropdown-toggle" data-toggle="dropdown">Dropdown 3 <b class="caret"></b></a>
//                    <ul class="dropdown-menu" role="menu" aria-labelledby="drop3">
//                        <li ><a  tabindex="-1" href="#">Action</a></li>
//                        <li ><a  tabindex="-1" href="#">Another action</a></li>
//                        <li ><a  tabindex="-1" href="#">Something else here</a></li>
//                        <li  class="divider"></li>
//                        <li ><a  tabindex="-1" href="#">Separated link</a></li>
//                    </ul>
//                </li>
//            </ul>
//        </div>
//    </div>
//    </div>


