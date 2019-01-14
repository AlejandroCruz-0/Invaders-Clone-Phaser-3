import { CST } from "../CST";

export class bossScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.BOSS
        })

        
       
        
        
        this.bulletTime = 0;
        
        
        
        
        
        
        
        
       
        
        


    }



    init(data) {
        console.log("started BOSSSCENE");
        console.log(`boss scene data Received `);
        console.log(data );


        
        this.livesNumber = data.livesNumber ? data.livesNumber : 4;

        console.log(data)
        this.puntaje = data.puntaje ? data.puntaje : 0;


    }

    preload() {




    }


    create() {

        console.log(`${this.livesNumber} `)
        
        




        //configurar bordes del mundo para que tengan colision
        this.physics.world.setBoundsCollision(true, true, true, true);

        //Fondo de estrellas
        this.starfield = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'starfield').setOrigin(0, 0);

        //Crea la nave usando el sistema de fisicas de Phaser 3
        this.player = this.physics.add.image(this.sys.game.config.width / 2, this.sys.game.config.height - 50, 'ship');
        //aumenta la escala 
        this.player.setScale(2);
        this.player.body.setAllowGravity(false); //Desactiva la gravedad en el objeto nave
        this.player.setCollideWorldBounds(true) //Abilita colision con los border de la escena
        this.player.body.immovable = true

        this.player.setInteractive();
        this.input.setDraggable(this.player);

        this.playerBullets = this.add.group(); //Creacion de grupo para balas jugador
        this.bossBullets = this.add.group();//Creacion de grupo para balas alien

         //funcion para destruir los objetos que tocan con los bordes del mundo
         this.physics.world.on('worldbounds', (body) => body.gameObject.destroy());


        //jefe alien 
        this.boss = this.physics.add.sprite(0, 200, "invader").play("fly").setScale(10);
        this.boss.x = this.boss.displayWidth / 2;
        this.boss.body.setAllowGravity(false);
        this.boss.body.moves = false;

        this.bossHP = 10;
        
        this.bossHPBar = this.add.graphics();
        this.bossHPBar.setDepth(1);

        this.draw_Boss_HP_Bar(this.bossHP);




        this.scoreText = this.add.text(10, 10, 'Puntaje : ' + this.puntaje, { font: '34px Arial', fill: '#fff' });


        //  configuracion de Vidas
        this.lives = this.add.group();
        this.add.text(10, 50, 'Vidas : ', { font: '34px Arial', fill: '#fff' });

        //configuracion de vidas, se usa el mismo sprite para     
        for (var i = 0; i < this.livesNumber; i++) {
            var ship = this.lives.create(25 + (30 * i), 100, 'ship');
            ship.angle = 90;
            ship.alpha = 0.9;
        }


        this.stateText = this.make.text({
            x: this.sys.game.config.width / 2,
            y: this.sys.game.config.height / 2,
            text: '',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: 'bold 25px Arial',
                fill: 'white',
                wordWrap: { width: 300 }
            }
        });

        this.stateText.visible = false;











        //Configuracion para arrastrar nave de jugador

        this.input.on('drag', function ( pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;




        });



        this.eventoDedisparoBoss = this.time.addEvent({
            loop: true,
            callback: this.bossDispara,
            callbackScope: this,
            delay: 3000
        })

        //funcion para disparar cada cierto tiempo

        this.playerBulletTimeEvent = this.time.addEvent({
            loop: true,
            callback: this.jugador_dispara,
            callbackScope: this,
            delay: 1000
        });






        this.alienTween = this.tweens.add({
            targets: this.boss, //objeto que contiene el grupo de aliens
            x: this.sys.game.config.width - this.boss.displayWidth / 2,//boss.texture.source[0].width,

            duration: 3000,
            loop: -1,
            yoyo: true,
            ease: 'Linear.easeInOut',
            //onLoop: () => { this.container.y += 50 },
            //onYoyo: () => { this.container.y += 50 },

        })

//collider balas alien con jugador
        this.physics.add.collider(this.playerBullets, this.boss, this.balas_jugador_callback, undefined, this);


        //collider entre aliens y jugador
        this.physics.add.collider(this.bossBullets, this.player, this.balas_boss_callback, undefined, this);



        
       // this.physics.add.collider(this.player, this.aliens,this.alien_chocan_callback, undefined, this);

    }//fin de phaser create



    update() {
         //  Scroll the background -- Mover el Fondo 
         this.starfield.tilePositionY += 2;




    } //fin de funcion update de Phaser 3







    jugador_dispara() {
        //Funcion Que dispara una bala al presionar espacio

        //  To avoid them being allowed to fire too fast we set a time limit
        //game.scene.scenes[0].sys.time.now this.scene.scene.time.now

        if (this.sys.time.now > this.bulletTime) {


            let bullet = this.physics.add.image(this.player.x, this.player.y - 8, 'bullet').setVelocity(0, -400).setCollideWorldBounds(true);
            bullet.body.setAllowGravity(false);
            bullet.body.onWorldBounds = true;
            this.playerBullets.add(bullet);
            this.bulletTime = this.sys.time.now + 200;//game.scene.scenes[0].sys.time.now + 200;



        }

    }

    bossDispara() {

        


        let balaBoss = this.physics.add.image(this.boss.x , this.boss.y, "enemyBullet").setCollideWorldBounds(true);
        balaBoss.body.debugShowBody = true;
        balaBoss.setScale(5);
        balaBoss.body.setAllowGravity(false);
        balaBoss.body.onWorldBounds = true;
        
        this.physics.moveToObject(balaBoss, this.player, 150);
        this.bossBullets.add(balaBoss);



    }


    balas_jugador_callback(bullet, alien) {
        
        bullet.destroy();

        this.add.sprite(this.boss.x,this.boss.y, "kaboom").play("boom");

        this.bossHP -= 1;

        this.draw_Boss_HP_Bar(this.bossHP);

        if (this.bossHP === 0){
            this.boss.destroy();
            this.eventoDedisparoBoss.remove(false);
            this.playerBulletTimeEvent.remove(false);
            //this.player.body.allowDrag = false;
            this.player.disableInteractive();

            console.log(this.player)



            this.make.text({
                x: this.sys.game.config.width / 2,
                y: this.sys.game.config.height / 2,
                text: 'WINNER',
                origin: { x: 0.5, y: 0.5 },
                style: {
                    font: 'bold 64px Arial',
                    fill: 'white',
                    wordWrap: { width: this.sys.game.config.width }
                }
            });
        }

        


        //  Increase the score
        //this.score += 20;
        //this.scoreText.text = 'Puntaje : ' + this.score;
        //this.add.sprite(alien.x + this.container.x, alien.y + this.container.y, "kaboom").play("boom");

        
    }


    balas_boss_callback(bossBullets, player) {

        bossBullets.destroy();
        this.add.sprite(this.player.x, this.player.y, "kaboom").play("boom");


        if (this.lives.getChildren().length == 1) {
            //funcion para remover evento de tiempo en loop
            this.eventoDedisparoBoss.remove(false);
            this.alienTween.stop();
            

            this.playerBulletTimeEvent.paused = true;
            this.player.destroy();
            


            this.make.text({
                x: this.sys.game.config.width / 2,
                y: this.sys.game.config.height / 2,
                text: 'GAME OVER',
                origin: { x: 0.5, y: 0.5 },
                style: {
                    font: 'bold 64px Arial',
                    fill: 'white',
                    wordWrap: { width: this.sys.game.config.width }
                }
            });

        } else {
            this.lives.getFirstAlive().destroy();
            
            this.player.x = this.sys.game.config.width / 2;
            this.player.y = this.sys.game.config.height - 50;

        }
        

/*
        if (this.lives.getChildren().length == 1) {
            //funcion para remover evento de tiempo en loop
            this.eventoDedisparoBoss.remove(false);
            this.alienTween.stop();

            this.playerBulletTimeEvent.paused = true;
            this.player.destroy();
            this.textoFinalJuego.call(this, false);

        } else {
            this.lives.getFirstAlive().destroy();
            this.alienTween.stop();
            this.container.x = 100;
            this.container.y = 50;
            this.alienTween.resume();
            this.player.x = this.sys.game.config.width / 2;
            this.player.y = this.sys.game.config.height - 50;

        }

*/
    }

draw_Boss_HP_Bar (bossHP){
    this.bossHPBar.clear();
    this.bossHPBar.fillStyle(0xff0000, 1);
    this.bossHPBar.fillRect(200, 10, bossHP * 30, 25)
}




}


