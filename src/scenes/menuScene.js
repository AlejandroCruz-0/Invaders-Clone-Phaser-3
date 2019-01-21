import {
    CST
} from "../CST";


export class menuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        });



    }


    init(data) {
        console.log("menuScene Loaded");





    }

    preload() {


    }
    create() {

        //variables del tamaño de la ventana del juego
        let gameWidth = this.sys.game.config.width;
        let gameHeight = this.sys.game.config.height;
        

        //animacion de invasores en menu
        this.anims.create({
            key: 'menu_fly',
            frames: this.anims.generateFrameNumbers('invader', {
                start: 0,
                end: 3
            }),
            frameRate: 20,
            repeat: -1
        });




        //Texto de nombre del juego
        let menuTitleName = this.make.text({
            x: 10,
            y: 100,
            text: "Invaders Clone Phaser 3",

            style: {                
                fontFamily: "Staatliches",
                fontSize: 64,
                fill: 'white',
                wordWrap: {
                    width: gameWidth
                }
            }
        }).setDepth(10);


        //texto para agradecer musico
        let credits = this.make.text({
            x: 10,
            y: gameHeight - 50,
            text: "Musica por Metaruka - https://opengameart.org/content/game-game",

            style: {
                fontFamily: "Staatliches",
                fontSize: 24,
                fill: 'white',
                wordWrap: {
                    width: gameWidth
                }
            }
        }).setDepth(10);

       

        
        


        //Fondo de estrellas
        this.menuStarfield = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'starfield').setOrigin(0, 0);


        //Boton para empezar juego
        let playButton = this.add.image(gameWidth / 2, gameHeight / 2, "playButton")
        .setScale(0.5)
        .setInteractive()      
        //Al tocar el boton empezamos la escena de juego
        .on("pointerdown", () => this.scene.start(CST.SCENES.PLAY));


         //emoji de alien
         let alienEmoji = this.make.text({
            x: gameWidth / 2 - 32,
            y: gameHeight / 2 - playButton.height ,
            text: "👾",            

            style: {
                fontFamily: "Staatliches",
                fontSize: 64,
               
            }
        })
        .setDepth(10)
        .setTint(0x2f00ff);


        let mainMusic = this.sound.add('mainMusic');
        mainMusic.play({loop: true});

        this.sound.pauseOnBlur = false;
        

        //nota musical que funciona como boton para pausar la musica
        let notaMusical = this.make.text({
            x: gameWidth / 2 - 32,
            y: gameHeight / 2 + playButton.height ,
            text: "🎶",            

            style: {
                fontFamily: "Staatliches",
                fontSize: 64,
               
            }
        })
        .setDepth(10)
        .setInteractive()
        .on("pointerdown", () => {
            console.log("clicked note");
            
            if (mainMusic.isPlaying){
                mainMusic.pause();
            }else if (mainMusic.isPaused){
                mainMusic.resume();
            }

            
        });



        

        

        
        let aliensMenu = this.add.group();
        let aliensMenu2 = this.add.group();



        for (let x = 0; x < 10; x++) {
            aliensMenu.create(20, x * 80, "invader").anims.play('menu_fly');
            if (x * 80 > gameHeight) {
                break;
            }
        }
        //aliensMenu.children.iterate((child) => child.anims.play('menu_fly'));

        for (let x = 0; x < 10; x++) {
            aliensMenu2.create(gameWidth - 20, x * 80, "invader");
            if (x * 80 > gameHeight) {
                break;
            }
        }
        aliensMenu2.children.iterate((child) => child.anims.play('menu_fly'));

        this.tweens.add({
            targets: aliensMenu.getChildren(), //objeto que contiene el grupo de aliens
            x: gameWidth,

            duration: 3000,
            loop: -1,
            yoyo: true,
            ease: 'Linear.easeInOut',


        })

        this.tweens.add({
            targets: aliensMenu2.getChildren(), //objeto que contiene el grupo de aliens
            x: 0,

            duration: 3000,
            loop: -1,
            yoyo: true,
            ease: 'Linear.easeInOut',


        });

      


       

       
        

        


    }


    update() {
        //   Mover el Fondo 
        this.menuStarfield.tilePositionY += 2;
    }
}