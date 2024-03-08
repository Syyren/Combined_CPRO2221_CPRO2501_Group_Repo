import React, { useState } from "react";

const LeaderboardNav = ({ onGameChange, onScoreTypeChange }) => {
  const [selectedGame, setSelectedGame] = useState("hangman");
  const [selectedScoreType, setSelectedScoreType] = useState("personal");

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
    <div className="leaderboard-nav">
      <div className="form-group">
        <label htmlFor="gameSelect">Select Game:</label>
        <select
          className="form-control"
          id="gameSelect"
          value={selectedGame}
          onChange={handleGameChange}
        >
          <option value="hangman">Hangman</option>
          <option value="tictactoe">Tic Tac Toe</option>
          <option value="idlerunner">Idle Runner</option>
          <option value="galaga">Galaga</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="scoreTypeSelect">Select Score Type:</label>
        <select
          className="form-control"
          id="scoreTypeSelect"
          value={selectedScoreType}
          onChange={handleScoreTypeChange}
        >
          <option value="personal">Personal</option>
          <option value="worldwide">Worldwide</option>
        </select>
      </div>
    </div>
  );
};

export default LeaderboardNav;
