import './App.css';

import { useAtomValue } from 'jotai';


import { 
  gameStartedAtom 
} from "./atoms/gameAtoms";

import Game from "./game/Game";
import Score from "./components/Score";
import GameOver from './components/GameOver';
import StartMenu from './components/StartMenu';


function App() {
  const gameStarted = 
  useAtomValue(gameStartedAtom);

  return (
    <div className="App">
    
    {!gameStarted && (
      <StartMenu />
    )}

    {gameStarted && (
      <>
        <h1>PONG</h1>

        <Score />

        <Game />
    
        <GameOver />
      </>
    )}

    </div>
  );
}

export default App;
