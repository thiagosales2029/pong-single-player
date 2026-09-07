import { useAtomValue } from "jotai";

import {
    playerScoreAtom,
    computerScoreAtom,
} from "../atoms/gameAtoms";


function Score(){
    const playerScore = useAtomValue(playerScoreAtom);
    const computerScore = useAtomValue(computerScoreAtom);

    return (
        <div className="score">
            <span>{playerScore}</span>

            <span>:</span>

            <span>{computerScore}</span>
        </div>
    );
}

export default Score;