import React from "react";

const LeaderboardScore = ({ rank, name, score }) => {
  return (
    <a href="#" className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <span className="badge bg-primary me-2">{rank}</span>
          <h5 className="mb-0">{name}</h5>
        </div>
        <small>{score}</small>
      </div>
    </a>
  );
};

export default LeaderboardScore;
