/*
 *	夜食にカップ焼きそば食べたいな
 *	普通の焼きそばと、カップ焼きそばとでは、食べたいタイミングが少し違う
 *	これがカップ焼きそば現象
 * */

window.onload = function(){

	var display = document.getElementById("window");
	for(var i=0;i<10;i++){
		(function(a){
			document.getElementById("num"+i).onclick = function(){
				var temp = display.innerHTML;
				if(temp == 0){
					temp = a;
				}else{
					temp += a;
				}
				display.innerHTML = temp;
			}
		})(i);
	}

	document.getElementById("C").onclick = function(){
		display.innerHTML="0"
	}
	
}
