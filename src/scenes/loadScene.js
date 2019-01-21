import {
    CST
} from "../CST";




export class loadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        });



    }


    init() {
        console.log("loadScene Loaded");



    }

    preload() {

        //Estas lineas configuran el plugin rexWebFont
        var config = {
            google: {
                families: ['Bangers','Coiny','Staatliches']
            }
        };
        this.load.rexWebFont(config);
        this.load.on('webfontactive', function (fileObj, familyName) {
            console.log('font-active: ' + familyName)
        });
        this.load.on('webfontinactive', function (fileObj, familyName) {
            console.log('font-inactive: ' + familyName)
        });
        



        this.load.image('bullet', './bullet.png');
        this.load.image('enemyBullet', './enemy-bullet.png');
        this.load.spritesheet('invader', './invader32x32x4.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.image('ship', './player.png');
        this.load.spritesheet('kaboom', './explode.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.image('starfield', './starfield.png');
        this.load.image("playButton", "./playbutton.png");        
        this.load.audio("mainMusic", "./01 game-game_0.mp3");








        this.load.on("progress", (percent) => {

            console.log(percent * 100);


        });


        
    }
    create() {

        this.scene.start(CST.SCENES.MENU);

    }




}