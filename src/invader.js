export default class Invader {
    constructor(_xCoordinate,_yCoordinate, _visible) {
    this.xCoordinate = _xCoordinate;
    this.yCoordinate = _yCoordinate;
    this.visible = _visible;
    this.movingDirection = true;    // true for right, false for left
    Invader.direction = true;
    Invader.directionChange = false;
    Invader.changeRate = 0;
    }

    static get canvasWidth() {
        return document.getElementById("gameCanvas").width;
    }

    static get canvasHeight() {
        return document.getElementById("gameCanvas").height;
    }

    static get imageHorizontalPadding(){
        return 32;
    }

    static get imageVerticalPadding(){
        return 32;
    }
    // ---------- Check Direction ----------
    checkDirection(){
        if(this.visible){
            if((this.xCoordinate >= Invader.canvasWidth - Invader.imageHorizontalPadding - 6) & Invader.direction){
                Invader.direction = !Invader.direction;
                Invader.directionChange = true;
            } else if(this.xCoordinate <= 0 + Invader.imageVerticalPadding + 6 & !Invader.direction){
                Invader.direction = !Invader.direction;
                Invader.directionChange = true;
            }
        }
    }
    horizontalMovement(speed){
        if(Invader.direction){
            this.xCoordinate += speed;
        } else {
            this.xCoordinate -= speed;
        }
    }

    verticalMovement(){
        this.yCoordinate += Invader.imageVerticalPadding * 2 + 6;
    }

    draw(ctx) {
        if(this.visible){
            let invaderImage = new Image();
            invaderImage.src = (Math.floor(Invader.changeRate / 20) == 1) ? "src/img/invader64_1.png" : "src/img/invader64_2.png";
            ctx.drawImage(invaderImage, this.xCoordinate - Invader.imageHorizontalPadding, this.yCoordinate - Invader.imageVerticalPadding);
        }
    }

}