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

    //揃ってる行があるか確認する用の配列
    var conf_line = new Array(30);

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
        }else if(e.keyCode == "32"){
            //スペース押したとき
        }else if(e.keyCode == "65"){
            change();
        }
    }

    //ゲームのタイマー関数
    //一秒ごとに実行されるよ！
    function loop(){

        if(new_flag){
            //行の削除とミノを新しく生成するとき用

            if(current_mino != void 0){
                var delflag = false;//行を削除したかどうか

                var mate_temp = current_mino.getMaterials();
                //ドロップしたミノを分解して配列に格納
                for(var i=0;i<4;i++){
                    materials[counter] = mate_temp[i];
                    counter++;
                }
                //確認用の配列を０で初期化
                for(var i=0;i<30;i++){
                    conf_line[i] = 0;
                }
                //揃っている行があるか、確認
                for(var i=0;i<materials.length;i++){
                    conf_line[materials[i].getY()]++;
                }
                //揃ってる行を削除
                for(var i=29;i>=0;i--){
                    if(conf_line[i]>=20){
                        var delete_line = 0;
                        for(var j = 0; j<materials.length; j++){
                            if(materials[j] != -1 && materials[j].getY() == i){
                                delete_line = i;
                                tetris.removeChild(materials[j].getObj());
                                materials[j]=-1;
                                delflag = true;
                            }
                        }

                        //削除したら、その行よりも上のブロックを一段下げる、用意
                        for(var j=0;j<materials.length;j++){
                            if(materials[j] != -1 && (delete_line > materials[j].getY())){
                                materials[j].drop_flag();
                            }
                        }
                    }
                }

                if(delflag){
                    //削除した分だけ配列に空きがあるから、詰める！
                    var temp_array = new Array();
                    var temp_counter = 0;
                    for(var i=0;i<materials.length;i++){
                        if(materials[i] != -1){
                            materials[i].drop();
                            temp_array[temp_counter] = materials[i];
                            temp_counter++;
                        }
                    }

                    materials = temp_array.concat();
                    counter = materials.length;
                }

            }
            //新しいミノを生成
            new_flag = false;
            current_mino = new Mino(counter);

        }else{
            //ミノを落下させるとき用
            current_mino.fall();
            if(current_mino.onFloor()){
                new_flag = true;
            }
        }
    }

    //この関数を呼び出すと、落下中のミノを変更できます
    function change(){
        var temp_array = current_mino.getMaterials();
        for(var i=0;i<4;i++){
            tetris.removeChild(temp_array[i].getObj());
            delete temp_array[i];
        }
        new_flag = false;
        current_mino = new Mino(counter);
    }


    //最小ブロックを操作してミノとして振る舞わせるためのクラス
    function Mino(num){
        var top_position = 0;
        var left_position = 8;
        var state = 0;
        var mino_materials = new Array(4);
        var color = colors[Math.ceil(Math.random()*4)];
        var type = mino_type[Math.ceil(Math.random()*7)-1];
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
            this.hit();
            movable();
        }

        //あたり判定
        this.hit = function(){
            for(var i=0;i<counter;i++){
                for(var j=0;j<4;j++){
                    var mat = materials[i];
                    var m_mate = mino_materials[j];
                    if(mat.getY() == m_mate.getY()+1 && mat.getX() == m_mate.getX()){
                        movable_num[0] = 1;
                    }
                    if(mat.getX() == m_mate.getX()+1 && mat.getY() == m_mate.getY()){
                        movable_num[1] = 1;
                    }else if(mat.getX() == m_mate.getX()-1 && mat.getY() == m_mate.getY()){
                        movable_num[1] = -1;
                    }else{
                      //  alert("test")
                      //  movable_num[1] = 0;
                    }
                }
            }
        }

        //落下できるかどうかを返すよ
        this.onFloor = function(){
            return movable_num[0] == 1;
        }

        //左に動くよ
        this.left = function(){
            this.hit();
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
            this.hit();
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
            movable_num[0] = 0;
            new_flag = true;
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
            this.mapping(temp);
            movable_num[1]=0;
            movable();
        }

        //二進数のデータ渡したらその通りにブロックを再配置するよ
        //再配置でブロックが外に出るようなら、内側に押し込める
        this.mapping = function(type){
            var c = 0;
            var f = 0;
            for(var i = 0;i<4;i++){
                for(var j = 0;j<4;j++){
                    if(type.charAt(i*4+j)=='1'){
                        var temp = mino_materials[c];
                        temp.setPoints(left_position+j,top_position+i);
                        c++;
                        if(temp.getX() < 0){
                            f = -1;
                        }else if(temp.getX() > 19){
                            f = 1;
                        }
                    }

                }
            }
            if(f == -1){
                this.right();
            }else if(f == 1){
                this.left();
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
                if(mino_materials[i].getY() > 10){
                    movable_num[0] = 1;
                }
            }
        }
    }

    //ミノを作る一番小さなブロックのクラス
    function Material(){
        var mat;
        var d_line;
        var x;
        var y;
        var d_flag = false;
        (function(){
            d_line = 0;
            var style = "position:absolute;height:18px;width:18px;border:solid 1px black;float:left;";
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
        }
        this.getX = function(){
            return x;
        }
        this.getY = function(){
            return y;
        }
        this.drop_flag = function(){
            d_flag = true;
            d_line++;
        }
        this.drop = function(){
            if(d_flag){
                d_flag = false;
                y+=d_line;
                mat.style.marginTop = (y*20)+"px";
            }
            d_line = 0;
        }
    }

})();
