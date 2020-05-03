let canvas = document.createElement("canvas"); // створюємо канвас
let ctx = canvas.getContext("2d");
canvas.width = 500; // розміри "вікна"
canvas.height = 300;
document.body.appendChild(canvas); // відображаєм вікно

let noise = x => {
    return
}

function loop() {
    ctx.fillStyle = "#19f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(loop);
}