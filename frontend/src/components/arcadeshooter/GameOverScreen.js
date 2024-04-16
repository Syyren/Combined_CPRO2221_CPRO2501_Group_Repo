import React from "react";

/**
 * Component for displaying the game over screen.
 *
 * @param {number} score - The final score achieved by the player.
 * @param {number} level - The level reached by the player before game over.
 * @param {Function} onRestart - Callback function to restart the game.
 */
const GameOverScreen = ({ score, level, onRestart }) => {
  return (
    <div className="game-over-screen text-center mt-5">
      <h1 className="mb-3">Game Over</h1>
      <p className="lead">Your Score: {score}</p>
      <p className="lead">Level Reached: {level}</p>
      <button onClick={onRestart} className="btn btn-primary btn-lg mt-3">
        Play Again
      </button>
    </div>
  );
};

export default GameOverScreen;
