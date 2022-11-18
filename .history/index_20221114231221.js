var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

// canvas.width = 1024;
// canvas.height = 576;
canvas.width = 700;
canvas.height = 400;

context.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
    constructor ({position,velocity}) {
        this.position = position,
        this.velocity = velocity
    }
    draw () {
        context.fillStyle = 'pink';
        context.fillRect(this.position.x, this.position.y, 50, 100);
    }

    update () {
        this.draw();
        this.position.y += 10;
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




const enemy = new Sprite({
    position:{
        x :300,
        y : 100
    },
    velocity: {
        x : 0,
        y : 0  
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




function animate() {
    window.requestAnimationFrame(animate);
    player.update();
    enemy.update();
    // context.fillRect(0, 0, canvas.width, canvas.height);
    // context.fillStyle = 'black';
    // background.update();
    // c.fillStyle = 'rgba(255, 255, 255, 0.15)'

}
animate()






