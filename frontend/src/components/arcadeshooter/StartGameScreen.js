import React from "react";

/**
 * Component for displaying the start game screen.
 *
 * @param {Function} onStart - Callback function to start the game.
 */
const StartGameScreen = ({ onStart }) => (
  <div className="start-screen text-center mt-5">
    <h1>Welcome to Canine Invaders!</h1>
    <button onClick={onStart} className="btn btn-lg btn-success mt-3">
      Play
    </button>
  </div>
);

export default StartGameScreen;
