(function(width,height){
    function sin(x){return Math.sin(x)}
    function cos(x){return Math.cos(x)}
    function tan(x){return Math.tan(x)}
    function pow(x,n){return Math.pow(x,4)}
    function abs(x){return Math.abs(x)}

    //関数
    var test1 = function(x){
        return pow(x,4)+pow(x,2)+6;
    }
    var test2 = function(x){
        return 1/2*cos(2*x)+7/2;
    }
    var test3 = function(x){
        return 12/(abs(x)+1);
    }


    //関数クラス
    function Fnc(fnc){
        var power = 50;
        var color = "#000";
        var start = -width/2;
        var end = width/2;
        var y = new Array(width);
        var i = 0;
        for(var x = start/power;x<=end/power;x+=1/power){
            y[i] = fnc(x)*power;
            i++;
        }

        var old_point = Array(2);
        this.draw = function(){
            for(var i=0;i<=width;i++){
                if(i != 0){
                    ctx.beginPath();
                    ctx.moveTo(i-1,-y[i-1]+height/2);
                    ctx.lineTo(i,-y[i]+height/2);
                    ctx.stroke();
                }
            }

        }

        this.setColor = function(c){
            ctx.strokeStyle = c;
        }
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
        var obj = new Fnc(test2);
        obj.setColor("#0F0");
        obj.draw();
        var obj = new Fnc(test3);
        obj.setColor("#00F");
        obj.draw();



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
