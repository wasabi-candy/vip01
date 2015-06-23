(function(){
    function test(x){
        return x*x/10;
    }

    window.onload = function(){
        var width = window.innerWidth;
        var height = window.innerHeight;

        q.setAttribute("width",width+"px");
        q.setAttribute("height",height+"px");

        var ctx = q.getContext("2d");
        ctx.lineWidth=0.5;
        ctx.beginPath();
        ctx.moveTo(width/2,0);
        ctx.lineTo(width/2,height);
        ctx.moveTo(0,height/2);
        ctx.lineTo(width,height/2);
        ctx.stroke();
        ctx.lineWidth=1;

        var old_point = Array(2);
        var start = -width/2;
        for(var x=start;x<=width;x++){
            if(x != start){
                ctx.beginPath();
                ctx.moveTo(old_point[0]+width/2,-1*old_point[1]+(height/2));
                ctx.lineTo(x+width/2,-1*test(x)+(height/2));
                ctx.stroke();
            }

            old_point[0] = x;
            old_point[1] = test(x);
        }
    }

})();





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
