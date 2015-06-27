(function(width,height){
    function Life(n){

        this.draw = function(){

        }

    }
    window.onload = function(){
        q.setAttribute("width",width+"px");
        q.setAttribute("height",height+"px");
        q.setAttribute("style","position:absolute;");
        ctx = q.getContext("2d");
        function init(){
            ctx.fillStyle="#eee";
            ctx.fillRect(0,0,width,height);
            ctx.fillStyle="#000";
            ctx.font="20px ''";
            ctx.fillText("GA使うよ!!",15,25);
        }
        init();
    }
})(window.innerWidth,window.innerHeight);
