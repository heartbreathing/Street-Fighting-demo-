//Create a class to define the properties and methods. Rendering out the image.
class Sprite {

    //The position and the velocity are arrays which their values been defined by two directions and 'this' peak to the calling-object.
    constructor ({position, imageSrc, scale = 1, framesMax = 1}) {
        //All this properties are independent, can be used by any one.
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.frameCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 10;
    }

    draw () {
        context.drawImage(
            this.image, 
            this.frameCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax, 
            this.image.height,
            this.position.x, 
            this.position.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale
            );        
    }

    update () {
        this.draw();
        this.
        if (this.frameCurrent < this.framesMax - 1) {
            this.frameCurrent++;
        } else {
            this.frameCurrent = 0;
        }
                 
    }   
}

//Duplicate the class of Sprite. The player and the enemy will use it.
class Fighter {

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
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96){
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