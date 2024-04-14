import React from "react";

const GameOverScreen = ({ score, level, onRestart }) => {
  return (
    <div className="game-over-screen">
      <h1>Game Over</h1>
      <p>Your Score: {score}</p>
      <p>Level Reached: {level}</p>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
};

export default GameOverScreen;
