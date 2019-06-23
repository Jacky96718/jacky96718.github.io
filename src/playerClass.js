export default class PlayerClass {
  constructor() {
    this.xCoordinate = PlayerClass.canvasHeight() / 2;
    this.yCoordinate = PlayerClass.canvasWidth() - 48;
  }
  // instance function
  static canvasWidth() {
    return document.getElementById("gameCanvas").height;
  }

  static canvasHeight() {
    return document.getElementById("gameCanvas").height;
  }

  draw(ctx) {
    let spaceship = new Image();
    spaceship.src = "src/img/spaceship.png";
    let x = this.xCoordinate;
    let y = this.yCoordinate;
    spaceship.onload = function() {
      ctx.drawImage(spaceship, x, y);
    };
  }

}