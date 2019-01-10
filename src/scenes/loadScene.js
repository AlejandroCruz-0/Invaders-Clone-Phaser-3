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
        //this.load.script('https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js');
        
       
        
        this.load.image('bullet', './bullet.png');
        this.load.image('enemyBullet', './enemy-bullet.png');
        this.load.spritesheet('invader', './invader32x32x4.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('ship', './player.png');
        this.load.spritesheet('kaboom', './explode.png', { frameWidth: 128, frameHeight: 128 });
        this.load.image('starfield', './starfield.png');
        this.load.image("playButton","./playbutton.png");
        this.load.audio("mainMusic","./01 game-game_0.mp3")
        

        
        



        
        this.load.on("progress", (percent) => {
            
            console.log(percent * 100);

            
            
                
            
        });


        this.load.on('complete', this.onLoadComplete, this);
    }
    create() {
        //this.add.text(50, 200, 'gay Text', { font: "74px Press Start 2P", fill: "#fff" });
        this.scene.start(CST.SCENES.MENU);

    }



    onLoadComplete(loader, totalComplete, totalFailed) {
        // IMPORTANT: Here we utilize the webfonts loader script we loaded above.
        // NOTE: I played around with calling this in different places and settled
        // on this one currently. Feel free to play around with where it is called.
        // just make sure that you do not call it before it is done loading and also
        // make sure not to proceed to a scene that needs the font before it renders.


        /*
        WebFont.load({
          active: () => this.loaded = true,
          custom: {
            families: ['Press Start 2P'],
            urls: ['Press_Start_2P.css'], //I included what this should look like below
          },
        });
        console.debug('completed: ', totalComplete);
        console.debug('failed: ', totalFailed);*/
      }



    
}