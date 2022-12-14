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
        sprites,
        lastDirection
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
            width: 200,
            height: 50,
        };
        this.color = color;
        this.isAttacking;
        this.health = 100;
        this.frameCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.sprites = sprites;
        this.lastDirection = lastDirection;

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        };
        console.log(this.sprites);
    
    }


    update () {
        //Update the position of the box in real time.
        this.draw();  
        this.animateFrame();  
        
        //the direction of the attackBox is depend on the characters lastDirection.
        if (this.lastDirection === 'right') {
            this.attackBox.position.x = this.position.x;
            this.attackBox.position.y = this.position.y;
        } else if (this.lastDirection === 'left') {
            this.attackBox.position.x = this.position.x - 150 ;
            this.attackBox.position.y = this.position.y;
        }        
        
        
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
        if (this.lastDirection === 'left'){
            this.switchSprite('attack1Left');
        }
        else if(this.lastDirection === 'right'){
            this.switchSprite('attack1Right');
        }
        // this.switchSprite('attack1');
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false
        },100)
    }
    
    switchSprite(sprite) {

        if ((this.image === this.sprites.attack1Left.image && 
        this.frameCurrent < this.sprites.attack1Left.framesMax - 1) || 
        (this.image === this.sprites.attack1Right.image && 
        this.frameCurrent < this.sprites.attack1Right.framesMax - 1)) return;
       

        switch (sprite) {
            case 'idleRight':
                if(this.image !== this.sprites.idleRight.image) {
                    this.image = this.sprites.idleRight.image;
                    this.framesMax = this.sprites.idleRight.framesMax;
                    this.frameCurrent = 0;  
                }                         
            break;
            case 'runRight':
                if(this.image !== this.sprites.runRight.image) {
                    this.image = this.sprites.runRight.image;
                    this.framesMax = this.sprites.runRight.framesMax;  
                    this.frameCurrent = 0;  
                }                 
            break;
            case 'jumpRight':
                if(this.image !== this.sprites.jumpRight.image) {
                this.image = this.sprites.jumpRight.image;
                this.framesMax = this.sprites.jumpRight.framesMax; 
                this.frameCurrent = 0;              
                }
            break;
            case 'fallRight':
                if(this.image !== this.sprites.fallRight.image) {
                this.image = this.sprites.fallRight.image;
                this.framesMax = this.sprites.fallRight.framesMax; 
                this.frameCurrent = 0;              
                }
            break;
            case 'attack1Right':
                if(this.image !== this.sprites.attack1Right.image) {
                this.image = this.sprites.attack1Right.image;
                this.framesMax = this.sprites.attack1Right.framesMax; 
                this.frameCurrent = 0;              
                }
            break;
            case 'idleLeft':
                if(this.image !== this.sprites.idleLeft.image) {
                    this.image = this.sprites.idleLeft.image;
                    this.framesMax = this.sprites.idleLeft.framesMax;
                    this.frameCurrent = 0;  
                }                         
            break;
            case 'runLeft':
                if(this.image !== this.sprites.runLeft.image) {
                    this.image = this.sprites.runLeft.image;
                    this.framesMax = this.sprites.runLeft.framesMax;  
                    this.frameCurrent = 0;  
                }                 
            break;
            case 'jumpLeft':
                if(this.image !== this.sprites.jumpLeft.image) {
                this.image = this.sprites.jumpLeft.image;
                this.framesMax = this.sprites.jumpLeft.framesMax; 
                this.frameCurrent = 0;              
                }
            break;
            case 'fallLeft':
                if(this.image !== this.sprites.fallLeft.image) {
                this.image = this.sprites.fallLeft.image;
                this.framesMax = this.sprites.fallLeft.framesMax; 
                this.frameCurrent = 0;              
                }
            break;
            case 'attack1Left':
                if(this.image !== this.sprites.attack1Left.image) {
                this.image = this.sprites.attack1Left.image;
                this.framesMax = this.sprites.attack1Left.framesMax; 
                this.frameCurrent = 0;              
                }
            break;
        }

    }

}