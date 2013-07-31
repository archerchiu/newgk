define(['gk'], function(gk){
    'use strict' ;
    return {
        name:'ffield',
        template:'<div id="{{id}}-wrapper"><div class="w2ui-label">{{label}}:</div> \
        <div class="w2ui-field" required="{{required}}"> \
            <input name="{{name}}" type="{{type}}" maxlength="{{maxlength}}" size="{{size}}" id="{{id}}"> \
        </div></div> \
        ',
        script:function(){
            this.init = function() {
                var $field = this.$ele.children('.w2ui-field') ;
                if ($field.attr('required')==='true') {
                    $field.addClass('w2ui-required') ;
                }
            }
        }
    };
})
