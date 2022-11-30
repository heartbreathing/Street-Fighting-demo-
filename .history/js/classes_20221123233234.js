//Create a class to define the properties and methods. Rendering out the image.
class Sprite {

    //The position and the velocity are arrays which their values been defined by two directions and 'this' peak to the calling-object.
    constructor ({
        position,
        imageSrc,
        scale = {x: 1, y: 1},
        framesMax = 1,
        offset = {x: 0, y: 0}
        }) {
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
        this.framesHold = 5;
        this.offset = offset;
    }

    draw () {
        context.drawImage(
            this.image, 
            this.frameCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax, 
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.framesMax) * this.scale.x, 
            this.image.height * this.scale.x
            );        
    }

    animateFrame() {
        this.framesElapsed++;

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.frameCurrent < this.framesMax - 1) {
                this.frameCurrent++;
            } else {
                this.frameCurrent = 0;
            }
        }  
    }
    
    // used by the shop and control the speed of the change of the frames.  
    update () {
        this.draw();
        this.animateFrame();     
    }   
}

//Duplicate the class of Sprite. The player and the enemy will use it.
class Fighter extends Sprite {

    //The position and the velocity are arrays which their values been defined by two directions and 'this' peak to the calling-object.
    constructor ({
        position,
        velocity,
        color,
        imageSrc,
        scale = {x: 1, y: 1},
        framesMax = 1,
        offset = {x: 0, y: 0},
        sprites
        }) {
        
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        });
        //All this properties are independent, can be used by any one.
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
        this.frameCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.sprites = sprites;

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        };
        console.log(this.sprites);
    
    }


    // draw () {
    //     context.fillStyle = this.color;        
    //     context.fillRect(this.position.x, this.position.y, this.width, this.height);

    //     //Attack box
    //     if (this.isAttacking){
    //     context.fillStyle = 'blue'
    //     context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    //     }
    // }

    update () {
        //Update the position of the box in real time.
        this.draw();  
        this.animateFrame();         
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;
        
        
        this.position.x += this.velocity.x ; 
        this.position.y += this.velocity.y;

        // Gravity function. Avoid the box to fall out of the window.
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96){
            this.velocity.y = 0;
            this.position.y = 380;
        }else this.velocity.y += gravity; //make the box always be pulled down to the ground.     
        console.log(this.position);  
    }
    //hitting counts once for every touch
    attack() {
        this.switchSprite('attack1');
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false
        },100)
    }
    
    switchSprite(sprite) {
        if (this.image === this.sprites.attack1.image && 
            this.frameCurrent < this.sprites.attack1.framesMax - 1
            ) return;//if frameCurrent=0,the next step will not  be executed, otherwise it keep going to go. 

        switch (sprite) {
            case 'idle':
                if(this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.frameCurrent = 0;  
                }                         
            break;
            case 'run':
                if(this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax;  
                    this.frameCurrent = 0;  
                }                 
            break;
            case 'jump':
                if(this.image !== this.sprites.jump.image) {
                this.image = this.sprites.jump.image;
                this.framesMax = this.sprites.jump.framesMax; 
                this.frameCurrent = 0;              
                }
            break;
            case 'fall':
                if(this.image !== this.sprites.fall.image) {
                this.image = this.sprites.fall.image;
                this.framesMax = this.sprites.fall.framesMax; 
                this.frameCurrent = 0;              
                }
            break;
            case 'attack1':
                if(this.image !== this.sprites.attack1.image) {
                this.image = this.sprites.attack1.image;
                this.framesMax = this.sprites.attack1.framesMax; 
                this.frameCurrent = 0;              
                }
            break;
        }

    }
    flipSprite() {
        that = this;
        this.image = new Image();
        this.image.src = this.imageSrc;
        this.img.onload = function() {
            const flipImage = document.createElement('image');
            const ctx =         canvas.width = img.width;
            .getContext('2d');
            canvas.height = img.height;
            canvas.width = img.width;
        that.image.scale(-1, 1);
        that.image.translate(-this.img.width, 0);
        that.image.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
          );
        }                
    }


}