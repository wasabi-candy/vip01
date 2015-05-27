/*
 *  とりあえず、ソースの大枠を書いてみた！
 *  こんな感じでいけるのだろうか！！
 *
 *
 * */


(function(){

    //新しいミノを作るか、既存のミノを落下させるかの判別用
    var new_flag = true;

    //落下中のミノ
    var current_mino;

    //作ったミノたちを入れておく用の配列
    var minos = new Array();

    //作ったミノの数の記録
    var counter = 0;


    window.onload = function(){
        //ゲームスタートの合図
        var timer = setInterval(loop,1000);
    }

    //ゲームのタイマー関数
    //一秒ごとに実行されるよ！
    function loop(){

        if(new_flag){
        //ミノを新しく生成するとき用
            minos[counter] = new Mino(counter);
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
    function Mono(){
    
    }

    //ミノを作る一番小さなブロックのクラス
    function Material(){
    
    }
})();
