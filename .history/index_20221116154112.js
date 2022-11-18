var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');//Draw a 2d animation context.

canvas.width = 900;
canvas.height = 400;
// canvas.width = 1024;
// canvas.height = 576;


//Define the size of the context and use fillRect to draw the rectangle within color.
context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

//Create a class to define the properties and methods. The player and the enemy will use it.
class Sprite {

    //The position and the velocity are arrays which their values been defined by two directions and 'this' peak to the calling-object.
    constructor ({position, velocity, color}) {
        //All this properties are independent, can be used by any one.
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey;
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50,
        };
        this.color = color;
        this.isAttacking;
    
    }

    //The two boxes.
    draw () {
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);

        //Attack box
        context.fillStyle = 'blue'
        context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }

    update () {

        //Update the position of the box in real time.
        this.draw();       
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Avoid the box to fall out of the window.
        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }else this.velocity.y += gravity; //make the box always be pulled down to the ground.       
    }
    attack() {
        this.isAttacking = true;
        setTimeout
    }
}

//Instance object of the class Sprite.
const player = new Sprite({
    position:{
        x : 0,
        y : 0
    },
    velocity: {
        x : 0,
        y : 10  
    },
    color: 'red'
})


//Instance object of the class Sprite.
const enemy = new Sprite({
    position:{
        x :300,
        y : 100
    },
    velocity: {
        x : 0,
        y : 10  
    },
    color: 'pink'
})


console.log(player);


//Declare initial keys.
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

//Create a lastKey to set the status of the last key.
let lastKey;


//Create a animate function to control the movement of the player and the enemy. 
function animate() {

    //Make the animation happen through refresh the scene every certain time. 
    window.requestAnimationFrame(animate);
    
    //Refresh the context to delete the trace of the movement.
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //(&& lastKey === '') means only the last key you pressed can control the direction, when you press two keys.
    // player movement
    if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -5
    }else if (keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 5
    }

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    }else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }

    //detect for collision
    if (player.attackBox.position.x + player.attackBox.width >= enemy.position.x && player.position.x <= enemy.position.x + enemy.width && player.attackBox.position.y + player.attackBox.height >= enemy.attackBox.position.y && player.attackBox.position.y <= enemy.position.y + enemy.height && player.isAttacking) {

    }
    

}
animate();

//Listen for the movement of keydown and keyup.
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
    case 'w':
        player.velocity.y = -10;
        break;

    case 'ArrowLeft':
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = 'ArrowLeft';
        break;
    case 'ArrowRight':
        keys.ArrowRight.pressed = true;
        enemy.lastKey = 'ArrowRight';
        break;
    case 'ArrowUp':
        enemy.velocity.y = -10;
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
}
switch (event.key){
    case 'ArrowLeft':
        keys.ArrowLeft.pressed = false;
        break;
    case 'ArrowRight':
        keys.ArrowRight.pressed = false;
        break;
}
    console.log(event.key);
})






