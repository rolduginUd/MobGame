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
let rotateControl = 0.05;

setInterval(() => {
    checkOrientation();
}, 50);
const checkOrientation = () => {
    if (canvas.width !== document.documentElement.clientWidth) {
        canvas.width = document.documentElement.clientWidth; 
        canvas.height = document.documentElement.clientHeight;      
    }
}
if (window.matchMedia("(max-width: 800px)").matches) {
    rotateControl = 0.03; // швидкість повороту машини на моб
    stopBtn.style.display = 'block';
    runBtn.style.display = 'block';
}

window.onload = () => {
    let cross = spanOne.classList.contains("white");

    modalMenu.classList.toggle("show");
    timelineOpen.play();

    for (let i = 0; i < spans.length; i++) {
      spans[i].classList.add("white");
    }

    spanOne.classList.add("spanOneRotate");
    spanTwo.classList.add("spanTwoRotate");
    spanThree.classList.add("spanThreeHide");

    if(!localStorage.name) {
        backToGame.style.display = 'block';
        localStorage.money = 0;
    }
    else{
        backToGame.style.display = 'none';
        money = localStorage.money;
        moneyContainer.textContent = ' ';
    }
    moneyContainer.textContent = money;
}

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
            this.x = canvas.width / 3;
            this.y = 0;
            this.speedY = 0;
            this.speedX = 0;
            this.rotate = 0;
            controller.w = 0;
            controller.s = 0;
            controller.a = 0;
            controller.b = 0;
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
        // if (window.matchMedia("(max-width: 1000px)").matches) {
            // if(!onGround && this.y < (p1 - 35) ) { 
            //     console.log('не на землі', this.y)
            //     controller.w = 0;
            //     controller.s = 0;
            //     runBtn.ontouchstart = () => {
            //         controller.d = 1;
            //     }
            //     runBtn.ontouchend = () => {
            //         controller.d = 0;
            //     }
            //     stopBtn.ontouchstart = () => {w
            //         controller.a = 1;
            //     }
            //     stopBtn.ontouchend = () => {
            //         controller.a = 0;
            //     }
            // } 
        // }
        

        if(onGround) { 
            this.rotate -=(this.rotate - angle) * 0.5;
            this.speedX = this.speedX - (angle - this.rotate);

        } 
        this.speedX += (controller.a - controller.d) * rotateControl;
        
        this.rotate -= this.speedX * 0.1;
        if(this.rotate > Math.PI){
            this.rotate = -Math.PI;
            money+= 500;
            localStorage.money = money;
            moneyContainer.textContent = money;
        } 
        if(this.rotate < -Math.PI)
        {
            this.rotate = Math.PI;
            money+= 500;
            localStorage.money = money;
            moneyContainer.textContent = money;
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
        moneyContainer.textContent = localStorage.money;
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
        moneyContainer.textContent = localStorage.money;
        document.querySelector('.noBought1').classList.remove('noBought2');
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
        moneyContainer.textContent = localStorage.money;
        document.querySelector('.noBought1').classList.remove('noBought3');
    }else {
        alert('У вас не достаточно денег')
    }
}

// топливо
let fuelCounter = 100;
function fuel () {
    if(controller.w > 0) 
        fuelCounter -= 0.04;

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
//монетки
let coinX = 1;
let coinY;
let coinSpawn = false;
function spawner() {

    if (coinSpawn) return;
    coinY = (canvas.height - noise(time + canvas.width) * 0.25) + 735;  
    coinSpawn = true;
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

    for(let i = 0; i < canvas.width; i++){
        ctx.lineTo(i, canvas.height - noise(time + i) * 0.25);
        spawner();
    }
    
    coinX = canvas.width - time;
    ctx.drawImage(coinImg,coinX,coinY);

    ctx.lineTo(canvas.width, canvas.height);
    ctx.fill();

    car.draw();

    requestAnimationFrame(loop);
}

loop();




// -----------------------------------Меню----------------------------


document.querySelector('.nameInstal').onclick = () => {
    localStorage.name =  document.querySelector('.name').value;
    backToGame.style.display = 'none';
}

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