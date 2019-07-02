import Player from "./player.js";
import Invader from "./invader.js"
import Bullet from "./bullet.js"

// ---------- Constant ----------
const invaderHorizontalInterval = 6;
const invaderVerticalInterval = 6;
const invaderRow = 3;
const invaderCol = 10;
var cvs, ctx, cvsHeight, cvsWidth;
var gameRestart = false;
var player, bulletFromPlayer;
var invader = new Array(invaderRow);
for(var i = 0 ;i < invaderRow; i++){
    invader[i] = new Array(invaderCol);
}
var invaderNum = invaderRow * invaderCol;
var bulletFromInvader = new Array(invaderRow);
for(var i = 0 ;i < invaderRow; i++){
    bulletFromInvader[i] = new Array(invaderCol);
}
var bg = new Image();
bg.src ="./src/img/bg.png";

setup();
document.addEventListener("mousemove", mouseHandler, false);
document.addEventListener("touchmove", touchHandler, false);
document.addEventListener("keypress", keyboardHandler, false);
window.onload=function(){
    requestAnimationFrame(gameLoop);
};


function setup() {
    cvs = document.getElementById("gameCanvas");
    ctx = cvs.getContext("2d");
    cvsHeight = cvs.height;
    cvsWidth = cvs.width;
    // ---------- Game Object ----------
    player = new Player();
    bulletFromPlayer = new Bullet(player.xCoordinate, player.yCoordinate, false, true);

    for(var i = 0; i < invaderRow; i++){
        for(var j = 0; j < invaderCol; j++){
            bulletFromInvader[i][j] = new Bullet(0, 0, false, false);
        }
    }

    for (var i = 0; i < invaderRow; i++){
        for(var j =0; j < invaderCol; j++){
            invader[i][j] = new Invader((cvsWidth / 2 - (9 * (Invader.imageHorizontalPadding ))) + (j * (Invader.imageHorizontalPadding * 2 ))
            , 20 + (i * (Invader.imageVerticalPadding * 2 - 20)), true);
        }
    }

}
function restartSetup(){
    if(gameRestart){
        player = new Player();
        bulletFromPlayer = new Bullet(player.xCoordinate, player.yCoordinate, false);
        for (var i = 0; i < invaderRow; i++){
            for(var j = 0; j < invaderCol; j++){
            invader[i][j] = new Invader((cvsWidth / 2 - (9 * (Invader.imageHorizontalPadding ))) + (j * (Invader.imageHorizontalPadding * 2 ))
            , 20 + (i * (Invader.imageVerticalPadding * 2 - 20)), true);
            }
        }
        gameRestart = false;
    }
}

function mouseHandler(e) {
    var relativeXCoordinate = e.clientX - cvs.offsetLeft;
    if(relativeXCoordinate > cvsWidth - Player.imagePadding){
        player.xCoordinate = cvsWidth - Player.imagePadding;
    } else if (relativeXCoordinate < 0 + Player.imagePadding){
        player.xCoordinate = 0 + Player.imagePadding;
    } else {
        player.xCoordinate = e.clientX - cvs.offsetLeft;
    }
}

function touchHandler(e) {
    var relativeXCoordinate = e.pageX - cvs.offsetLeft;
    if(relativeXCoordinate > cvsWidth - Player.imagePadding){
        player.xCoordinate = cvsWidth - Player.imagePadding;
    } else if (relativeXCoordinate < 0 + Player.imagePadding){
        player.xCoordinate = 0 + Player.imagePadding;
    } else {
        player.xCoordinate = e.pagetX - cvs.offsetLeft;
    }
}

function keyboardHandler(e){
    // keyCode 32 = space
    if(e.keyCode == 32 && !bulletFromPlayer.visible){
        bulletFromPlayer = new Bullet(player.xCoordinate, player.yCoordinate - Player.imagePadding - Bullet.imageVerticalPadding, true, true);
    }
}

function gameLoop() {
    // ---------- Invader Movement ----------
    for(var i = 0; i < invaderRow; i++){
        for(var j = 0; j < invaderCol; j++){
            invader[i][j].checkDirection();
        }
    }

    if(Invader.directionChange == true){
        for(var i = 0; i < invaderRow; i++){
            for(var j = 0; j < invaderCol; j++){
                invader[i][j].verticalMovement();
            }
        }
        Invader.directionChange = false;
    }

    for(var i = 0; i < invaderRow; i++){
        for(var j = 0; j < invaderCol; j++){
            invader[i][j].horizontalMovement(0.5);
            restartGame(invader[i][j]);
        }
    }
    // ---------- End Invader Movement ----------

    // ---------- Bullet Movement ----------
    bulletFromPlayer.verticalMovement(3);
    for(var i = 0; i < invaderRow; i++){
        for(var j = 0; j < invaderCol; j++){
            if(!bulletFromInvader[i][j].visible){
                if((i == 0 && invader[i][j].visible  && !invader[1][j].visible && !invader[2][j].visible)
                || (i == 1 && invader[i][j].visible && !invader[2][j].visible)
                || (i == 2 && invader[i][j].visible)){
                    // random from 1 to 100
                    if((Math.floor(Math.random() * 300) + 1) == 1){
                        bulletFromInvader[i][j] = new Bullet(invader[i][j].xCoordinate, invader[i][j].yCoordinate + Invader.imageVerticalPadding, true, false);
                    }
                }
            } else {
                bulletFromInvader[i][j].verticalMovement(-3);
            }
        }
    }

    // ---------- End Bullet Movement ----------
    for(var i = 0; i < invaderRow; i++){
        for(var j = 0; j < invaderCol; j++){
            collisionInvader(invader[i][j], bulletFromPlayer);
            collisionPlayer(player, bulletFromInvader[i][j])
        }
    }



    restartSetup();
    draw();
    Invader.changeRate = ++Invader.changeRate % 40;
    requestAnimationFrame(gameLoop);
}

function draw() {
    ctx.drawImage(bg,0,0);
    player.draw(ctx);

    for (var i = 0; i < invaderRow; i++){
        for(var j = 0; j < invaderCol; j++){
            invader[i][j].draw(ctx);
        }
    }
    bulletFromPlayer.draw(ctx);
    for (var i = 0; i < invaderRow; i++){
        for(var j = 0; j < invaderCol; j++){
            bulletFromInvader[i][j].draw(ctx);
        }
    }
}

function collisionInvader(_invader,_bullet){
    if(_bullet.from && _bullet.visible && _invader.visible && Math.abs(_bullet.xCoordinate - _invader.xCoordinate) <= Bullet.imageHorizontalPadding + Invader.imageHorizontalPadding - 10
    && Math.abs(_bullet.yCoordinate - _invader.yCoordinate) <= Bullet.imageVerticalPadding + Invader.imageVerticalPadding - 16){
        _bullet.visible = false;
        _invader.visible = false;
    }
}

function collisionPlayer(_player,_bullet){
    if(!_bullet.from && _bullet.visible && _player.visible && Math.abs(_bullet.xCoordinate - _player.xCoordinate) <= Bullet.imageHorizontalPadding + Player.imagePadding
    && Math.abs(_bullet.yCoordinate - _player.yCoordinate) <= Bullet.imageVerticalPadding + Player.imagePadding){
        _bullet.visible = false;
        _player.visible = false;
    }
}

function restartGame(_invader){
    if(_invader.visible && _invader.yCoordinate >= cvsHeight - Player.imagePadding * 2 - Invader.imageHorizontalPadding){
        gameRestart = true;
    }
}