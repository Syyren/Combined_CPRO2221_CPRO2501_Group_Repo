import React, { useState, useEffect, useMemo } from "react";
import LeaderboardNav from "./LeaderboardNav";
import LeaderboardScore from "./LeaderboardScore";
import {
  getScoresByGame,
  getScoresByUserAndGame,
} from "../../controllers/LeaderboardController";
import { getPlayerById } from "../../controllers/PlayerController";
import { useAuth } from "../../context/AuthContext";

/**
 * Component for displaying the leaderboard.
 */
const Leaderboard = () => {
  const { currentUser } = useAuth(); // Current user context
  const [scores, setScores] = useState([]); // State for leaderboard scores
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [activeGame, setActiveGame] = useState("canine_invaders"); // Active game state
  const [activeScoreType, setActiveScoreType] = useState("global"); // Active score type state

  // Get the formatted game name based on the game ID
  const formattedGameName = getGameDisplayName(activeGame);

  // Fetch leaderboard scores when active game or score type changes
  useEffect(() => {
    const fetchAndSetScores = async () => {
      setLoading(true);
      setError(null);
      try {
        let fetchedScores = [];
        if (activeScoreType === "global") {
          fetchedScores = await getScoresByGame(activeGame);
        } else if (activeScoreType === "personal" && currentUser) {
          fetchedScores = await getScoresByUserAndGame(
            currentUser.userId,
            activeGame
          );
        } else if (activeScoreType === "friends" && currentUser) {
          const user = await getPlayerById(currentUser.userId);
          const allUserIds = [currentUser.userId, ...user.friends];
          const friendsScoresPromises = allUserIds.map((userId) =>
            getScoresByUserAndGame(userId, activeGame)
          );
          const friendsScoresArrays = await Promise.all(friendsScoresPromises);
          fetchedScores = friendsScoresArrays.flat();
        }

        // Fetch usernames for all scores
        const scoresWithUsernames = await Promise.all(
          fetchedScores.map(async (score) => {
            try {
              const player = await getPlayerById(score.userId);
              return { ...score, username: player.username };
            } catch (error) {
              console.error("Failed to fetch username:", error);
              return { ...score, username: "Unknown" };
            }
          })
        );

        setScores(scoresWithUsernames);
      } catch (error) {
        console.error("Error fetching scores:", error);
        setError("Failed to fetch scores.");
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetScores();
  }, [activeGame, activeScoreType, currentUser]);

  // Memoize filtered scores to prevent unnecessary re-renders
  const filteredScores = useMemo(() => {
    const sortedScores = [...scores].sort((a, b) => b.score - a.score);
    return sortedScores.slice(0, 10);
  }, [scores]);

  // Handle game change event
  const handleGameChange = (game) => {
    setActiveGame(game);
  };

  // Handle score type change event
  const handleScoreTypeChange = (scoreType) => {
    setActiveScoreType(scoreType);
  };

  // Function to get the formatted game display name
  function getGameDisplayName(activeGame) {
    const gameNames = {
      hangman: "Hangman",
      tictactoe: "Tic Tac Toe",
      "cat-run": "Cat Run!",
      canine_invaders: "Canine Invaders",
    };

    return gameNames[activeGame] || "Game";
  }

  // Render component
  return (
    <div className="container mt-5">
      <h3 className="display-4 mb-5">Leaderboard for {formattedGameName}</h3>
      <LeaderboardNav
        onGameChange={handleGameChange}
        onScoreTypeChange={handleScoreTypeChange}
        selectedGame={activeGame}
        selectedScoreType={activeScoreType}
      />
      <div className="list-group">
        {filteredScores.map((score, index) => (
          <LeaderboardScore
            key={score.id}
            rank={index + 1}
            name={score.username}
            score={score.score}
            game={formattedGameName}
            currentUser={currentUser && currentUser.username}
          />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
