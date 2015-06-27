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
    }
})(window.innerWidth,window.innerHeight);
