var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

// canvas.width = 1024;
// canvas.height = 576;
canvas.width = 700;
canvas.height = 400;

context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

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
    }
}


function animate() {
    window.requestAnimationFrame(animate);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    if (keys.a.pressed) {
        play
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
        player.velocity.x = 1;
        break;
    case 'a':
        player.velocity.x = -1;
        break;
}
    console.log(event.key);
})
window.addEventListener('keyup', (event) => {
switch (event.key) {
    case 'd':
        player.velocity.x = 0;
        break;
    case 'a':
        player.velocity.x = 0;
        break;
}
    console.log(event.key);
})






