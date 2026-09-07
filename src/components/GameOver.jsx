import {
    useAtomValue,
    useSetAtom
} from "jotai";

import {
    gameOverAtom,
    winnerAtom,
    playerScoreAtom,
    computerScoreAtom,
    gameStartedAtom,
} from "../atoms/gameAtoms"


function GameOver(){
    const setGameStarted = 
    useSetAtom(gameStartedAtom);
    const gameOver = 
    useAtomValue(gameOverAtom);

    const winner = 
    useAtomValue(winnerAtom);

    const setGameOver =
    useAtomValue(gameOverAtom);

    const setWinner =
    useSetAtom(winnerAtom);

    const setPlayerScore = 
    useSetAtom(playerScoreAtom);

    const setComputerScore = 
    useSetAtom(computerScoreAtom);


    function jogarNovamente(){
        setPlayerScore(0);

        setComputerScore(0);

        setWinner("");

        setGameOver(false);
    }

    if (!gameOver){
        return null;
    }

    return (
        <div className="game-over">

            <h2>Fim de jogo</h2>

            <p>
                {winner} venceu!
            </p>

        <button
        onClick={jogarNovamente}>
            Jogar novamente
        </button>

        <button
        onClick={{voltarMenu}}>
            Voltar ao menu
        </button>

        </div>
    );

    function voltarMenu(){
        setGameStarted(false);

        setPlayerScore(0);
        setComputerScore(0);

        setWinner("");

        setGameOver(false);
    }
}

export default GameOver;