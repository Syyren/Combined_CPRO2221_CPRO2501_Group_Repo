import React from "react";

/**
 * Component for the header section of the Arcade Shooter game.
 *
 * @param {number} lives - Number of remaining lives.
 * @param {number} level - Current level of the game.
 * @param {number} score - Current score of the player.
 */
const ArcadeShooterHeader = ({ lives, level, score }) => (
  <header className="d-flex justify-content-between align-items-center bg-primary text-white p-3">
    <h3 className="h3">Don't let the Dogfighters past!</h3>
    <div className="d-flex align-items-center">
      <div className="mx-3">
        <strong>Lives:</strong> <span className="badge bg-danger">{lives}</span>
      </div>
      <div className="mx-3">
        <strong>Level:</strong>{" "}
        <span className="badge bg-success">{level}</span>
      </div>
      <div className="mx-3">
        <strong>Score:</strong> <span className="badge bg-info">{score}</span>
      </div>
    </div>
  </header>
);

export default ArcadeShooterHeader;
