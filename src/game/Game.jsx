import { useEffect, useRef } from "react";
import * as Phaser from "phaser";

import { PongScene } from "./PongScene";


function Game(){

    const gameContainer = useRef(null);
    const gameInstance = useRef(null);

    useEffect(() => {
        
        const config = {
            type: Phaser.AUTO,

            width: 800,
            height: 600,

            parent: gameContainer.current,

            scene: PongScene,

            physics: {
                default: "arcade",

                arcade: {
                    gravity: {
                        x: 0,
                        y: 0
                    },

                    debug: false
                }
            }

        };

        gameInstance.current = 
        new Phaser.Game(config);

        return () => {

            if (gameInstance.current){

                gameInstance.current.destroy(true);

                gameInstance.current = (null);
            }

        };

    }, []);

    return (
        <div ref={gameContainer}></div>
    );

}

export default Game;