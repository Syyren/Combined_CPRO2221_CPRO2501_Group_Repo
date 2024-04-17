import React from "react";

/**
 * Component for rendering the navigation controls for the leaderboard.
 * Allows users to select the game and leaderboard type.
 * @param {Object} props - The component props.
 * @param {Function} props.onGameChange - Function to handle game selection change.
 * @param {Function} props.onScoreTypeChange - Function to handle leaderboard type selection change.
 * @param {string} props.selectedGame - Currently selected game.
 * @param {string} props.selectedScoreType - Currently selected leaderboard type.
 */
const LeaderboardNav = ({
  onGameChange,
  onScoreTypeChange,
  selectedGame,
  selectedScoreType,
}) => {
  /**
   * Handles the change event for game selection.
   * @param {Object} e - The event object.
   */
  const handleGameChange = (e) => {
    const game = e.target.value;
    onGameChange(game);
  };

  /**
   * Handles the change event for leaderboard type selection.
   * @param {Object} e - The event object.
   */
  const handleScoreTypeChange = (e) => {
    const scoreType = e.target.value;
    onScoreTypeChange(scoreType);
  };

  // Render component
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
          <option value="cat-run">Cat Run!</option>
          <option value="canine_invaders">Canine Invaders</option>
        </select>
      </div>
      <div className="col-md-6">
        <label className="mb-0">Select Rankings:</label>
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
