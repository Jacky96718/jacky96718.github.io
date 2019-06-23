import "./styles.css";
import PlayerClass from "./playerClass.js";

var cvs, ctx, cvsHeight, cvsWidth;
var player = new PlayerClass();

setup();
document.addEventListener("mousemove", mouseHandler, false);
requestAnimationFrame(gameLoop())

function setup() {
  cvs = document.getElementById("gameCanvas");
  ctx = cvs.getContext("2d");
  cvsHeight = cvs.height;
  cvsWidth = cvs.wdith;
}

function mouseHandler(e) {
  player.xCoordinate = e.clientX - cvs.offsetLeft;
  console.log("Spaceship x-coordinate = " + player.xCoordinate);
  //requestAnimationFrame(function(){player.draw(ctx)})
}

function gameLoop() {
  ctx.clearRect(0, 0, cvsHeight, cvsWidth);
  draw();
  requestAnimationFrame(gameLoop())
}

function draw() {
  player.draw(ctx);
}
