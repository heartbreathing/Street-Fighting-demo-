var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 300;

context.fillRect(0, 0, canvas.width, canvas.height);
context.fillStyle = 'white';

const gravity = 0.5;

function animate() {
    window.requestAnimationFrame(animate)
    context.fillStyle = 'white'
}






