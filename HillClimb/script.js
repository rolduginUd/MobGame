let canvas = document.getElementById('canvas'); 
let ctx = canvas.getContext("2d");
let progress = document.getElementById("myBar");


// $('#myModal').modal(options)

stopBtn = document.querySelector('.stop');
runBtn = document.querySelector('.run');

setInterval(() => {
    checkOrientation();
}, 50);
const stop = document.getElementsByClassName('stop');
const checkOrientation = () => {
    if (canvas.width !== document.documentElement.clientWidth) {
        canvas.width = document.documentElement.clientWidth; 
        canvas.height = document.documentElement.clientHeight;      
    }
}

if (window.matchMedia("(max-width: 1000px)").matches) {
    stopBtn.style.display = 'block';
    runBtn.style.display = 'block';
}
document.body.appendChild(canvas); 

let perm = [];
while(perm.length < 255) {
    while(perm.includes(val = Math.floor(Math.random()*355)));
    perm.push(val);
}

let lepr = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.PI)) / 2; // 

let noise = x => {
    x = x * 0.01 % 255;
    return lepr(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
}

let car = new function () { // гравець і його параметри
    this.x = canvas.width;
    this.y = 0;
    this.speedY = 0;
    this.speedX = 0;
    this.rotate = 0;

    this.img = new Image();
    this.img.src = "img/noobCar.png"
    this.draw = function () {
        let p1 = canvas.height - noise(time + this.x) * 0.30;    // оце тоже впливає 
        let p2 = canvas.height - noise(time + 5 + this.x) * 0.30;//                на положення картінки

        let onGround = false;
        if(p1 - 15 > this.y) {
            this.speedY += 0.1;
    
        }else {
            this.speedY -= this.y - (p1 - 15);
            this.y = p1 - 15;
            onGround = true;
        }

        let angle = Math.atan2((p2 - 15) - this.y, (this.x + 5) - this.x);
        this.y += this.speedY;

        if(onGround && Math.abs(this.rotate) > 1.6) { // смерть пожила
            this.x = canvas.width / 2;
            this.y = 0;
            this.speedY = 0;
            this.speedX = 0;
            this.rotate = 0;
            controller.w = 0;
            controller.s = 0;
            controller.a = 0;
            controller.b = 0;
            alert("Шо лох, наєбнувся?)");
        }

        // контроллер для моб.
        runBtn.ontouchstart = () => {
            controller.w = 1;
        }
        runBtn.ontouchend = () => {
            controller.w = 0;
        }
        stopBtn.ontouchstart = () => {
            controller.s = 1;
        }
        stopBtn.ontouchend = () => {
            controller.s = 0;
        }
        
        // if(!onGround) { 
        //     runBtn.ontouchstart = () => {
        //         controller.d = 1;
        //     }
        //     runBtn.ontouchend = () => {
        //         controller.d = 0;
        //     }
        //     stopBtn.ontouchstart = () => {
        //         controller.a = 1;
        //     }
        //     stopBtn.ontouchend = () => {
        //         controller.a = 0;
        //     }
        // } 

        if(onGround) { 
            this.rotate -=(this.rotate - angle) * 0.5;
            this.speedX = this.speedX - (angle - this.rotate);

        } 
        this.speedX += (controller.a - controller.d) * 0.05;
        this.rotate -= this.speedX * 0.1;
        if(this.rotate > Math.PI){
            this.rotate = -Math.PI;
            console.log('+10');
        } 
        if(this.rotate < -Math.PI)
        {
            this.rotate = Math.PI;
        } 
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotate);
        if (window.matchMedia("(max-width: 1000px)").matches) {
            ctx.drawImage(this.img, -20, -12, 60, 50);
        }else{
            ctx.drawImage(this.img, -40, -45, 100, 90);
        }
        
        ctx.restore();
    }
}

let time = 0; 
let speed = 0;
const controller = {
    w: 0,
    s: 0,
    a: 0,
    d: 0
};

//покупка
document.querySelector('.cart1').onclick = () => {
    car.img.src = "img/lvl1.png";
}
document.querySelector('.cart2').onclick = () => {
    car.img.src = "img/lvl2.png";
}
document.querySelector('.cart3').onclick = () => {
    car.img.src = "img/lvl3.png";
}


// топливо
let fuelCounter = 100;
function fuel () {
    if(controller.w > 0) 
        fuelCounter -= 1//0.04;

    if(controller.s > 0)
        fuelCounter -= 0.04;

    if(fuelCounter < 0){
        //fuelCounter = 1;
        controller.w = 0;
        controller.s = 0;
        controller.a = 0;
        controller.b = 0;
        
        //alert("заправся бомж");
    }

    progress.style.width = fuelCounter + "%";
}


function loop() {
    fuel();
    speed -= (speed - (controller.w - controller.s)) * 0.01;
    time += 5 * speed;
    ctx.fillStyle = "#19f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#81392A";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for(let i = 0; i < canvas.width; i++)
    ctx.lineTo(i, canvas.height - noise(time + i) * 0.25);

    ctx.lineTo(canvas.width, canvas.height);
    ctx.fill();

    car.draw();

    


    requestAnimationFrame(loop);
}

onkeydown = somekey => controller[somekey.key] = 1;
onkeyup = somekey => controller[somekey.key] = 0;

loop();