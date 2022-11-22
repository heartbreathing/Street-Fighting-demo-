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