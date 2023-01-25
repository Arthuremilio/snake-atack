let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let score = document.getElementById('score')
snake[0] ={
    x: 7 * box,
    y: 7 * box
}
let direction = "right";
let food ={
    x: Math.floor(Math.random() * 13 + 1) * box,
    y: Math.floor(Math.random() * 13 + 1) * box
}

function criarBG(){
    context.fillStyle = "black";
    context.fillRect(0, 0, 14*box, 14*box,); 
}


function criarCobrinha (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "blue";
        context.fillRect(snake[i].x, snake[i].y, box, box,);
        var upscore = 10 * snake.length
        score.innerHTML = `SCORE ${upscore}`
    }
}

function drawFood (){
    context.fillStyle = "yellow";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';  
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function controle(event){
    direction = event.id
}


function iniciarJogo(){    
    let pontuação = document.querySelector("#score").innerHTML
    console.log(pontuação)
    

    if(snake[0].x > 13*box && direction == "right") snake[0].x = 0
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 14 * box
    if(snake[0].y > 13*box && direction == "down") snake[0].y = 0
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 14 * box
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo)
            window.alert(` Game Over 😣 \n ${pontuação}`)
            location.reload()
            
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){

        snake.pop(); 

    }
    
    else{
        food.x = Math.floor(Math.random() * 13 +1) * box;
        food.y = Math.floor(Math.random() * 13+1) * box;
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); 

}

let jogo = setInterval(iniciarJogo, 140);
