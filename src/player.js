export default class Player {
    constructor() {
        this.xCoordinate = Player.canvasWidth() / 2;
        this.yCoordinate = Player.canvasHeight() - 48;
        this.visible = true;
        this.life = 3;

    }
    // instance function
    static canvasWidth() {
        return document.getElementById("gameCanvas").width;
    }

    static canvasHeight() {
        return document.getElementById("gameCanvas").height;
    }

    static get imagePadding(){
        return 24;
    }


    draw(ctx) {
        if(this.visible){
            let spaceship = new Image();
            spaceship.src = "src/img/spaceship.png";
            ctx.drawImage(spaceship, this.xCoordinate - Player.imagePadding, this.yCoordinate - Player.imagePadding);
        }
    }

}
