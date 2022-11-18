var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 300;

// context.fillRect(0, 0, canvas.width, canvas.height);
// context.fillStyle = 'rgba(0,255,0,0)';

const gravity = 0.5;

let image = document.createElement('img');


const background = new Sprite({
    position: {
        x : 0;
        y : 0;
    }
    

})

function animate() {
    window.requestAnimationFrame(animate);
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';

}
animate()






