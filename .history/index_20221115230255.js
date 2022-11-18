var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');//draw a 2d animation context.

// canvas.width = 1024;
// canvas.height = 576;
canvas.width = 700;
canvas.height = 400;

//define the size of the context and use fillRect to draw the rectangle within color.
context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

//
class Sprite {
    constructor ({position,velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.height = 60;
    }
    draw () {
        context.fillStyle = 'pink';
        context.fillRect(this.position.x, this.position.y, 40, this.height);
    }

    update () {
        this.draw();       
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }else this.velocity.y += gravity; 
        
    }
}

const player = new Sprite({
    position:{
        x : 0,
        y : 0
    },
    velocity: {
        x : 0,
        y : 10  
    }
})




const enemy = new Sprite({
    position:{
        x :300,
        y : 100
    },
    velocity: {
        x : 0,
        y : 10  
    }
})


console.log(player);
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

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
}

//make sure when you press two keys at the same time, the last key you pressed works.
let lastKey;

function animate() {
    window.requestAnimationFrame(animate);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //&& lastKey === '' means only the last key you pressed can control the direction, when you press two keys.
    if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -1
    }else if (keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 1
    }
    if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
        enemy.velocity.x = -1
    }else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
        enemy.velocity.x = 1
    }
    // context.fillRect(0, 0, canvas.width, canvas.height);
    // context.fillStyle = 'black';
    // background.update();
    // c.fillStyle = 'rgba(255, 255, 255, 0.15)'

}
animate();


window.addEventListener('keydown', (event) => {
switch (event.key) {
    case 'd':
        keys.d.pressed = true;
        lastKey = 'd';
        break;
    case 'a':
        keys.a.pressed = true;
        lastKey = 'a';
        break;
    case 'ArrowLeft':
        keys.ArrowLeft.pressed = true;
        lastKey = 'ArrowLeft';
        break;
    case 'ArrowRight':
        keys.ArrowRight.pressed = true;
        lastKey = 'ArrowRight';
        break;

}
    console.log(event.key);
})
window.addEventListener('keyup', (event) => {
switch (event.key) {
    case 'd':
        keys.d.pressed = false;
        break;
    case 'a':
        keys.a.pressed = false;
        break;
    case 'ArrowLeft':
        keys.ArrowLeft.pressed = false;
        break;
    case 'ArrowRight':
        keys.ArrowRight.pressed = false;
        break;
}
    console.log(event.key);
})






