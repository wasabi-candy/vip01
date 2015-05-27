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

    //ミノの色
    var colors = ["#4521faa","#446214","#9052fa","#cc54aa","#78abbc"];

    //ミノの種類
    var mino_type = [
        "0100010001000100",
        "0100010001100000",
        "0010001001100000",
        "0000011001100000",
        "0000011000110000",
        "0000011011000000",
        "0000001001110000"
            ];



    window.onload = function(){
        tetris = document.getElementById("tetris");
        //ゲームスタートの合図
        var timer = setInterval(loop,1000);
    }

    //キーボード入力
    document.onkeydown = function(e){
        if(new_flag)return 0;

        if(e.keyCode == "38"){
            current_mino.rotation();
        }else if(e.keyCode == "37"){
            current_mino.left();
        }else if(e.keyCode == "39"){
            current_mino.right();
        }else if(e.keyCode == "40"){
            current_mino.down();
        }
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
        var top_position = 0;
        var left_position = 8;
        var state = 0;
        var mino_materials = new Array(4);
        var color = colors[Math.ceil(Math.random()*4)];
        var type = mino_type[Math.ceil(Math.random()*6)];
        var movable_num = [0,0];
        (function(){
            var c = 0;
            for(var i = 0;i<4;i++){
                for(var j = 0;j<4;j++){
                    if(type.charAt(i*4+j)=='1'){
                        mino_materials[c] = new Material();
                        mino_materials[c].setPoints(left_position+(j),i);
                        mino_materials[c].setColor(color);
                        tetris.appendChild(mino_materials[c].getObj());
                        c++;
                    }

                }
            }
        })();
        //最小ブロックを配列として返すよ
        this.getMaterials = function(){
            return mino_materials;
        }
        //落下させるよ
        this.fall = function(){
            movable_num[0] = 0;
            top_position++;
            for(var i=0;i<4;i++){
                var temp = mino_materials[i];
                temp.setPoints(temp.getX(),temp.getY()+1);
            }
            movable();
        }
        //落下できるかどうかを返すよ
        this.onFloor = function(){
            return movable_num[0] == 1;
        }
        //左に動くよ
        this.left = function(){
            if(movable_num[1] == -1)return 0;
            movable_num[1] = 0;
            left_position--;
            for(var i=0;i<4;i++){
                var temp = mino_materials[i];
                temp.setPoints(temp.getX()-1,temp.getY());
            }
            movable();
        }
        //右に動くよ
        this.right = function(){
            if(movable_num[1] == 1)return 0;
            movable_num[1] = 0;
            left_position++;
            for(var i=0;i<4;i++){
                var temp = mino_materials[i];
                temp.setPoints(temp.getX()+1,temp.getY());
            }
            movable();
        }
        //せつこ・・・それドロップやない・・・ハードドロップや！！！！！
        this.down = function(){
            while(!this.onFloor()){
                this.fall();
            }
            movable();
        }
        //回すよ
        this.rotation = function(){
            var temp = "";
            for(var i = 0;i<4;i++){
                for(var j = 3;j>=0;j--){
                    temp += type.charAt(j*4+i);
                }
            }
            type = temp;
            mapping(temp);
            movable_num[1]=0;
            movable();
        }
        //二進数のデータ渡したらその通りにブロックを再配置するよ
        function mapping(type){
            var c = 0;
            for(var i = 0;i<4;i++){
                for(var j = 0;j<4;j++){
                    if(type.charAt(i*4+j)=='1'){
                        var temp = mino_materials[c];
                        temp.setPoints(left_position+j,top_position+i);
                        c++;
                    }

                }
            }
        }
        
        //ミノが動けるかどうか判断
        function movable(){
            for(var i=0;i<4;i++){
                if(mino_materials[i].getX() <= 0){
                    movable_num[1] = -1;
                }else if(mino_materials[i].getX() >= 19){
                    movable_num[1] = 1;
                }
                if(mino_materials[i].getY() > 28){
                    movable_num[0] = 1;
                }
            }
        }
    }

    //ミノを作る一番小さなブロックのクラス
    function Material(){
        var mat;
        var x;
        var y;
        (function(){
            var style = "position:absolute;height:18px;width:18px;border:solid 1px black;float:left;font-size:8px;text-align:center;";
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
            mat.style.marginLeft = (x*20)+"px";
            mat.style.marginTop = (y*20)+"px";
            mat.innerHTML = x+"."+y;
        }
        this.getX = function(){
            return x;
        }
        this.getY = function(){
            return y;
        }
    }

})();
