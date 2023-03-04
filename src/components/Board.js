import React, { useCallback, useEffect, useState } from "react";
import { minmax } from "../ai/minmax";
import { get_score, is_no_empty_cells, is_winning_state } from "../util/board";
import Cell from "./Cell";
import GameoverModal from "./GameoverModal";

const initialGameState = Array(9).fill(null);

export default function Board({ boardSize }) {
  const [humanTurn, setHumanTurn] = useState(true);
  const [gameState, setGameState] = useState(initialGameState);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleCellClick = (cellId) => {
    if (humanTurn) playMove(cellId);
  };

  const playMove = useCallback(
    (moveIdx) => {
      if (gameState[moveIdx] !== null) return;

      let newState = [...gameState];
      if (humanTurn) newState[moveIdx] = 1;
      else newState[moveIdx] = -1;

      setGameState(newState);
      setHumanTurn((prevState) => !prevState);

      // check if game has ended
      if (is_no_empty_cells(newState) || is_winning_state(newState))
        setIsGameOver(true);
    },
    [gameState, humanTurn]
  );

  const restartGame = () => {
    setGameState(initialGameState);
    setHumanTurn(true);
    setIsGameOver(false);
  };

  useEffect(() => {
    (async () => {
      // exit if it's human turn
      if (humanTurn) return;

      await new Promise((res, rej) => {
        setTimeout(res, 1000);
      });

      // agent will play its move
      const bestMoveIdx = minmax(gameState);
      playMove(bestMoveIdx);
      // console.log(bestMoveIdx);
    })();
  }, [humanTurn, gameState, playMove]);

  return (
    <div className="">
      <div className="flex justify-between">
        <p
          className={`text-sm font-medium text-right text-white p-1 rounded px-2 my-1 ${
            !humanTurn ? "bg-red-500" : "text-black"
          }`}
        >
          AI's Turn
        </p>
        <p
          className={`text-sm font-medium text-right text-white p-1 rounded px-2 my-1 ${
            humanTurn ? "bg-green-500" : "text-black"
          }`}
        >
          Your Turn
        </p>
      </div>

      <section className="board mx-auto">
        {Array(boardSize)
          .fill(0)
          .map((_, idx) => (
            <Cell
              key={idx}
              cellId={idx}
              content={gameState[idx]}
              onCellClick={handleCellClick}
            />
          ))}
      </section>
      <GameoverModal
        isOpen={isGameOver}
        score={get_score(gameState)}
        onRequestClose={restartGame}
      />
    </div>
  );
}
