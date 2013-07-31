gku.loadbootstrap() ;

define(['bootstrap','tabPanel'], function () {
    return {
        name: 'tab',
        template: '<div id="{{id}}" name="{{name}}"><content></content></div>',
        script: function () {
            this.init=function() {
                var $origComponent = this.$ele,
                    id = this.id,
                    name = this.$ele.attr("name"),
                    $tabContainer = $origComponent.parent(),
                    $tabHeader = $tabContainer.children("ul:first"),
                    $container = $tabContainer.children("div.tab-content"),
                    activeClass = $tabHeader.children().length==0?" class='active'":"",
                    activePaneClass = activeClass?" active":"",
                    tabContent = $origComponent.html() ;

                this.$ele.remove() ;
                $tabHeader.append("<li"+activeClass+"><a href='#"+id+"' data-toggle='tab'>"+name+"</a></li>") ;
                $container.append("<div class='tab-pane"+activePaneClass+"' id='"+id+"'>"+tabContent+"</div>") ;

            }
        }
    };
})

//
//<div class="tabbable"> <!-- Only required for left/right tabs -->
//    <ul class="nav nav-tabs">
//        <li class="active"><a href="#tab1" data-toggle="tab">Section 1</a></li>
//        <li><a href="#tab2" data-toggle="tab">Section 2</a></li>
//    </ul>
//    <div class="tab-content">
//    <div class="tab-pane active" id="tab1">
//        <p>I'm in Section 1.</p>
//    </div>
//    <div class="tab-pane" id="tab2">
//    <p>Howdy, I'm in Section 2.</p>
//    </div>
//</div>
//</div>