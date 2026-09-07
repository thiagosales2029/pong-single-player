import { atom } from "jotai";

export const playerScoreAtom = atom(0);
export const computerScoreAtom = atom(0);

export const gameStartedAtom = atom(false);
export const gameOverAtom = atom(false);

export const winnerAtom = atom("");

export const difficultAtom = atom("normal");