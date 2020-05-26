let canvas = document.getElementById('game'); 
let ctx = canvas.getContext("2d");
 

var img = new Image();
img.src = "img/red_car.png"

img.onload = function(){
    game();
}
var x = 0;
var y = 0;
function game() {
    update();
    render();
    requestAnimFrame(game);
}

function update() {

}

function render() {
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
}


























var requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame || 
    function(callback) {
        window.setTimeout(callback, 1000 / 20);
    };
})();