import React from "react";

const LeaderboardScore = ({ name, score, game }) => {
  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="row leaderboard-score">
      <div className="col">{name}</div>
      <div className="col">{score}</div>
      <div className="col">{capitalizeFirstLetter(game)}</div>
    </div>
  );
};

export default LeaderboardScore;
