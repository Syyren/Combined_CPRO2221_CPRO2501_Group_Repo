import React from "react";

/**
 * Component for rendering a single score entry in the leaderboard.
 * @param {Object} props - The component props.
 * @param {number} props.rank - The rank of the score.
 * @param {string} props.name - The name associated with the score.
 * @param {number} props.score - The score value.
 * @param {string} props.currentUser - The username of the current user (if logged in).
 */
const LeaderboardScore = ({ rank, name, score, currentUser }) => {
  // Determine if the score entry belongs to the current user
  const isCurrentUserScore = name === currentUser;

  // Define badge elements for ranking
  const badge = <span className={`badge bg-light me-2 text-dark`}>{rank}</span>;
  const currentUserBadge = (
    <span className={`badge bg-success me-2 text-dark`}>{rank}</span>
  );
  const selectedBadge = isCurrentUserScore ? currentUserBadge : badge;

  // Render component
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
