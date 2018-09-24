var player_one;
var player_two;
var ball;
var goal_one;
var goal_two;
var po_points = 0, pt_points = 0;
var score = document.getElementById('score');
var win = document.getElementById('winner');
var menu = document.getElementById('menu');

function play(){
  menu.style.display = "none";
  pitch.start();
  // pitch.elements();
  player_one = new Player(30, 30, 250, 350, "white");
  player_two = new Player(30, 30, 750, 350, "blue");
  ball = new Ball(500, 300, "black");
  goal_one = new Goal(10, 100, 0, 300, "white");
  goal_two = new Goal(10, 100, 1035, 300, "blue");


}
// Boisko
var pitch = {
  canvas: document.createElement('canvas'),
  start: function(){
    this.canvas.width = 1045;
    this.canvas.height = 700;
    this.canvas.id = 'canvas';
    this.canvas.className = 'canvas';
    this.ctx = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updatePitch, 20); //gra dziala w 50 klatkach/s

    window.addEventListener('keydown', function(e){
      pitch.keys = (pitch.keys || []);
      pitch.keys[e.keyCode] = (e.type == 'keydown');
    })

    window.addEventListener('keyup', function(e){
      pitch.keys[e.keyCode] = (e.type == 'keydown');
    })
  },
  // elements: function(){ //rysowanie lini dzielacej polowy boiska oraz okrag srodkowy
  //   ctx = pitch.ctx;
  //   ctx.moveTo(500, 0);
  //   ctx.lineTo(500, 600);
  //   ctx.strokeStyle = '#fff';
  //   ctx.stroke();
  //
  //   ctx.beginPath();
  //   ctx.arc(500, 300, 70, 0, 2*Math.PI);
  //   ctx.stroke();
  // },
  clear: function(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

}
// Konstruktor pilki
var Ball = function(x, y, color){
  this.r = 10;
  this.startangle = 0;
  this.endangle = 2*Math.PI;
  this.x = x;
  this.y = y;
  this.dx = 8;
  this.dy = -3;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function(){
    ctx = pitch.ctx;
    ctx.beginPath();

    ctx.arc(this.x, this.y, this.r, this.startangle, this.endangle);
    ctx.fillStyle = color;
    ctx.fill(); // wypelnieie pilki kolorem
    ctx.stroke(); // rysowanie pilki
  }
  this.position = function(){
    this.x += this.speedX;
    this.y += this.speedY;
  }

}
// Konstruktor gracza
var Player = function(width, height, x, y, color){
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function(){
    ctx = pitch.ctx;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

  }
  this.position = function(){
    this.x += this.speedX;
    this.y += this.speedY;
  }



}
//konstruktor bramki
var Goal = function(width, height, x, y, color){
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = function(){
    ctx = pitch.ctx;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
//reset
function reset(){
  var points1 = po_points;
	var points2 = pt_points;
	player_one = new Player(30, 30, 250, 350, "white");
	po_points = points1;
	player_two = new Player(30, 30, 750, 350, "blue");
	pt_points = points2;
	ball = new Ball(500, 300, "black");
}
//kolizja pilki z graczem
function collide(ball, player_one){
  var distX = Math.abs(ball.x - player_one.x - player_one.width/2);
  var distY = Math.abs(ball.y - player_one.y - player_one.height/2);

  if(distX > (player_one.width/2 + ball.r)) return false;
  if(distY > (player_one.height/2 + ball.r)) return false;

  if(distX <= (player_one.width/2)) return true;
  if(distY <= (player_one.height/2)) return true;

  var dx = distX - player_one.width / 2;
  var dy = distY - player_one.height / 2;

  return (dx * dx + dy * dy <= (ball.r * ball.r));
}
//kolizja pilki z bramka
function collideGoal(ball, goal){
  var distX = Math.abs(ball.x - goal.x - goal.width/2);
  var distY = Math.abs(ball.y - goal.y - goal.height/2);

  if(distX > (goal.width/2 + ball.r)) return false;
  if(distY > (goal.height/2 + ball.r)) return false;

  if(distX <= (goal.width/2)) return true;
  if(distY <= (goal.height/2)) return true;

  var dx = distX - goal.width / 2;
  var dy = distY - goal.height / 2;

  return (dx * dx + dy * dy <= (ball.r * ball.r));
}

//goal
function checkGoal(){
    //GOL!!!!
    if(collideGoal(ball, goal_one)){
      pt_points++;
      console.log("Blue: " + pt_points);
      reset();
    }
    if(collideGoal(ball, goal_two)){
      po_points++;
      console.log("White: " + po_points);
      reset();
    }

}
//winner
function checkWin(){
  if(pt_points == 10){
    score.innerHTML =  po_points + ":" + pt_points + "<br>" + "BLUE WINNER" + "<br>" + "F5 TO REFRESH";
    clearInterval(pitch.interval);
  }
  if(po_points == 10){
    score.innerHTML =  po_points + ":" + pt_points + "<br>" + "WHITE WINNER" + "<br>" + "F5 TO REFRESH";
    clearInterval(pitch.interval);
  }
}
//sterowanie
function movePlayer(){
  player_one.speedX = 0;
  player_one.speedY = 0;

  if(pitch.keys && pitch.keys[65]) {
    player_one.speedX -= 6;
  }
  if(pitch.keys && pitch.keys[87]) {
    player_one.speedY -= 6;
  }
  if(pitch.keys && pitch.keys[68]) {
    player_one.speedX = 6;
  }
  if(pitch.keys && pitch.keys[83]) {
    player_one.speedY = 6;
  }

  player_two.speedX = 0;
  player_two.speedY = 0;

  if(pitch.keys && pitch.keys[37]) {
    player_two.speedX -= 6;
  }
  if(pitch.keys && pitch.keys[38]) {
    player_two.speedY -= 6;
  }
  if(pitch.keys && pitch.keys[39]) {
    player_two.speedX = 6;
  }
  if(pitch.keys && pitch.keys[40]) {
    player_two.speedY = 6;
  }

}
//kolizja gracz - sciana
function playerWallCollide(){
  //kolizja ze sciana player_one
  if(player_one.x < 0) player_one.x = 0;
  if(player_one.y < 0) player_one.y = 0;
  if(player_one.x + player_one.width > canvas.width) player_one.x = canvas.width - player_one.width;
  if(player_one.y + player_one.height > canvas.height) player_one.y = canvas.height - player_one.height;
  //kolizja ze sciana player_two
  if(player_two.x < 0) player_two.x = 0;
  if(player_two.y < 0) player_two.y = 0;
  if(player_two.x + player_two.width > canvas.width) player_two.x = canvas.width - player_two.width;
  if(player_two.y + player_two.height > canvas.height) player_two.y = canvas.height - player_two.height;
}
//odbicie pilki od sciany
function ballWall(){
  // odbicie pilki
  if(ball.x + ball.dx > canvas.width - ball.r || ball.x + ball.dx < ball.r){
     ball.dx = -ball.dx;
  }
  if(ball.y + ball.dy > canvas.height - ball.r || ball.y + ball.dy < ball.r){
    ball.dy = -ball.dy;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;
}
//kolizja gracz - pilka
function playerBallCollide(){
  // odbicie pilki od gracza
  if(collide(ball, player_one)){
    ball.dx = -ball.dx;

  }

  if(collide(ball, player_two)){
    ball.dx = -ball.dx;
  }

}
// Czyszczenie i rysowanie boiska na nowo
function updatePitch(){
  pitch.clear();
  playerBallCollide()
  ballWall();
  playerWallCollide();
  movePlayer();
  checkGoal();

  ball.position();
  ball.update();
  player_one.position();
  player_one.update();
  player_two.position();
  player_two.update();
  goal_one.update();
  goal_two.update();

  score.innerHTML = po_points + ":" + pt_points;
  checkWin();
}
