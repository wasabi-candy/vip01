(function(width,height){
    function sin(x){return Math.sin(x)}
    function cos(x){return Math.cos(x)}
    function tan(x){return Math.tan(x)}
    function pow(x,n){return Math.pow(x,4)}
    function abs(x){return Math.abs(x)}

    //関数
    var test1 = function(x){
        return x*x/10;
    }


    //関数の座標・描画を管理するクラス
    function Fnc(fnc){
        var power = 20;
        var color = "#000";
        var start = -width/2;
        var end = width/2;
        var y = new Array(width);
        var old_point = Array(2);
        var d = true;
        var type = "2";
        var yoko = 0;
        var tete = 0;

        this.calc = function(){
            var i = 0;
            for(var x = start/power;x<=end/power;x+=1/power){
                y[i] = fnc(x)*power;
                i++;
            }
        }
        this.draw = function(){
            for(var i=0;i<=width;i++){
                if(i != 0){
                    if(disc((i+start)/power)){
                        ctx.beginPath();
                        ctx.moveTo(i-1,-y[i-1]+height/2);
                        ctx.lineTo(i,-y[i]+height/2);
                        ctx.stroke();
                    }
                }
            }
        }
        this.setColor = function(c){
            ctx.strokeStyle = c;
        }
        this.setCondition = function(dd){
            d = dd;
        }
        this.left = function(){
            alert("left");
        }
        this.right = function(){
            alert("right");
        }
        function disc(x){
            return eval(d);
        }


        this.calc();
    }

    window.onload = function(){

        q.setAttribute("width",width+"px");
        q.setAttribute("height",height+"px");

        ctx = q.getContext("2d");
        ctx.lineWidth=0.5;
        ctx.beginPath();
        ctx.moveTo(width/2,0);
        ctx.lineTo(width/2,height);
        ctx.moveTo(0,height/2);
        ctx.lineTo(width,height/2);
        ctx.stroke();
        ctx.lineWidth=1;


        var obj = new Fnc(test1);
        obj.setColor("#F00");
        obj.draw();

        document.onkeydown = function(e){
            if(e.keyCode == "38"){
                //up
            }else if(e.keyCode == "37"){
                obj.left();
            }else if(e.keyCode == "39"){
                obj.right();
            }else if(e.keyCode == "40"){
                //down
            }else if(e.keyCode == "32"){
                //space
            }else if(e.keyCode == "65"){
                //??
            }

        }


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
