var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

canvas.width = 200;
canvas.height = 200;

context.fillRect(0, 0, canvas.width, canvas.height);


const gravity = 0.5;

function animate() {
    window.requestAnimationFrame(animate)
    context.fillStyle = 'white'
}






