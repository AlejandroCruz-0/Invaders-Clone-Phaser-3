import {
    loadScene
} from "./scenes/loadScene";
import {
    playScene
} from "./scenes/playScene";
import {
    menuScene
} from "./scenes/menuScene";
import {
    bossScene
} from "./scenes/bossScene";

//aca se importa el plugin de webfont para cargar fuentes
import WebFontLoaderPlugin from '../plugins/webfontloader-plugin';

/** @type {import ("../typings/phaser") }*/


//Iniciamos el juego cuando la ventana carge.
window.onload = function () {




    console.log("ready!");




    var config = {
        type: Phaser.AUTO,
        height: 800,
        width: 600,

        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 200
                },
                debug: false
            }
        },
        audio: {
            disableWebAudio: true
        },
        plugins: {
            global: [{
                key: 'WebFontLoader',
                plugin: WebFontLoaderPlugin,
                start: true
            }]
        },

        scene: [loadScene, menuScene, playScene, bossScene]

    };

    var game = new Phaser.Game(config);
    



}