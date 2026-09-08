import { useAtomValue } from "jotai";

import {
    playerScoreAtom,
    computerScoreAtom,
    gameModeAtom,
} from "../atoms/gameAtoms";


function Score(){

    const gameMode = useAtomValue(gameModeAtom);
    const playerScore = useAtomValue(playerScoreAtom);
    const computerScore = useAtomValue(computerScoreAtom);

    return (
        <div className="score">
            <div>
                <small>Jogador 1</small>
                <br/>
                <span>{playerScore}</span>
            </div>

            <span>:</span>


            <div>
                <small>
                    {gameMode === "2p"
                        ? "Jogador 2"
                        : "Computador"}
                </small>
                <br/>
                <span>{computerScore}</span>
            </div>
            
        </div>
    );
}

export default Score;