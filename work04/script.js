(function(){

    window.onload = function(){
        var num = 0;
        document.getElementById("btn").onclick = function(){
            new CreateDiv(num);
            num++;
        }
    }

    //クラスベース風に書いてみるよ！！
   function CreateDiv(num){

       //プロパティ
        var num = num;
        var x = Math.ceil(Math.random()*window.innerHeight-100);
        var y = Math.ceil(Math.random()*window.innerWidth-100);
        var text = "object"+num;
        var on_mouse = false;
        var id = "box"+num;
        var me;

        //即時関数で無理矢理コンストラクタっぽいもの
       (function(){
            var style = "position:absolute;padding:10px;width:60px;height:20px;background:#ccc;";
            style += "border:solid 1px #000;margin-left:"+y+";margin-top:"+x+";cursor:pointer;";
            me = document.createElement("div");
            me.setAttribute("id",id);
            me.setAttribute("style",style);
            me.innerHTML = text;
            me.onmousedown = mouseDown;
            document.body.appendChild(me);
        })();

        //メソッド
        function mouseDown(){
            document.body.onmouseup = mouseUp;
            document.body.onmousemove = mouseMove;
            on_mouse = true;
        }
        function mouseUp(){
            on_mouse = false;
        }
        function mouseMove(e){
            if(on_mouse){
                me.style.marginLeft = (e.clientX-50)+"px";
                me.style.marginTop = (e.clientY-30)+"px";
            }
        }

    }
})();
