let canvas = document.getElementById('canvas'); 
let ctx = canvas.getContext("2d");
canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;
 

var img = new Image();
img.src = "img/red_car.png"





img.onload = function(){
    game();
}



let perm = [];
while(perm.length < 255) {
    while(perm.includes(val = Math.floor(Math.random()*455)));
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
let x = canvas.width;
let y = 0;
let speedY = 0;
let speedX = 0;
let rotate = 0;
let p1 = canvas.height - noise(time + x) * 0.30;    // оце тоже впливає 
let p2 = canvas.height - noise(time + 5 + x) * 0.30;//                на положення картінки
let onGround = false;
let angle = Math.atan2((p2 - 15) - y, (x + 5) - x);

function update() {
    time += 1 * speed;
    
    if(p1 - 15 > y) {
        speedY += 0.1;

    }else {
        speedY -= y - (p1 - 15);
        y = p1 - 15;
        onGround = true;
    }
    
    y += speedY;
    if(onGround) { // чи знаходиться гравець на землі
        rotate -=(rotate - angle) * 0.5;
        speedX = speedX - (angle - rotate);
    } 
    speedX += (controller.a - controller.d) * 0.05;
    rotate -= speedX * 0.1;
    if(rotate > Math.PI){
        rotate = -Math.PI;
        console.log('+10');
    } 
    if(rotate < -Math.PI)
    {
        rotate = Math.PI;
    } 
    
}

function render() {
    ctx.fillStyle = "#19f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "brown";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for(let i = 0; i < canvas.width; i++)
    ctx.lineTo(i, canvas.height - noise(time + i) * 0.25);

    ctx.lineTo(canvas.width, canvas.height);
    ctx.fill();


    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotate);
    ctx.drawImage(img, -40, -25, 80, 50);
    ctx.restore();
}
onkeydown = somekey => controller[somekey.key] = 1;
onkeyup = somekey => controller[somekey.key] = 0;

























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