import Invader from "./invader.js"
export default class Bullet{
    constructor(_xCoordinate, _yCoordinate, _visible, _from){
        this.xCoordinate = _xCoordinate;
        this.yCoordinate = _yCoordinate;
        this.visible = _visible;
        this.from = _from; // true for spaceship false for invader
    }

    static get canvasWidth() {
        return document.getElementById("gameCanvas").width;
    }

    static get canvasHeight() {
        return document.getElementById("gameCanvas").height;
    }

    static get imageHorizontalPadding(){
        return 2;
    }

    static get imageVerticalPadding(){
        return 6;
    }

    verticalMovement(speed){
        if(this.visible){
            if(this.yCoordinate <= Bullet.imageVerticalPadding || this.yCoordinate >= Bullet.canvasHeight - Bullet.imageVerticalPadding){
                this.visible = false;
            } else {
                this.yCoordinate -= speed;
            }
        }
    }

    checkVisible(){
        if(this.yCoordinate <= 0){
            this.visible = false;
        }
    }

    draw(ctx){
        if(this.visible){
            ctx.fillStyle = this.from ? "yellow" : "red";
            ctx.fillRect(this.xCoordinate - Bullet.imageHorizontalPadding, this.yCoordinate - Bullet.imageVerticalPadding, 4, 12);
        }
    }
}