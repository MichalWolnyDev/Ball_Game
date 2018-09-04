var player_one;
var player_two;
var ball;

function play(){
  pitch.start();
  pitch.elements();
  player_one = new Player(250, 300, "white");
  player_two = new Player(750, 300, "blue");
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
  var r = 10, startangle = 0, endangle = 2*Math.PI;
  this.x = x;
  this.y = y;
  this.update = function(){
    ctx = pitch.ctx;
    ctx.beginPath();

    ctx.arc(this.x, this.y, r, startangle, endangle);
    ctx.fillStyle = color;
    ctx.fill(); // wypelnieie pilki kolorem
    ctx.stroke(); // rysowanie pilki
  }

}
// Konstruktor gracza
var Player = function(x, y, color){
  this.r = 20;
  this.startangle = 0;
  this.endangle = 2*Math.PI;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function(){
    ctx = pitch.ctx;
    ctx.beginPath();

    ctx.arc(this.x, this.y, this.r, this.startangle, this.endangle);
    ctx.fillStyle = color;
    ctx.fill(); // wypelnieie graczy kolorem
    ctx.stroke(); // rysowanie graczy
  }
  this.position = function(){
    this.x = this.speedX;
    this.y = this.speedY;
  }

}
// Sterowanie
document.onkeydown = checkKey;

function checkKey(e){
  e = e || window.event;

  if(e.keyCode == '37'){
    player_one.speedX -= 4;
  }
  else if(e.keyCode == '38'){
    player_one.speedY -= 4;
  }
  else if(e.keyCode == '39'){
    player_one.speedX += 4;
  }
  else if(e.keyCode == '40'){
    player_one.speedY += 4;
  }

}
// Czyszczenie i rysowanie boiska na nowo
function updatePitch(){
  pitch.clear();
  player_one.update();
    player_one.position();
  player_two.update();
  ball.update();
}
