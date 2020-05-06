let canvas = document.createElement("canvas"); // створюємо канвас
let ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth; // розміри "вікна"
canvas.height = 800;
document.body.appendChild(canvas); // відображаєм вікно

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

let car = new function () { // гравець і його параметри
    this.x = canvas.width / 2;
    this.y = 0;
    this.speedY = 0;
    this.speedX = 0;
    this.rotate = 0;

    this.img = new Image();
    this.img.src = "img/car.png"
    this.draw = function () {
        let p1 = canvas.height - noise(time + this.x) * 0.25;
        let p2 = canvas.height - noise(time + 5 + this.x) * 0.25;

        let onGround = false;
        if(p1 - 15 > this.y) {
            this.speedY += 0.1;
        }else {
            this.speedY -= this.y - (p1 - 15);
            this.y = p1 - 15;
            onGround = true;
        }

        if(!isplay || onGround && Math.abs(this.rotate) > Math.PI * 0.5) { //странно работає, треба фіксить (при перевороті зациклює анімацію переворота)
            isplay = false;
            this.speedX = 1;
        }

        let angle = Math.atan2((p2 - 15) - this.y, (this.x + 5) - this.x)
        this.y += this.speedY;

        if(onGround && isplay) { // чи знаходиться гравець на землі
            this.rotate -=(this.rotate - angle) * 0.5;
            this.speedX = this.speedX - (angle - this.rotate);
        }   
        this.speedX += (controller.ArrowLeft - controller.ArrowRight) * 0.05;
        this.rotate -= this.speedX * 0.1;
        if(this.rotate > Math.PI) this.rotate = -Math.PI;
        if(this.rotate < -Math.PI) this.rotate = Math.PI;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotate);
        ctx.drawImage(this.img, 0, 0, 80, 50);
        ctx.restore();
    }
}


let time = 0; // час для генерації дороги
let speed = 0;
let isplay = true;
let controller = {ArrowUp:0, ArrowDown:0, ArrowLeft:0, ArrowRight:0};
function loop() {
    speed -= (speed - (controller.ArrowUp - controller.ArrowDown)) * 0.01;
    time += 5 * speed;
    ctx.fillStyle = "#19f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for(let i = 0; i < canvas.width; i++)
    ctx.lineTo(i, canvas.height - noise(time + i) * 0.25);

    ctx.lineTo(canvas.width, canvas.height);
    ctx.fill();

    car.draw();
    requestAnimationFrame(loop);
}

onkeydown = d => controller[d.key] = 1;
onkeyup = d => controller[d.key] = 0;

loop();
// hi vitia