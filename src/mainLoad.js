import { playScene } from "./scenes/playScene";

        var config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,

            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 200 },
                    debug: false
                }
            },

            scene: playScene,

        };



        window.fbAsyncInit = function () {
            FB.init({
                appId: '2037564059645000',
                xfbml: true,
                version: 'v3.2'
            });

            // ADD ADDITIONAL FACEBOOK CODE HERE

            FBInstant.initializeAsync().then(function () {
                FBInstant.setLoadingProgress(100);
                FBInstant.startGameAsync().then(function () {
                    var game = new Phaser.Game(config);
                })
            })
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));