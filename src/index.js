import PlayerClass from "./playerClass.js";

var cvs, ctx, cvsHeight, cvsWidth;
var player = new PlayerClass();
var bg = new Image();
bg.src="./src/img/bg.png"

setup();
document.addEventListener("mousemove", mouseHandler, false);
requestAnimationFrame(gameLoop)

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
  console.log(cvsWidth);
  ctx.clearRect(0, 0, cvsWidth, cvsHeight);
  draw();
  requestAnimationFrame(gameLoop)
}

function draw() {
  player.draw(ctx);
  //requestAnimationFrame(draw);
}

