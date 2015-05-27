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
            current_mino = new Mino(counter);
            counter++;
        }else{
        //ミノを落下させるとき用

        
        }

        /*
         * ここら辺で行を揃ってるか判別して、
         * 揃ってた行を削除、その分下に詰める
         * */
    }


    //ミノクラス
    function Mino(num){
         var test= new Material();
         test.setColor(colors[Math.ceil(Math.random()*4)]);
         tetris.appendChild(test.getObj());

    }

    //ミノを作る一番小さなブロックのクラス
    function Material(){
        var mat;
        var x;
        var y;
        (function(){
            mat = document.createElement("div");
            mat.setAttribute("style","height:18px;width:18px;border:solid 1px black;float:left;");
        })();

        this.getObj = function(){
            return mat;
        }
        this.setColor = function(color){
            mat.style.backgroundColor=color;
        }
    }

})();
