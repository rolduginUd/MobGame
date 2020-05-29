let canvas = document.getElementById('canvas'); 
let ctx = canvas.getContext("2d");
canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;
 

let coinImg = new Image();
coinImg.src = "img/bitcoin.png"
  

let perm = [];
while(perm.length < 255) {
    while(perm.includes(val = Math.floor(Math.random()*255)));
    perm.push(val);
}

let lepr = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.PI)) / 2; // 

let noise = x => {
    x = x * 0.01 % 255;
    return lepr(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
}



function game() {
    
    render();
    update();
    requestAnimFrame(game);
}
let time = 0;
let speed = 0;


function update() {
    time += 1;
    
}
let coinX = 1;
let coinY;

function render() {
    ctx.fillStyle = "#19f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "brown";
    
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for(let i = 0; i < canvas.width; i++) {
        ctx.lineTo(i, canvas.height - noise(time + i) * 0.25);
        coinY = ((canvas.height - noise(time + i) * 0.25)-30);
        coinX = i - time;
    }

    ctx.drawImage(coinImg,coinX,coinY);

    ctx.lineTo(canvas.width, canvas.height);
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

game();
