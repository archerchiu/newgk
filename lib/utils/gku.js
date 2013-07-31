var gku = {
        urls:{},
        bootstraploaded:false,
        loadcss: function (url) {
            if (this.urls[url]){
                return ;
            }
            this.urls[url]=true ;
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            document.getElementsByTagName("head")[0].appendChild(link);
        },
        loadbootstrap:function() {
            if (this.bootstraploaded){
                return ;
            }
            this.bootstraploaded=true;
            (function () {
                var css = [
                    'lib/bootstrap/css/bootstrap.css'
                ];
                $.each(css, function () {
                    gku.loadcss(this);
                })
            })();

            require.config({
                baseUrl: 'webcomponent',
                paths: {
                    'bootstrap': '../lib/bootstrap/js/bootstrap'
                }
            });
        }
    }
