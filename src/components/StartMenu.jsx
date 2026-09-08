import {
  useAtom,
  useSetAtom
} from "jotai";

import {
  difficultAtom,
  gameStartedAtom,
  gameOverAtom,
  playerScoreAtom,
  computerScoreAtom,
  winnerAtom,
  gameModeAtom,
} from "../atoms/gameAtoms";

function StartMenu() {

  const[gameMode, setGameMode] =
  useAtom(gameModeAtom);

  const [difficult, setDifficulty] =
    useAtom(difficultAtom);

  const setGameStarted =
    useSetAtom(gameStartedAtom);

  const setGameOver =
    useSetAtom(gameOverAtom);

  const setPlayerScore =
    useSetAtom(playerScoreAtom);

  const setComputerScore =
    useSetAtom(computerScoreAtom);

  const setWinner =
    useSetAtom(winnerAtom);

  function iniciarJogo() {
    setPlayerScore(0);
    setComputerScore(0);

    setWinner("");

    setGameOver(false);

    setGameStarted(true);
  }

  return (
    <div className="start-menu">

      <h2>PONG</h2>

      <p>Modo de jogo</p>

      <div className="mode-buttons">

      <button className={
        gameMode === "1p"
        ? "selected"
        : ""
      }
      onClick={() =>
        setGameMode("1p")
      }

      >
        1 Jogador
      </button>

      <button className={
        gameMode === "2p"
        ? "selected"
        : ""
      }
      onClick={() =>
        setGameMode("2p")
      }
      >
        2 Jogadores
      </button>
      </div>



    {gameMode === "1p" && (

    <>
        <p>Escolha a dificuldade</p>

        <div className="difficulty-buttons">

        <button
          className={
            difficult === "facil"
              ? "selected"
              : ""
          }
          onClick={() =>
            setDifficulty("facil")
          }
        >
          Fácil
        </button>

        <button
          className={
            difficult === "normal"
              ? "selected"
              : ""
          }
          onClick={() =>
            setDifficulty("normal")
          }
        >
          Normal
        </button>

        <button
          className={
            difficult === "dificil"
              ? "selected"
              : ""
          }
          onClick={() =>
            setDifficulty("dificil")
          }
        >
          Difícil
        </button>
      </div>  
        
     </>

    )}

      
    <button
        className="start-button"
        onClick={iniciarJogo}
      >
        Jogar
      </button>

    </div>
  );
}

export default StartMenu;