/*
   window.onload = function(){

   var ele = document.getElementById("c");
   ele.setAttribute("width","500px");
   ele.setAttribute("height","500px");
   var ctx = ele.getContext("2d");
   ctx.beginPath();

   var i=10;
   setInterval(function(){
   i++;
   ctx.fillRect(i,10,10,10);
   },10);
   }
   */


var s = window.screen;
var width = q.width = s.width;
var height = q.height = s.height;

var letters = Array(256).join(1).split('');

var draw = function () {
    q.getContext('2d').fillStyle = 'rgba(0,0,0,0.1)';
    q.getContext('2d').fillRect(0,0,width,height);
    q.getContext('2d').fillStyle = '#0F0';

    letters.map(function(y_pos, index){
        text = String.fromCharCode(49+Math.random()*9);
        x_pos = index * 10;
        q.getContext('2d').fillText(text, x_pos, y_pos);
        letters[index] = (y_pos > 758 + Math.random() * 1e4) ? 0 : y_pos + 10;
    });
};
setInterval(draw, 33);
