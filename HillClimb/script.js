let canvas = document.getElementById('canvas'); 
let ctx = canvas.getContext("2d");

let progress = document.getElementById("myBar");

let coinImg = new Image();
coinImg.src = "img/bitcoin.png"

const exit = document.querySelector('.exitButton');

let moneyContainer = document.querySelector('.money');
let money = 0;

let backToGame = document.querySelector('.backToGame');

let stopBtn = document.querySelector('.stop');
let runBtn = document.querySelector('.run');
let recordContainer = document.querySelector('.record');
let record = 0;

setInterval(() => {
    checkOrientation();
}, 50);
const checkOrientation = () => {
    if (canvas.width !== document.documentElement.clientWidth) {
        canvas.width = document.documentElement.clientWidth; 
        canvas.height = document.documentElement.clientHeight;      
    }
}
if (window.matchMedia("(max-width: 1000px)").matches) {
    stopBtn.style.display = 'block';
    runBtn.style.display = 'block';
    if (window.orientation == 0) {
        document.querySelector('.rotate').style.display = 'block';
    }
}

window.onload = () => {
    if(!localStorage.name) {
        let cross = spanOne.classList.contains("white");

        modalMenu.classList.toggle("show");
        timelineOpen.play();
    
        for (let i = 0; i < spans.length; i++) {
          spans[i].classList.add("white");
        }
    
        spanOne.classList.add("spanOneRotate");
        spanTwo.classList.add("spanTwoRotate");
        spanThree.classList.add("spanThreeHide");

        backToGame.style.display = 'block';
        localStorage.money = 0;
        localStorage.record = 0;
    }
    else{
        backToGame.style.display = 'none';
        money = localStorage.money;
    }
    money = parseInt(money);
    moneyContainer.innerHTML = money;
    document.querySelector('.theBest').innerHTML = localStorage.record;
}
window.addEventListener( 'orientationchange', () => {
    location.reload();
});

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
            if (window.matchMedia("(max-width: 1000px)").matches) {
            this.speedY += 0.05;
            } else {
                this.speedY += 0.1;
            }
    
        }else {
            this.speedY -= this.y - (p1 - 15);
            this.y = p1 - 15;
            onGround = true;
        }

        let angle = Math.atan2((p2 - 15) - this.y, (this.x + 5) - this.x);
        this.y += this.speedY;

        if(onGround && Math.abs(this.rotate) > 1.6) { // смерть пожила
            this.x = canvas.width / 3;
            this.y = 0;
            this.speedY = 0;
            this.speedX = 0;
            this.rotate = 0;
            controller.w = 0;
            controller.s = 0;
            controller.a = 0;
            controller.b = 0;
            if(!localStorage.record) {
                parseInt(record);
                document.querySelector('.theBestRecord').innerHTML = record;
                localStorage.record = record;
            } else {
                parseInt(record)
                if(record > localStorage.record) {
                    document.querySelector('.theBestRecord').innerHTML = record;
                    localStorage.record = record;
                } else {
                    document.querySelector('.theBestRecord').innerHTML = localStorage.record;
                }
            }
            $('#totalScore').modal('show');
            window.stop(a);
        }
        document.querySelector('.btn-secondary').onclick = () => {
            location.reload();
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
        if (window.matchMedia("(max-width: 1000px)").matches) {
            if(!onGround && this.y < (p1 - 45) ) { 
                // console.log('не на землі', this.y)

                runBtn.ontouchstart = () => {
                    controller.w = 1;
                    controller.d = 1;
                    console.log('нажав ВПЕРЕД');
                }
                runBtn.ontouchend = () => {
                    controller.w = 0;
                    controller.d = 0;
                    controller.s = 0;
                    controller.a = 0;
                    console.log('отпустив ВПЕРЕД');
                }
                stopBtn.ontouchstart = () => {
                    controller.s = 1;
                    controller.a = 1;
                    console.log('нажав НАЗАД');
                }
                stopBtn.ontouchend = () => {
                    controller.s = 0;
                    controller.a = 0;
                    controller.w = 0;
                    controller.d = 0;
                    console.log('отпустив НАЗАД');
                }
            } 
        }
        

        if(onGround) { 
            this.rotate -=(this.rotate - angle) * 0.5;
            this.speedX = this.speedX - (angle - this.rotate);

        } 
        this.speedX += (controller.a - controller.d) * 0.05;
        
        this.rotate -= this.speedX * 0.1;
        if(this.rotate > Math.PI){
            this.rotate = -Math.PI;
            money += 500;
            localStorage.money = money;
            moneyContainer.innerHTML = money;
        } 
        else if(this.rotate < -Math.PI)
        {
            this.rotate = Math.PI;
            money += 500;
            localStorage.money = money;
            moneyContainer.innerHTML = money;
        } 
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotate);

        if (window.matchMedia("(max-width: 1000px)").matches) {
            ctx.drawImage(this.img, -40, -25, 70, 60);
        }else{
            ctx.drawImage(this.img, -40, -45, 100, 90);
        }
        
        ctx.restore();
    }
}


let time = 0; 
let speed = 0;


const controller = { // контроллер
    w: 0,
    s: 0,
    a: 0,
    d: 0
};
onkeydown = somekey => controller[somekey.key] = 1;
onkeyup = somekey => controller[somekey.key] = 0;
 
//покупка
document.querySelector('.cart1').onclick = () => {
    if(money >= 100) {
        car.img.src = "img/lvl1.png";
        $('#staticBackdrop').modal('hide');
        money = money - 100;
        localStorage.money = money;
        moneyContainer.innerHTML = localStorage.money;
        document.querySelector('.noBought1').classList.remove('noBought1');
    }else {
        alert('У вас не достаточно денег');
    }
}
document.querySelector('.cart2').onclick = () => {
    if(money >= 200) {
        car.img.src = "img/lvl2.png";
        $('#staticBackdrop').modal('hide');
        money = money - 200;
        localStorage.money = money;
        moneyContainer.innerHTML = localStorage.money;
        document.querySelector('.noBought2').classList.remove('noBought2');
    }else {
        alert('У вас не достаточно денег')
    }
}
document.querySelector('.cart3').onclick = () => {
    if(money >= 300) {
        car.img.src = "img/lvl3.png";
        $('#staticBackdrop').modal('hide');
        money = money - 300;
        localStorage.money = money;
        moneyContainer.innerHTML = localStorage.money;
        document.querySelector('.noBought3').classList.remove('noBought3');
    }else {
        alert('У вас не достаточно денег')
    }
}



// топливо и рекорд

let fuelCounter = 100;
function fuelAndCount () {
    if(controller.w > 0) {
        fuelCounter -= 0.04;
    }
    if(controller.s > 0) {
        fuelCounter -= 0.04;
    }

    if(fuelCounter < 0){
        //fuelCounter = 1;
        controller.w = 0;
        controller.s = 0;
        controller.a = 0;
        controller.b = 0;
        //alert("заправся бомж");
    }
    if(record < Math.floor(time/10) && speed > 0)
        record = Math.floor(time/10); 
    progress.style.width = fuelCounter + "%";
    recordContainer.innerHTML = Math.floor(record);
}
//монетки
let coinX = 1;
let coinY;
let coinSpawn = false;
let timer = 0;

function spawner(i) {
    //if (coinSpawn) return;
    
    //coinSpawn = true;
}
let coin = [];
coin.push({x:canvas.width - car.x,y:0});
let dx = 0;
let rand = 0;
let check = 0;
function game() {
    fuelAndCount();
    timer += 1;
    update();
    render();
    requestAnimationFrame(game);
}
function update() {
    speed -= (speed - (controller.w - controller.s)) * 0.01;
    time += 5 * speed;
    dx = canvas.width - time;
    rand = Math.floor(Math.random()*(150-50)+50);
}
function render() {
    ctx.fillStyle = "#19f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#81392A";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for(let i = 0; i < canvas.width; i++){
        ctx.lineTo(i, canvas.height - noise(time + i) * 0.25);
    }
    
    for(let i = 0; i < coin.length; i++) {
        if(record > check && timer%rand == 0){
            coin.push({x:canvas.width + Math.floor(time), y:((canvas.height - noise(canvas.width) * 0.25) - 40)});
            check = record;
            //coinSpawn =false;
        }
        //coin[i].y = ; 
        ctx.drawImage(coinImg,coin[i].x + dx,coin[i].y);
            if(coin[i].x + dx < car.x)
                coin.splice(i,1);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.fill();
    //spawner(canvas.height - noise(canvas.width + time) * 0.25);
    car.draw();
}
game();



// -----------------------------------Меню----------------------------




exit.onclick = () => {
    localStorage.clear();
    location.reload();
}

let timelineOpen = new mojs.Timeline({ speed: 1.5 });
let timelineClose = new mojs.Timeline({ speed: 2 });

let _strokeWidth;
let RADIUS = 15;
let hamburger = document.querySelector(".hamburger-open");

let spans = document.getElementsByClassName("spans");
let spanOne = document.querySelector("#spanOne");
let spanTwo = document.querySelector("#spanTwo");
let spanThree = document.querySelector("#spanThree");

let modalMenu = document.querySelector(".modal-menu");

let burst1 = new mojs.Burst({
  parent: hamburger,
  x: "50%",
  y: "50%",
  angle: { 0: 90 },
  radius: { 30: 45 },
  count: 3,
  children: {
    shape: "circle",
    radius: RADIUS,
    scale: { 1: 0 },
    fill: ["#ff4338", "#00b3e3", "#3cd52e"],
    duration: 2000,
    easing: "quad.out"
  }
});

let burst2 = new mojs.Burst({
  parent: hamburger,
  x: "50%",
  y: "50%",
  angle: { 0: 90 },
  radius: { 30: 45 },
  count: 3,
  children: {
    shape: "circle",
    radius: RADIUS,
    scale: { 0: 1 },
    strokeWidth: { 1: 3 },
    opacity: { 1: 0 },
    fill: "transparent",
    stroke: ["#ff4338", "#00b3e3", "#3cd52e"],
    duration: 2000,
    easing: "quad.out"
  }
});

// OPEN
let openBackground = new mojs.Shape({
  fill: "#111820",
  scale: { 0: 8.5 },
  radius: 200,
  delay: 1000,
  easing: "cubic.out",
  backwardEasing: "ease.out",
  duration: 2000
});

burst1.el.style.zIndex = 2;


let cross = spanOne.classList.contains("white");

timelineOpen.add(burst1, burst2, openBackground);

timelineClose.add(openBackground);

document.querySelector('.nameInstal').onclick = () => {
    localStorage.name =  document.querySelector('.name').value;
    backToGame.style.display = 'none';

    let cross = spanOne.classList.contains("white");

  modalMenu.classList.toggle("show");
    
    timelineClose.playBackward();
    for (let i = 0; i < spans.length; i++) {
      spans[i].classList.remove("white");
    }
    spanOne.classList.remove("spanOneRotate");
    spanTwo.classList.remove("spanTwoRotate");
    spanThree.classList.remove("spanThreeHide");
}

hamburger.addEventListener("click", function(e) {

  let cross = spanOne.classList.contains("white");

  modalMenu.classList.toggle("show");

  if (cross) {
    timelineClose.playBackward();
    for (let i = 0; i < spans.length; i++) {
      spans[i].classList.remove("white");
    }
    spanOne.classList.remove("spanOneRotate");
    spanTwo.classList.remove("spanTwoRotate");
    spanThree.classList.remove("spanThreeHide");
  } else {
    timelineOpen.play();

    for (let i = 0; i < spans.length; i++) {
      spans[i].classList.add("white");
    }

    spanOne.classList.add("spanOneRotate");
    spanTwo.classList.add("spanTwoRotate");
    spanThree.classList.add("spanThreeHide");
  }
});