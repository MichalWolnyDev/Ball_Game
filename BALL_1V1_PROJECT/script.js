var player_one;
var player_two;
var ball;

function play(){
  pitch.start();
  pitch.elements();
  player_one = new Player(30, 30, 250, 300, "white");
  player_two = new Player(30, 30, 750, 300, "blue");
  ball = new Ball(500, 300, "aqua");

}
// Boisko
var pitch = {
  canvas: document.createElement('canvas'),
  start: function(){
    this.canvas.width = 1000;
    this.canvas.height = 600;
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
  elements: function(){ //rysowanie lini dzielacej polowy boiska oraz okrag srodkowy
    ctx = pitch.ctx;
    ctx.moveTo(500, 0);
    ctx.lineTo(500, 600);
    ctx.strokeStyle = '#fff';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(500, 300, 70, 0, 2*Math.PI);
    ctx.stroke();
  },
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
  this.dx = 2;
  this.dy = -2;
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
// Sterowanie
// document.onkeydown = checkKey;
//
// function checkKey(e){
//   e = e || window.event;
//
//   if(e.keyCode == '37'){
//     player_one.speedX -= 10;
//   }
//   else if(e.keyCode == '38'){
//     player_one.speedY -= 10;
//   }
//   else if(e.keyCode == '39'){
//     player_one.speedX += 10;
//   }
//   else if(e.keyCode == '40'){
//     player_one.speedY += 10;
//   }
//
// }
// Czyszczenie i rysowanie boiska na nowo
function updatePitch(){
  pitch.clear();
  player_one.speedX = 0;
  player_one.speedY = 0;

  if(pitch.keys && pitch.keys[37]) {
    player_one.speedX -= 6;
  }
  if(pitch.keys && pitch.keys[38]) {
    player_one.speedY -= 6;
  }
  if(pitch.keys && pitch.keys[39]) {
    player_one.speedX = 6;
  }
  if(pitch.keys && pitch.keys[40]) {
    player_one.speedY = 6;
  }

  if(ball.x + ball.dx > canvas.width - ball.r || ball.x + ball.dx < ball.r){
     ball.dx = -ball.dx;
  }
  if(ball.y + ball.dy > canvas.height - ball.r || ball.y + ball.dy < ball.r){
    ball.dy = -ball.dy;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;

  ball.position();
  ball.update();
  player_one.position();
  player_one.update();
  player_two.update();

}
