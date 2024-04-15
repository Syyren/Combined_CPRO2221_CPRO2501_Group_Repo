import React from "react";

const LeaderboardNav = ({
  onGameChange,
  onScoreTypeChange,
  selectedGame,
  selectedScoreType,
}) => {
  const handleGameChange = (e) => {
    const game = e.target.value;
    onGameChange(game);
  };

  const handleScoreTypeChange = (e) => {
    const scoreType = e.target.value;
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
          <option value="cat-run">Run Cat!</option>
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
          <option value="friends">Friends</option>
        </select>
      </div>
    </div>
  );
};

export default LeaderboardNav;
