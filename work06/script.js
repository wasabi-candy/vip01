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
