import React, { useState } from "react";

const LeaderboardNav = ({ onGameChange, onScoreTypeChange }) => {
  const [selectedGame, setSelectedGame] = useState("canine_invaders");
  const [selectedScoreType, setSelectedScoreType] = useState("global");

  const handleGameChange = (e) => {
    const game = e.target.value;
    setSelectedGame(game);
    onGameChange(game);
  };

  const handleScoreTypeChange = (e) => {
    const scoreType = e.target.value;
    setSelectedScoreType(scoreType);
    onScoreTypeChange(scoreType);
  };

  return (
    <div className="row mb-4">
      <div className="col-md-6 mb-2">
        <label className="mb-0">Select Game:</label>
        <select
          className="form-control bg-light"
          value={selectedGame}
          onChange={handleGameChange}
        >
          <option value="hangman">Hangman</option>
          <option value="tictactoe">Tic Tac Toe</option>
          <option value="idlerunner">Idle Runner</option>
          <option value="canine_invaders">Canine Invaders</option>
        </select>
      </div>
      <div className="col-md-6">
        <label className="mb-0">Select Leaderboard Type:</label>
        <select
          className="form-control bg-light"
          value={selectedScoreType}
          onChange={handleScoreTypeChange}
        >
          <option value="personal">Personal</option>
          <option value="global">Global</option>
        </select>
      </div>
    </div>
  );
};

export default LeaderboardNav;
