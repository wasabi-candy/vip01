(function(width,height){
    function Graph(n){
        var x,y,w,h;
        var front_num = n;
        var element = new Array();
        var index = 0;
        (function(){
            x = 100;
            y = 100;
            w = 300;
            h = 300;
        })();

        this.draw = function(){
            ctx.fillStyle="#ddd";
            ctx.fillRect(x,y,w,h);
            ctx.fillStyle="#000";
            ctx.beginPath();
            ctx.moveTo(x+w/2,y+h/2);
            ctx.arc(x+w/2, y+h/2, w/2, -90*Math.PI/180, 60*Math.PI/180, false);
            ctx.closePath();
            ctx.fillStyle = '#FFCEBE';
            ctx.fill();

        }
        this.addElement = function(ele){
            element[index] = ele;
            index++;
        }
        this.removeElement = function(i){
            //要素の削除
        }
        this.createGraph = function(){
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

        var g = new Graph(0);
        g.draw();
    }
})(window.innerWidth,window.innerHeight);
