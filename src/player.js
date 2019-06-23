export function Player() {
  var spaceship = new Image();
  spaceship.src = "src/img/spaceship.png";

  var canvasWidth = document.getElementById("gameCanvas").width;
  var canvasHeight = document.getElementById("gameCanvas").height;
  this.xCoordinate = canvasWidth;
  this.yCoordinate = canvasHeight - 48;

  this.draw = function(ctx) {
    spaceship.onload = function() {
      ctx.drawImage(spaceship, Player.xCoordinate, Player.yCoordinate);
    };
  };
}
