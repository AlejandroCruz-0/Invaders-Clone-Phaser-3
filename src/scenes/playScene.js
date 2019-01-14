import { CST } from "../CST";

export class playScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.PLAY
        });




        this.bulletTime = 0;
    }



    init(data) {
        console.log("started playscene");
        


        this.livesNumber = this.livesNumber ? this.livesNumber : 2;
        this.puntaje = this.puntaje ? this.puntaje : 0;

        

       
        this.waveNumber = this.waveNumber ? this.waveNumber : this.waveNumber = 1;
       

        


       
        






    }

    preload() {




    }


    create() {



        this.input.keyboard.on('keydown_' + 'A', (event) => { this.scene.start(CST.SCENES.BOSS) });

        this.input.keyboard.on('keydown_' + 'R', event => {
            this.aliens.clear(undefined, true);
        });

        this.input.keyboard.on('keydown_' + 'X', event => {


            this.player.x = this.sys.game.config.width / 2;
            this.player.y = this.sys.game.config.height - 50;
        });
        //puntaje


        //animacion de invasores
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('invader', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1
        });

        //animacion de explosion
        this.anims.create({
            key: 'boom',
            frames: this.anims.generateFrameNumbers('kaboom', { start: 0, end: 15, first: 0 }),
            hideOnComplete: true,
            //repeat: 1
        });




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
        this.player.body.immovable = true;


        this.player.setInteractive();
        this.input.setDraggable(this.player);

        this.playerBullets = this.add.group(); //Creacion de grupo para balas jugador
        this.alienBullets = this.add.group();//Creacion de grupo para balas alien









        //Los Aliens
        //Para registrar colision los aliens tienen que estar en un grupo de fisica Phaser.
        this.aliens = this.physics.add.group();



        let sumOfXAliens = 0;

        for (let y = 0; y < this.waveNumber; y++) {
            for (let x = 0; x < 5; x++) {
                let alien = this.aliens.create(x * 48, y * 50, 'invader');
                alien.anims.play('fly');
                alien.body.moves = false;

                //this.aliens.getChildren().length === 5 ? sumOfXAliens += alien.x :

                if (this.aliens.getChildren().length < 5) {
                    sumOfXAliens += alien.x;
                }


            }
        }

        //Los grupos en Phaser 3 no tienen metodos de ajuste de posicion asi que
        //tenemos que usar los contenedores de Phaser para ajustar la posicion del grupo de aliens.
        this.container = this.add.container(0, 50);
        this.container.add(this.aliens.getChildren());





        //Los tween de Phaser 3 permite el movimientos de un objeto o grupo.

        //movimiento alien


        this.alienTween = this.tweens.add({
            targets: this.container, //objeto que contiene el grupo de aliens
            x: this.sys.game.config.width - sumOfXAliens,

            duration: 3000,
            loop: -1,
            yoyo: true,
            ease: 'Linear.easeInOut',
            onLoop: () => { this.container.y += 50 },
            onYoyo: () => { this.container.y += 50 },

        })





        this.puntajeText = this.add.text(10, 10, 'Puntaje : ' + this.puntaje, { font: '34px Arial', fill: '#fff' });


        //  configuracion de Vidas
        this.lives = this.add.group();
        this.add.text(10, 50, 'Vidas : ', { font: '34px Arial', fill: '#fff' });

        //configuracion de vidas, se usa el mismo sprite para     
        for (var i = 0; i < this.livesNumber; i++) {
            var ship = this.lives.create(25 + (30 * i), 100, 'ship');
            ship.angle = 90;
            ship.alpha = 0.9;
        }







        //Configuracion para arrastrar nave de jugador

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;




        });

        //funcion para destruir los objetos que tocan con los bordes del mundo
        this.physics.world.on('worldbounds', (body) => body.gameObject.destroy());


        //funcion para que los aliens disparen comentada

        this.eventoDeDisparoDeAliens = this.time.addEvent({
            loop: true,
            callback: this.aliensDisparan,
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

        //collider balas jugador con alien

        this.physics.add.collider(this.playerBullets, this.aliens, this.balas_jugador_callback, undefined, this);


        //collider balas alien con jugador
        this.physics.add.collider(this.alienBullets, this.player, this.balas_alien_callback, undefined, this);



        //collider entre aliens y jugador
        this.physics.add.collider(this.player, this.aliens, this.alien_chocan_callback, undefined, this);


    }//fin de phaser create



    update() {



        //  Scroll the background -- Mover el Fondo 
        this.starfield.tilePositionY += 1;




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


    aliensDisparan() {

        //Tomamos un alien vivo al azar
        let randomAlien = this.aliens.getChildren()[Phaser.Math.Between(0, this.aliens.getChildren().length - 1)]
        if (randomAlien) {
            let InvaderBullet = this.physics.add.image(randomAlien.x + this.container.x, randomAlien.y + this.container.y, "enemyBullet").setCollideWorldBounds(true);
            InvaderBullet.body.setAllowGravity(false);
            InvaderBullet.body.onWorldBounds = true;
            this.physics.moveToObject(InvaderBullet, this.player, 150);
            this.alienBullets.add(InvaderBullet);

        }

    }





    estadoFinalOla(estado) {
        //Funcion para revisar 


        if (estado) {
            this.waveNumber += 1;


            if (this.waveNumber === 3) {
                this.scene.start(CST.SCENES.BOSS, {
                    livesNumber : this.livesNumber,
                    puntaje : this.puntaje,
    
                });
            }

            this.scene.start(CST.SCENES.PLAY, {
                waveNumber: this.waveNumber,
                puntaje: this.puntaje,
                lives: 2
            });
        }

        if (!estado) {



            this.make.text({
                x: this.sys.game.config.width / 2,
                y: this.sys.game.config.height / 2,
                text: 'GAME OVER click para reiniciar',
                origin: { x: 0.5, y: 0.5 },
                style: {
                    font: 'bold 64px Arial',
                    fill: 'white',
                    wordWrap: { width: this.sys.game.config.width }
                }
            });

            this.input.addListener('pointerdown', pointer => {

                //this.scene.restart();

                this.scene.start(CST.SCENES.PLAY, {
                    waveNumber: 1,
                    puntaje: 0,
                    lives: 2,
                });

            }, this);

        }

    }

    balas_jugador_callback(bullet, alien) {
        bullet.destroy();
        alien.destroy();


        //  Increase the puntaje
        this.puntaje += 20;
        this.puntajeText.text = 'Puntaje : ' + this.puntaje;
        this.add.sprite(alien.x + this.container.x, alien.y + this.container.y, "kaboom").play("boom");

        if (this.aliens.getChildren().length == 0) {
            this.puntaje += 1000;
            this.puntajeText.text = 'Puntaje : ' + this.puntaje;

            this.estadoFinalOla.call(this, true);





        }
    }

    balas_alien_callback(alienBullet, player) {
        alienBullet.destroy();
        this.add.sprite(this.player.x, this.player.y, "kaboom").play("boom");


        if (this.lives.getChildren().length == 1) {
            //funcion para remover evento de tiempo en loop
            this.eventoDeDisparoDeAliens.remove(false);
            this.alienTween.stop();

            this.playerBulletTimeEvent.paused = true;
            this.player.destroy();
            this.estadoFinalOla.call(this, false);

        } else {
            this.lives.getFirstAlive().destroy();
            this.livesNumber--;
            this.alienTween.stop();
            this.container.x = 100;
            this.container.y = 50;
            this.alienTween.resume();
            this.player.x = this.sys.game.config.width / 2;
            this.player.y = this.sys.game.config.height - 50;

        }


    }

    alien_chocan_callback(player, alien) {


        alien.destroy();
        if (this.lives.getChildren().length == 0) {
            //funcion para remove evento de tiempo en loop
            this.eventoDeDisparoDeAliens.remove(false);
            this.alienTween.stop();
            this.estadoFinalOla.call(this, false);

        } else {
            this.lives.getFirstAlive().destroy();
            this.livesNumber--;
            this.alienTween.stop();
            this.container.x = 100;
            this.container.y = 50;
            this.alienTween.resume();

            this.player.x = this.sys.game.config.width / 2;
            this.player.y = this.sys.game.config.height - 50;
        }



    }
}


