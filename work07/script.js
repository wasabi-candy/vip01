(function(width,height){
    function Graph(n){
        var x = y = 100;
        var w = h = 500;
        var bx = x+w-20;
        var by = y+5;
        var front_num = n;
        var element = new Array();
        var ele_num = new Array();
        var self_number = n;
        var index = 0;
        var color = ["#123","#a43","#199","#911","#fd3"];
        var openflag = false;

        var conf_window = document.createElement("div");
        conf_window.id = "c"+n;
        var form = "<div>要素名：<input type='text' /><br />数値：<input type='text' /><br><input type='button' /></div>";
        conf_window.innerHTML = form;

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

            ctx.fillStyle = "#aaa";
            ctx.fillRect(bx,by,15,15);
            ctx.strokeStyle = "#777";

            ctx.beginPath();
            ctx.moveTo(x+w-20+8,y+6);
            ctx.lineTo(x+w-20+8,y+20);
            ctx.moveTo(x+w-19,y+13);
            ctx.lineTo(x+w-20+15,y+13);
            ctx.closePath();
            ctx.stroke();

        }
        this.addElement = function(ele,num){
            element[index] = ele;
            ele_num[index] = num;
            index++;
            this.setWindow();
        }
        this.removeElement = function(i){
            //要素の削除
        }
        this.createGraph = function(){
        }
        this.open = function(){

        }
        this.setWindow = function(){
            style = "z-index:1;width:200px;height:"+(100+index*50)+"px;background:#ddd;";
            style+= "position:absolute;margin-left:"+(x+w+1)+"px;margin-top:"+y+"px;";
            style+= "";
            conf_window.setAttribute("style",style);
        }
        this.setWindow();

        q.onclick = function(e){
            var cx = e.clientX;
            var cy = e.clientY;
            var body = document.getElementsByTagName("body")[0];
            if(cx<bx+15 && cx>bx && cy<by+15 && cy>by){
                if(!openflag){
                    body.appendChild(conf_window);
                    openflag = true;
                }else{
                    body.removeChild(conf_window);
                    openflag = false;
                }
            }
        }



    }
    window.onload = function(){
        q.setAttribute("width",width+"px");
        q.setAttribute("height",height+"px");
        q.setAttribute("style","position:absolute;");
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
