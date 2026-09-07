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
} from "../atoms/gameAtoms";

function StartMenu() {
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