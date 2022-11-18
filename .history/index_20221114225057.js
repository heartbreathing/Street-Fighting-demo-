var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

context.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
    constructor (position,velocity) {
        this.position = position,
        this.velocity = velocity
    }
    draw () {
        context.fillStyle = 'pink';
        context.fillRect(this.position.x, this.position.y, 50, 100);
    }
}

const player = new Sprite({
    position:{
        x : 0,
        y : 0
    },
    velocity: {
        x : 0,
        y : 0  
    }

})

player.draw();
console.log(player);

const enemy = new Sprite({
    position:{
    x : 0,
    y : 0
    },
    velocity: {
        x : 0,
        y : 0  
    }

})

enemy.draw();
// context.fillStyle = 'rgba(0,255,0,0)';




// const gravity = 0.5;

// let image = document.createElement('img');
// image.src = imgURL;  //May choose a API 
// canvas.append(image);

// const background = new Sprite({
//     position: {
//         x : 0,
//         y : 0
//     },    
//     // imageSrc: './img/background.png'
// })




function animate() {
    window.requestAnimationFrame(animate);
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
    background.update();
    // c.fillStyle = 'rgba(255, 255, 255, 0.15)'

}
// animate()






