import { CST } from "../CST";


export class loadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })



    }


    init() {
        console.log("loadScene Loaded");
    }

    preload() {
         

        this.load.image('bullet', './bullet.png');
        this.load.image('enemyBullet', './enemy-bullet.png');
        this.load.spritesheet('invader', './invader32x32x4.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('ship', './player.png');
        this.load.spritesheet('kaboom', './explode.png', { frameWidth: 128, frameHeight: 128 });
        this.load.image('starfield', './starfield.png');
        this.load.image("playButton","./playbutton.png");

        
        

        //create loading bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        })





        this.load.on("progress", (percent) => {
            loadingBar.fillRect(this.game.renderer.width / 2, 0, 50, this.game.renderer.height * percent);
            console.log(percent * 100);
        })


        
    }
    create() {
        //animacion de invasores
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('invader', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1
        });

        this.scene.start(CST.SCENES.MENU);

    }
}