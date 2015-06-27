(function(width,height){
    var life_array = new Array();
    function Life(n){
        var gene = "";
        //ランダムで遺伝子作成
        for(var i=0;i<24;i++)gene+=Math.round(Math.random());
        console.log(parseInt(gene,2).toString("16"));


        //位置
        var x=width/2;
        var y=height/2;
        var face = "(´・ω・`)";
        var back = -1;

        this.draw = function(){
            ctx.fillStyle="#333";//"#"+parseInt(gene,2).toString("16");
            ctx.fillText(face,x,y);
            ctx.fillText("＼山田です／",x-10,y-20);
        }
        this.walk = function(){
            var front;
            while(true){
                front = Math.floor(Math.random()*4);
                if(front != back)break;
            }
            back = front;

            if(front == 0)x+=5;
            else if(front == 1)x-=5;
            else if(front == 2)y+=5;
            else y-=5;
            this.draw();
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
            ctx.fillText("GA使うよ!!",15,25);
            ctx.font="15px ''";
        }
        init();

        life_array[0] = new Life();
        setInterval(function(){
            init();
            life_array[0].walk();
        },50);
    }

})(window.innerWidth,window.innerHeight);
