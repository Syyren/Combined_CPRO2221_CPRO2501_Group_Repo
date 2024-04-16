import React from "react";

const LeaderboardScore = ({ rank, name, score, currentUser }) => {
  const isCurrentUserScore = name === currentUser;
  const badge = <span className={`badge bg-light me-2 text-dark`}>{rank}</span>;
  const currentUserBadge = (
    <span className={`badge bg-success me-2 text-dark`}>{rank}</span>
  );
  const selectedBadge = isCurrentUserScore ? currentUserBadge : badge;

  return (
    <a
      href="#"
      className={`list-group-item list-group-item-action ${
        isCurrentUserScore ? "border border-primary" : ""
      }`}
    >
      <div className="d-flex w-100 justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          {selectedBadge}
          <h5 className="mb-0">{name}</h5>
        </div>
        <small>{score}</small>
      </div>
    </a>
  );
};

export default LeaderboardScore;
