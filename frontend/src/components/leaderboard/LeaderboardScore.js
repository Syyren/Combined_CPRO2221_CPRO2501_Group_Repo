import React from "react";

/**
 * Component for rendering a single score entry in the leaderboard.
 * @param {Object} props - The component props.
 * @param {number} props.rank - The rank of the score.
 * @param {string} props.name - The name associated with the score.
 * @param {number} props.score - The score value.
 * @param {string} props.timestamp - The creation date of the score, can be null.
 * @param {string} props.currentUser - The username of the current user (if logged in).
 */
const LeaderboardScore = ({ rank, name, score, currentUser, timestamp }) => {
  // Determine if the score entry belongs to the current user
  const isCurrentUserScore = name === currentUser;

  // Define badge elements for ranking
  const badge = <span className={`badge bg-light me-2 text-dark`}>{rank}</span>;
  const currentUserBadge = (
    <span className={`badge bg-success me-2 text-dark`}>{rank}</span>
  );

  const selectedBadge = isCurrentUserScore ? currentUserBadge : badge;

  // Format the timestamp or show "Date Unknown"
  const formattedDate = timestamp
    ? new Date(timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Date Unknown";

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
        <div className="text-end">
          <small className="fw-bold">{score}</small>
          <br />
          <small style={{ fontSize: "0.65rem", color: "#6c757d" }}>
            {formattedDate}
          </small>
        </div>
      </div>
    </a>
  );
};

export default LeaderboardScore;
