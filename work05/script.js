/*
 *  とりあえず、ソースの大枠を書いてみた！
 *  こんな感じでいけるのだろうか！！
 * */


(function(){

    //新しいミノを作るか、既存のミノを落下させるかの判別用
    var new_flag = true;

    //落下中のミノ
    var current_mino;

    //作ったミノたちを、分解して入れておく用の配列
    var materials = new Array();

    //作ったミノの数の記録
    var counter = 0;

    //画面
    var tetris;

    var colors = ["#4521faa","#446214","#9052fa","#cc54aa","#78abbc"];


    window.onload = function(){
        tetris = document.getElementById("tetris");
        //ゲームスタートの合図
        var timer = setInterval(loop,1000);
    }

    //ゲームのタイマー関数
    //一秒ごとに実行されるよ！
    function loop(){

        if(new_flag){
        //ミノを新しく生成するとき用
            new_flag = false;
            current_mino = new Mino(counter);
            counter++;
        }else{
        //ミノを落下させるとき用
            current_mino.fall();
            if(current_mino.onFloor()){
                new_flag = true;
            }
        }

        /*
         * ここら辺で行を揃ってるか判別して、
         * 揃ってた行を削除、その分下に詰める
         * */
    }


    //最小ブロックを操作してミノとして振る舞わせるためのクラス
    function Mino(num){
        var material_num = 4;
        var mino_materials = new Array(4);
        var color = colors[Math.ceil(Math.random()*4)];
        (function(){
            for(var i = 0;i<material_num;i++){
                mino_materials[i] = new Material();
                mino_materials[i].setPoints(150+(i*20),0);
                mino_materials[i].setColor(color);
                tetris.appendChild(mino_materials[i].getObj());
            }
        })();
        
        this.fall = function(){
            for(var i=0;i<material_num;i++){
                var temp = mino_materials[i];
                temp.setPoints(temp.getX(),temp.getY()+20);
            }
        }
        this.onFloor = function(){
            return false;
        }

    }

    //ミノを作る一番小さなブロックのクラス
    function Material(){
        var mat;
        var x;
        var y;
        (function(){
            var style = "position:absolute;height:18px;width:18px;border:solid 1px black;float:left";
            mat = document.createElement("div");
            mat.setAttribute("style",style);
        })();

        this.getObj = function(){
            return mat;
        }
        this.setColor = function(color){
            mat.style.backgroundColor=color;
        }
        this.setPoints = function(tx,ty){
            x = tx;
            y = ty;
            mat.style.marginLeft = x+"px";
            mat.style.marginTop = y+"px";
        }
        this.getX = function(){
            return x;
        }
        this.getY = function(){
            return y;
        }
    }

})();
