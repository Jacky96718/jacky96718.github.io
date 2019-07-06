import Invader from "./invader.js"
import Player from "./player.js";
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

    collisionInvader(_invader){
        if(this.from && this.visible && _invader.visible && Math.abs(this.xCoordinate - _invader.xCoordinate) <= Bullet.imageHorizontalPadding + Invader.imageHorizontalPadding - 10
        && Math.abs(this.yCoordinate - _invader.yCoordinate) <= Bullet.imageVerticalPadding + Invader.imageVerticalPadding - 16){
            this.visible = false;
            _invader.visible = false;
            Invader.numOfInvader -= 1;
        }
    }

    collisionPlayer(_player){
        if(!this.from && this.visible && _player.visible && Math.abs(this.xCoordinate - _player.xCoordinate) <= Bullet.imageHorizontalPadding + Player.imagePadding
        && Math.abs(this.yCoordinate - _player.yCoordinate) <= Bullet.imageVerticalPadding + Player.imagePadding){
            this.visible = false;
            if(_player.life > 0){
                _player.life -= 1;
            }
        }
    }

     collisionBullet(_bullet){
        if(!this.from && this.visible && _bullet.from && _bullet.visible && Math.abs(this.xCoordinate - _bullet.xCoordinate) <= Bullet.imageHorizontalPadding * 2 + 2
        && Math.abs(this.yCoordinate - _bullet.yCoordinate) <= Bullet.imageVerticalPadding * 2){
            this.visible = false;
            _bullet.visible = false;
        }
    }

    draw(ctx){
        if(this.visible){
            ctx.fillStyle = this.from ? "yellow" : "red";
            ctx.fillRect(this.xCoordinate - Bullet.imageHorizontalPadding, this.yCoordinate - Bullet.imageVerticalPadding, 4, 12);
        }
    }
}