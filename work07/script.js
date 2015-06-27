(function(width,height){
    function Graph(n){
        var x,y,w,h;
        var front_num = n;
        var element = new Array();
        var ele_num = new Array();
        var index = 0;
        var color = ["#123","#a43","#199","#911","#fd3"];
        (function(){
            x = 100;
            y = 100;
            w = 300;
            h = 300;
        })();

        this.draw = function(){
            var sum = 0;
            for(var i=0;i<index;i++){sum+=ele_num[i];}
            ctx.fillStyle="#ddd";
            ctx.fillRect(x,y,w,h);

            var angle,old_angle;
            for(var i=0;i<index;i++){
                if(i==0){
                    angle = -90;
                    old_angle = -90;
                }
                angle += 360*(ele_num[i]/sum);
                ctx.fillStyle=color[i];
                ctx.beginPath();
                ctx.moveTo(x+w/2,y+h/2);
                ctx.arc(x+w/2, y+h/2, w/2, old_angle*Math.PI/180, angle*Math.PI/180, false);
                ctx.closePath();
                ctx.fill();

                old_angle = angle;
            }

        }
        this.addElement = function(ele,num){
            element[index] = ele;
            ele_num[index] = num;
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
        g.addElement("",10);
        g.addElement("",20);
        g.addElement("",14);
        g.draw();
    }
})(window.innerWidth,window.innerHeight);
