import React, { useState } from "react";
import GameGrid from "./GameGrid.js";

function Game() {
  const [moves, setMoves] = useState(new Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWinner() {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
        setGameOver(true);
        setWinner(moves[a]);
        return;
      }
    }

    if (!moves.includes("")) {
      setGameOver(true);
      setWinner("Tie");
    }
  }

  function gridClick(whichSquare) {
    if (gameOver || moves[whichSquare] !== "") return;

    const newMoves = [...moves];
    newMoves[whichSquare] = turn;

    setMoves(newMoves);
    checkWinner();

    if (!gameOver && turn === "X") {
      setTurn("O");

      setTimeout(() => {
        const aiMoveIndex = aiMove(newMoves);
        const aiMoves = [...newMoves];
        aiMoves[aiMoveIndex] = "O";
        setMoves(aiMoves);
        checkWinner();
        setTurn("X");
      }, 500);
    } else {
      setTurn(turn === "X" ? "O" : "X");
    }
  }

  function aiMove(currentMoves) {
    const availableMoves = currentMoves
      .map((move, index) => move === "" ? index : null)
      .filter(index => index !== null);

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      const player = "O";
      const opponent = "X";

      if (currentMoves[a] === currentMoves[b] && currentMoves[a] === player && currentMoves[c] === "") {
        return c;
      }
      if (currentMoves[a] === currentMoves[c] && currentMoves[a] === player && currentMoves[b] === "") {
        return b;
      }
      if (currentMoves[b] === currentMoves[c] && currentMoves[b] === player && currentMoves[a] === "") {
        return a;
      }

      if (currentMoves[a] === currentMoves[b] && currentMoves[a] === opponent && currentMoves[c] === "") {
        return c;
      }
      if (currentMoves[a] === currentMoves[c] && currentMoves[a] === opponent && currentMoves[b] === "") {
        return b;
      }
      if (currentMoves[b] === currentMoves[c] && currentMoves[b] === opponent && currentMoves[a] === "") {
        return a;
      }
    }

    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    return randomMove;
  }

  function newGame() {
    setMoves(new Array(9).fill(""));
    setTurn("X");
    setGameOver(false);
    setWinner(null);
  }

  return (
    <>
      <h1>Tic-Tac-Toe</h1>

      <GameGrid moves={moves} click={gridClick} />

      {gameOver ? (
        <p>
          {winner === "Tie"
            ? "It's a tie!"
            : `Player ${winner} wins!`}
        </p>
      ) : (
        <p>
          Turn: <strong className={turn}>{turn}</strong>
        </p>
      )}

      <button onClick={newGame}>New Game</button>
    </>
  );
}

export default Game;
