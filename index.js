const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');//Draw a 2d animation context.

canvas.width = 1024;
canvas.height = 576;


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

const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: './img/shop.png',
    scale:{
        x: 2.75,
        y: 1
    },
    framesMax: 6
});

//Instance object of the class Fighter.
const player = new Fighter({
    position:{
        x : 0,
        y : 0
    },
    velocity: {
        x : 0,
        y : 0  
    },
    offset: {
        x : 0,
        y : 0 
    },
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale:{
        x: 2.5,
        y: 1
    },
    offset : {
        x: 215, 
        y: 205
    },
    sprites: {
        idleRight: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax: 8,
        },
        runRight: {
            imageSrc: './img/samuraiMack/Run.png',
            framesMax: 8,
        },
        jumpRight: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 2,
        },
        fallRight: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax: 2,
        },
        attack1Right: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6,
        },
        idleLeft: {
            imageSrc: './img/samuraiMack/Idle-left.png',
            framesMax: 8,
        },
        runLeft: {
            imageSrc: './img/samuraiMack/Run-left.png',
            framesMax: 8,
        },
        jumpLeft: {
            imageSrc: './img/samuraiMack/Jump-left.png',
            framesMax: 2,
        },
        fallLeft: {
            imageSrc: './img/samuraiMack/Fall-left.png',
            framesMax: 2,
        },
        attack1Left: {
            imageSrc: './img/samuraiMack/Attack1-left.png',
            framesMax: 6,
        }

    }
})


//Instance object of the class Fighter.
const enemy = new Fighter({
    position:{
        x :300,
        y : 100
    },
    velocity: {
        x : 0,
        y : 0  
    },
    offset: {
        x : -50,
        y : 0 
    },
    imageSrc: './img/kenji/Idle.png',
    framesMax: 4,
    scale:{
        x: 2.5,
        y: 1
    },
    offset : {
        x: 215, 
        y: 220
    },
    sprites: {
        idleLeft: {
            imageSrc: './img/kenji/Idle.png',
            framesMax: 4,
        },
        runLeft: {
            imageSrc: './img/kenji/Run.png',
            framesMax: 8,
        },
        jumpLeft: {
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2,
        },
        fallLeft: {
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2,
        },
        attack1Left: {
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4,
        },
        idleRight: {
            imageSrc: './img/kenji/Idle-right.png',
            framesMax: 4,
        },
        runRight: {
            imageSrc: './img/kenji/Run-right.png',
            framesMax: 8,
        },
        jumpRight: {
            imageSrc: './img/kenji/Jump-right.png',
            framesMax: 2,
        },
        fallRight: {
            imageSrc: './img/kenji/Fall-right.png',
            framesMax: 2,
        },
        attack1Right: {
            imageSrc: './img/kenji/Attack1-right.png',
            framesMax: 4,
        } 

    }
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
let lastDirection;
decreaseTimer();

//Create a animate function to control the movement of the player and the enemy. 
let gameOver = false;
function animate() {

    //'requestAnimationFrame()' means making the animation happen through refreshing the scene every certain time. 
    window.requestAnimationFrame(animate);
    
    
    //Refresh the context to delete the trace of the movement.
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //(&& lastKey === '') means only the last key you pressed can control the direction, when you press two keys.
    // player movement
    
    if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -5;
        player.switchSprite('runLeft');
        player.lastDirection = 'left';
    }else if (keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 5;
        player.switchSprite('runRight');
        player.lastDirection = 'right';
    }else if (player.velocity.y === 0) {
        if (player.lastDirection === 'left') player.switchSprite('idleLeft')
        else player.switchSprite('idleRight')
      }

    //jumping
    if (player.velocity.y < 0 && lastDirection === 'left') {
        player.switchSprite('jumpLeft');
    }else if (player.velocity.y < 0 && lastDirection === 'right') {
        player.switchSprite('jumpRight');
    }else if(player.velocity.y > 0 && lastDirection === 'left') {
        player.switchSprite('fallLeft');
    }else if (player.velocity.y > 0 && lastDirection === 'right') {
        player.switchSprite('fallRight');
    }
   

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
        enemy.switchSprite('runLeft');
        enemy.lastDirection = 'left';
    }else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
        enemy.switchSprite('runRight');
        enemy.lastDirection = 'right';
    }else if (enemy.velocity.y === 0) {
        if (enemy.lastDirection === 'right') enemy.switchSprite('idleRight')
        else enemy.switchSprite('idleLeft')
      }

    //jumping
    if (enemy.velocity.y < 0 && lastDirection === 'left') {
        enemy.switchSprite('jumpLeft');
    }else if (enemy.velocity.y < 0 && lastDirection === 'right') {
        enemy.switchSprite('jumpRight');
    }else if(enemy.velocity.y > 0 && lastDirection === 'left') {
        enemy.switchSprite('fallLeft');
    }else if (enemy.velocity.y > 0 && lastDirection === 'right') {
        enemy.switchSprite('fallRight');
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
        lastDirection = 'right';
        break;
    case 'a':
        keys.a.pressed = true;
        lastKey = 'a';
        lastDirection = 'left';
        break;
    case 'w':
        player.velocity.y = -20;
        break;
    case 's':
        player.attack();
        break;

    case 'ArrowLeft':
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = 'ArrowLeft';
        lastDirection = 'left';
        break;
    case 'ArrowRight':
        keys.ArrowRight.pressed = true;
        enemy.lastKey = 'ArrowRight';
        lastDirection = 'right';
        break;
    case 'ArrowUp':
        enemy.velocity.y = -20;
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






