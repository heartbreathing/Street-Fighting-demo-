var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');//Draw a 2d animation context.

canvas.width = 800;
canvas.height = 400;
// canvas.width = 1024;
// canvas.height = 576;


//Define the size of the context and use fillRect to draw the rectangle within color.
context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
});
const player = new Fighter({
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


//Instance object of the class Fighter.
const enemy = new Fighter({
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
    s:{
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
    },
    ArrowDown: {
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
    return(rectangle1.position.x >= rectangle2.position.x + rectangle2.width);
}


//Create a function of determining winner within a timer function 
function determineWinner({player, enemy, timerId}) {
    clearTimeout(timerId);
    if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'player 2 Win';
    } else if (player.health > enemy.health){
        document.querySelector('#displayText').innerHTML = 'Player 1 Win';
    }else if (player.health === enemy.health){        
        document.querySelector('#displayText').innerHTML = 'Tie';
    }
}

let timer = 60;
let timerId;
function decreaseTimer() {    
     if(timer > 0) {
        timerId = setTimeout(decreaseTimer,1000);
        timer--;
        document.querySelector('#timer').innerHTML = timer;  
    }
    if(timer === 0) {
        determineWinner({player, enemy, timerId});
    }    
}
decreaseTimer();

//Create a animate function to control the movement of the player and the enemy. 
let gameOver = false;
function animate() {

    //'requestAnimationFrame()' means making the animation happen through refreshing the scene every certain time. 
    window.requestAnimationFrame(animate);
    
    
    //Refresh the context to delete the trace of the movement.
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    background.u
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
        player.isAttacking &&( gameOver === false)) {
        player.isAttacking = false;
        enemy.health -= 20;
        document.querySelector('#enemyHealth').style.width = enemy.health + '%';
    }

    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) && 
        enemy.isAttacking &&( gameOver === false)) {
        enemy.isAttacking = false;
        player.health -= 20;
        document.querySelector('#playerHealth').style.width = player.health + '%';
    }  
    

    // end game based on health
    if ((player.health <= 0 || enemy.health <= 0) &&( gameOver === false)) {
        determineWinner({player, enemy, timerId});
        gameOver = true;
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






