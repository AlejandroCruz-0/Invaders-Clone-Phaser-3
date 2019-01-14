import { CST } from "../CST";


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




        //this.add.text(50, 200, 'gay Text', { font: "74px 'Coiny', cursive", fill: "#fff" });

        //animacion de invasores
        this.anims.create({
            key: 'menu_fly',
            frames: this.anims.generateFrameNumbers('invader', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1
        });




        //font Staatliches,cursive
        //ZCOOL KuaiLe, cursive

        window.menuTitleName = this.make.text({
            x: 10,
            y: 100,
            text: "Invaders Clone Phaser 3",

            style: {
                //fontFamily: "ZCOOL KuaiLe, cursive",
                fontSize: 64,
                fill: 'white',
                wordWrap: { width: this.sys.game.config.width }
            }
        });


        menuTitleName.setDepth(10);


        window.credits = this.make.text({
            x: 10,
            y: this.sys.game.config.height - 50,
            text: "Musica por Metaruka - https://opengameart.org/content/game-game",

            style: {
                //fontFamily: "ZCOOL KuaiLe, cursive",
                fontSize: 24,
                fill: 'white',
                wordWrap: { width: this.sys.game.config.width }
            }
        });


        credits.setDepth(10);


        //Fondo de estrellas
        this.menuStarfield = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'starfield').setOrigin(0, 0);


        //Boton para empezar juego
        window.playButton = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "playButton");
        playButton.setScale(0.5);
        playButton.setInteractive();
        playButton.setTint(0xff0000);
        playButton.on("pointerdown", () => this.scene.start(CST.SCENES.PLAY));

        //this.add.image(50,100,"invader");

        let gameWidth = this.sys.game.config.width;
        let gameHeight = this.sys.game.config.height;
        let aliensMenu = this.add.group();
        let aliensMenu2 = this.add.group();



        for (let x = 0; x < 10; x++) {
            aliensMenu.create(20, x * 80, "invader").anims.play('menu_fly');
            if (x * 80 > gameHeight) { break; }
        }
        //aliensMenu.children.iterate((child) => child.anims.play('menu_fly'));

        for (let x = 0; x < 10; x++) {
            aliensMenu2.create(gameWidth - 20, x * 80, "invader");
            if (x * 80 > gameHeight) { break; }
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


        })
        //this.sound.pauseOnBlur = false;
        //let mainMusic = this.sound.play("mainMusic", {loop: true});
        //this.sound.pauseOnBlur = false;


        var mainMusic = this.sound.add('mainMusic');

        //mainMusic.play();


    }


    update() {
        //  Scroll the background -- Mover el Fondo 
        this.menuStarfield.tilePositionY += 2;
    }
}