(function(width,height){
    function Grapha(n){
        var x,y,w,h;
        var index = n;
        (function(){
            x = 100;
            y = 100;
            w = 300;
            h = 300;
        })();

        this.draw = function(){
            ctx.fillStyle="#3d3";
            ctx.fillRect(x,y,w,h);
            ctx.fillStyle="#000";
        }

    }
    window.onload = function(){
        q.setAttribute("width",width+"px");
        q.setAttribute("height",height+"px");
        ctx = q.getContext("2d");
        function init(){
            ctx.fillStyle="#eee";
            ctx.fillRect(0,0,width,height);
            ctx.fillStyle="#000";
            ctx.font="20px ''";
            ctx.fillText("グラフ作るよ！",10,30);
        }
        init();

        var g = new Grapha(0);
        g.draw();
    }
})(window.innerWidth,window.innerHeight);
