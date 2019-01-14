import { loadScene } from "./scenes/loadScene"
import { playScene } from "./scenes/playScene";
import { menuScene } from "./scenes/menuScene";
import { bossScene } from "./scenes/bossScene";

/** @type {import ("../typings/phaser") }*/

// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );

    


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
        audio: {
            disableWebAudio: true
        },
    
        scene: [loadScene, menuScene, playScene, bossScene]
    
    };
    
    var game = new Phaser.Game(config);


});

/*
window.onload = () => {

    console.log("before phaser")
    /*

    WebFont.load({
        google: {
            families: ['Press Start 2P']
        },
        active: () => {




            console.log("active rdy")
            

        }
    });
   

  










}


 */








