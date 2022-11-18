var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');//Draw a 2d animation context.

canvas.width = 800;
canvas.height = 400;
// canvas.width = 1024;
// canvas.height = 576;


//Define the size of the context and use fillRect to draw the rectangle within color.
context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;


//Create a class to define the properties and methods. The player and the enemy will use it.
class Sprite {

    //The position and the velocity are arrays which their values been defined by two directions and 'this' peak to the calling-object.
    constructor ({position, velocity, color, offset}) {
        //All this properties are independent, can be used by any one.
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 100;
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: offset,
            width: 100,
            height: 50,
        };
        this.color = color;
        this.isAttacking;
        this.health = 100;
    
    }

    draw () {
        context.fillStyle = this.color;        
        context.fillRect(this.position.x, this.position.y, this.width, this.height);

        //Attack box
        if (this.isAttacking){
        context.fillStyle = 'blue'
        context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }

    update () {

        //Update the position of the box in real time.
        this.draw();   
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;
        
        this.position.x += this.velocity.x ; 
        this.position.y += this.velocity.y;

        // Avoid the box to fall out of the window.
        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }else this.velocity.y += gravity; //make the box always be pulled down to the ground.       
    }
    //hitting counts once for every touch
    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false
        },100)
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
    offset: {
        x : 0,
        y : 0 
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
    offset: {
        x : -50,
        y : 0 
    },
    color: 'pink'
})


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

// //@function for setting which status of these two boxes belong to collision
function rectangularCollision({rectangle1, rectangle2}) {
    return (
        (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.attackBox.position.y && 
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height) ||(rectangle1.attackBox.position.x >= rectangle2.position.x && 
            rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
            rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.attackBox.position.y && 
            rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height )
    )
}

//@new a function of boxes swapping places
function rectangleTurnAround({rectangle1, rectangle2}) {
    return
        rectangle1.position.x >= rectangle2.position.x + rectangle2.width
    }

let timer = 10;
function decreaseTimer() {
    if(timer > 0) timer--;
}

//Create a animate function to control the movement of the player and the enemy. 
function animate() {

    //Make the animation happen through refresh the scene every certain time. 
    window.requestAnimationFrame(animate);
    
    //Refresh the context to delete the trace of the movement.
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    // background.update();//!!!insert
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

    //@detect for swapping places

    if (rectangleTurnAround({
        rectangle1: player,
        rectangle2: enemy
    })) {
        player.attackBox.position.x  = player.position.x - 50;
        enemy.attackBox.position.x = enemy.position.x;
    }


    //detect for collision
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) && 
        player.isAttacking) {
        player.isAttacking = false;
        enemy.health -= 20;
        document.querySelector('#enemyHealth').style.width = enemy.health + '%';
    }

    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) && 
        enemy.isAttacking) {
        enemy.isAttacking = false;
        player.health -= 20;
        document.querySelector('#playerHealth').style.width = player.health + '%';
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
    case 's':
        player.attack();
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
    case 'ArrowDown':
        enemy.attack();
        break;

}
   
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
})






