var canvas = document.getElementById("pong");
var context = canvas.getContext("2d");


const ball={
    x:canvas.width/2,
    y:canvas.height/2,
    radius:10,
    velocityX:5,
    velocityY:5,
    speed:8,
    color: "WHITE"
}

const user={
    x:1,
    y:(canvas.height-100)/2,
    width:10,
    height:70,
    score:0,
    color: "WHITE"
    
}

const com={
    x:(canvas.width-11),
    y:(canvas.height-100)/2,
    width:10,
    height:70,
    score:0,
    color:"WHITE"
}

const net={
    x:(canvas.width-2)/2,
    y:0,
    height:10,
    width:2,
    color:"WHITE"
}
 

function drawRectangle(x,y,w,h,color)
{
      context.fillStyle=color;
      context.fillRect(x,y,w,h);
}


function drawCircle(x,y,r,color)
{
    context.fillStyle=color;
    context.beginPath();
    context.arc(x,y,r, 0, 2 * Math.PI, true);
    context.closePath();
    context.fill();

}

   
canvas.addEventListener("mousemove",getMousePosition);

function getMousePosition(e){
    let rectangle= canvas.getBoundingClientRect();
    user.y=e.clientY- rectangle.top - user.height/2;  
}

function resetBall(){
    ball.x=canvas.width/2;
    ball.y=canvas.height/2;
    ball.velocityX=-ball.velocityX;
    ball.speed=7;
}

function drawNet()
{
    for(let i=0 ; i<= canvas.height;i+=15)
    {
        drawRectangle(net.x, net.y+i, net.width, net.height, net.color);  
    }
}
   

function drawText(text,x,y)
{
    context.fillStyle="WHITE";
    context.font="75px fantasy";
    context.fillText(text, x, y);
}


function collision(b,p)
{
     p.top=p.y;
     p.bottom=p.y+ p.height;
     p.left=p.x;
     p.right=p.x+p.width;

     b.top=b.y-b.radius;
     b.bottom=b.y+b.radius;
     b.left=b.x-b.radius;
     b.right=b.x+b.radius;

     return b.right> p.left && b.bottom>p.top && b.left< p.right && b.top <p.bottom;
}


function update(){
    if(ball.x-ball.radius <0)
    {
        com.score++;
        resetBall();
    }else if(ball.x + ball.radius >canvas.width)
    {
        user.score++;
        resetBall();
    }

    ball.x+=ball.velocityX;
    ball.y+=ball.velocityY;

    com.y+=(ball.y - (com.y + com.height/2))*0.1;

    if(ball.y - ball.radius <0 || ball.y +ball.radius >canvas.height)
    {
        ball.velocityY=-ball.velocityY;
    } 

    let player = (ball.x + ball.radius < canvas.width/2) ? user : com;

    if(collision(ball,player))
    {
        let collidePoint=(ball.y - (player.y + player.height/2));
        collidePoint=collidePoint / (player.height/2);
         
         
        let angleRad= (Math.PI/4) * collidePoint;

        let direction =(ball.x + ball.radius<canvas.width/2) ? 1 : -1;
        ball.velocityX= direction * ball.speed * Math.cos(angleRad);
        ball.velocityY= ball.speed * Math.sin(angleRad);

        ball.speed+=0.1;
    }
} 


function toDo(){
       drawRectangle(0,0, canvas.width, canvas.height, "#6495ED");

       drawText(user.score, canvas.width/4, canvas.height/5);

       drawText(com.score, 3*canvas.width/4, canvas.height/5);

       drawNet();

       drawRectangle(user.x, user.y, user.width, user.height, user.color);

       drawRectangle(com.x, com.y, com.width, com.height, com.color);

       drawCircle(ball.x, ball.y, ball.radius, ball.color);
}
toDo();
context.font = "55px Arial";
context.fillStyle="WHITE";
context.fillText("Press any key to start",150,170);

document.addEventListener('keypress', checkPress);

function game(){
    update();
    toDo();
}

let fps=50;

function checkPress(){
    let loop= setInterval(game,1000/fps);
}

