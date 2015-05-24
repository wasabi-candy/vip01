window.onload = function(){

	var display = document.getElementById("window");
	var calc = 0;
	var temp;
	var sym = 0;
	var on_symbol = false;

	//実際に計算するところ
	function calculation(){

		if(calc == 0){
			calc = Number(temp);
		}else if(sym == 1){
			calc += Number(temp);
		}else if(sym == 2){
			calc -= Number(temp);
		}else if(sym == 3){
			calc *= Number(temp);
		}else if(sym == 4){
			calc /= Number(temp);
		}
	}

	//数字の部分
	for(var i=0;i<10;i++){
		(function(a){
			document.getElementById("num"+i).onclick = function(){
				temp = Number(display.innerHTML);
				if(temp === 0 || on_symbol){
					temp = a+"";
				}else{
					temp += a+"";
				}
				display.innerHTML = temp;
				on_symbol = false;
			}
		})(i);
	}

	//四則演算の記号
	document.getElementById("add").onclick = function(){
		if(!on_symbol)calculation();
		sym = 1;
		on_symbol = true;
	}
	document.getElementById("sub").onclick = function(){
		if(!on_symbol)calculation();
		sym = 2;
		on_symbol = true;
	}
	document.getElementById("mul").onclick = function(){
		if(!on_symbol)calculation();
		sym = 3;
		on_symbol = true;
	}
	document.getElementById("div").onclick = function(){
		if(!on_symbol)calculation();
		sym = 4;
		on_symbol = true;
	}

	
	//イコールとクリア
	document.getElementById("C").onclick = function(){
		display.innerHTML="0"
		temp = 0;
		sym = 0;
		on_symbol = false;
		calc = 0;

	}
	document.getElementById("eq").onclick = function(){
		calculation();
		display.innerHTML=calc;
	}
}
