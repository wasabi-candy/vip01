(function(width,height){
    function sin(x){return Math.sin(x)}
    function cos(x){return Math.cos(x)}
    function tan(x){return Math.tan(x)}
    function pow(x,n){return Math.pow(x,4)}
    function abs(x){return Math.abs(x)}
    function sqt(x){return Math.sqrt(x)}

    //関数
    var test1 = function(x,y){return 100*sin(x/50)+100*sin(y/50)}

    //関数の座標・描画を管理するクラス
    function Fnc(fnc){
        var power =1;
        var color = "#000";
        var start = -width/2;
        var end = width/2;
        var y = new Array(width);
        var old_point = Array(2);
        var d = true;
        var yoko = 0;
        var tate = 0;
        var z_axis = Math.floor(fnc.toString().split(",").length==1?0:width);
        var y_ary = new Array(z_axis);

        this.calc = function(){
            var iz = 0;
            for(var z=start/power;z<=end/power;z+=1/power){
                var i = 0;
                for(var x = start/power;x<=end/power;x+=1/power){
                    if(z_axis==0){
                        y[i] = fnc(x)*power;
                    }else{
                        y[i] = fnc(x,z)*power
                    }
                    i++;
                }
                if(z_axis!=0)y_ary[iz] = y.concat();
                iz++;
            }
        }
        this.draw = function(){
            ctx.strokeStyle = color;
            var ox,oy;
            for(var z=0;z<=z_axis;z+=15){
                for(var i=0;i<=width;i+=15){
                    if(disc((i+start)/power,(z+start)/power)){
                        var yy = y_ary[z][i];
                        var nzx = sin(yoko)*(z+start);
                        var nzy = sin(tate)*(z+start);

                        var nx = (i+start)*cos(yoko)+nzx-start;
                        var ny = -yy*cos(tate)+nzy+height/2;

                        ctx.beginPath();
                        ctx.strokeStyle="#"+(Math.floor(16-16*ny/width).toString(16))+"3"+(Math.floor(16*ny/width).toString(16));
                       // ctx.fillRect(ox,oy,2,2);
                        ctx.moveTo(ox,oy);
                        ctx.lineTo(nx,ny);
                        ctx.stroke();
                        ox = nx;
                        oy = ny;

                    }else if(!disc(i+start/power,(i+start)/power)){
                        ctx.strokeStyle="#0ff";
                        ox = ((i+start)*cos(yoko))+nzx-start;
                        oy = (-y_ary[z][i])*cos(tate)+nzy+height/2;
                        ctx.strokeStyle=color;
                    }
                }
            }
            ctx.strokeStyle = "#000";
        }
        this.setColor = function(c){
            color = c;
        }
        this.setCondition = function(dd){
            d = dd;
        }
        this.left = function(){
            yoko+=0.01;
            this.draw();
        }
        this.right = function(){
            yoko-=0.01;
            this.draw();
        }
        this.up = function(){
            tate += 0.08;
            this.draw();
        }
        this.down = function(){
            tate -= 0.08;
            this.draw();
        }
        function disc(x,z){
            return eval(d);
        }


        this.calc();
    }

    window.onload = function(){

        q.setAttribute("width",width+"px");
        q.setAttribute("height",height+"px");
        ctx = q.getContext("2d");
        function init(){
            ctx.fillStyle="#eee";
            ctx.fillRect(0,0,width,height);
            ctx.strokeStyle="#000";
            ctx.lineWidth=0.5;
            ctx.beginPath();
            ctx.moveTo(width/2,0);
            ctx.lineTo(width/2,height);
            ctx.moveTo(0,height/2);
            ctx.lineTo(width,height/2);
            ctx.stroke();
            ctx.lineWidth=1;
            ctx.fillStyle="#000";
        }
        init();


        var obj_ary = [
            new Fnc(test1)
            ];
        obj_ary[0].setColor("#F00");
        obj_ary[0].setCondition("abs(x)<250 && abs(z)<250");
        obj_ary[0].draw();

        /*
        document.onkeydown = function(e){
            if(e.keyCode == "38"){
                init();
                for(var i=0;i<obj_ary.length;i++)obj_ary[i].up();
            }else if(e.keyCode == "37"){
                init();
                for(var i=0;i<obj_ary.length;i++)obj_ary[i].left();
            }else if(e.keyCode == "39"){
                init();
                for(var i=0;i<obj_ary.length;i++)obj_ary[i].right();
            }else if(e.keyCode == "40"){
                init();
                for(var i=0;i<obj_ary.length;i++)obj_ary[i].down();
            }
        }
        */
        setInterval(function(){init();obj_ary[0].left()},1);
    }
})(window.innerWidth,window.innerHeight);





/*
   var s = window.screen;
   var width = q.width = s.width;
   var height = q.height = s.height;

   var letters = Array(256).join(1).split('');
   var i=0;


   function rand(){return Math.floor(Math.random()*16);}
   function up(i){n[i]>=16?f[i]=false:n[i]++;}
   function down(i){n[i]<=0?f[i]=true:n[i]--;}

   var n = [rand(),rand(),rand()];
   var f = [false,false,false];

   function color(){
   for(var i=0;i<3;i++){
   f[i]?up(i):down(i);
   }
   return "#"+n[0].toString(16)+n[1].toString(16)+n[2].toString(16);
   }

   var draw = function () {
   q.getContext('2d').fillStyle = 'rgba(0,0,0,0.1)';
   q.getContext('2d').fillRect(0,0,width,height);
   q.getContext('2d').fillStyle = color();

   letters.map(function(y_pos, index){
   text = String.fromCharCode(49+Math.random(i)*9);
   x_pos = index * 10;
   q.getContext('2d').fillText(text, x_pos, y_pos);
   letters[index] = (y_pos > 758 + Math.random() * 1e4) ? 0 : y_pos + 20;
   });
   };

   q.getContext('2d').font="20px ''";
   setInterval(draw, 1000);
   */
