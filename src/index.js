import PlayerClass from "./playerClass.js";

var cvs, ctx, cvsHeight, cvsWidth;
var player = new PlayerClass();
var bg = new Image();
bg.src="./src/img/bg.png"

windows.onload=function(){
setup();
document.addEventListener("mousemove", mouseHandler, false);
requestAnimationFrame(gameLoop)
}

function setup() {
  cvs = document.getElementById("gameCanvas");
  ctx = cvs.getContext("2d");
  cvsHeight = cvs.height;
  cvsWidth = cvs.width;
}

function mouseHandler(e) {
  player.xCoordinate = e.clientX - cvs.offsetLeft;
  //requestAnimationFrame(function(){player.draw(ctx)})
}

function gameLoop() {
  ctx.drawImage(bg,0,0);
  draw();
  requestAnimationFrame(gameLoop)
}

function draw() {
  player.draw(ctx);
  //requestAnimationFrame(draw);
}

