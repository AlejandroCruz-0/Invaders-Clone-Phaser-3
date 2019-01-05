import { loadScene } from "./scenes/loadScene"
import { playScene } from "./scenes/playScene";
import { menuScene } from "./scenes/menuScene";

/** @type {import ("../typings/phaser") }*/


window.onload = () => {
    
    var config = {
        type: Phaser.AUTO,
        height: 800,
        width: 600,

        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 },
                debug: false
            }
        },

        scene: [loadScene,menuScene,playScene]

    };

    var game = new Phaser.Game(config);











}











