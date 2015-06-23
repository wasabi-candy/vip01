window.onload = function(){
    
    var ele = document.getElementById("c");
    ele.setAttribute("width","500px");
    ele.setAttribute("height","500px");
    var ctx = ele.getContext("2d");
    ctx.beginPath();
    ctx.fillRect(10,10,10,10);
}
