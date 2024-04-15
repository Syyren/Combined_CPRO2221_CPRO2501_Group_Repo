import React, { useState, useEffect, useMemo } from "react";
import LeaderboardNav from "./LeaderboardNav";
import LeaderboardScore from "./LeaderboardScore";
import {
  getScoresByGame,
  getScoresByUserAndGame,
} from "../../controllers/LeaderboardController";
import { getPlayerById } from "../../controllers/PlayerController";
import { useAuth } from "../../context/AuthContext";

const Leaderboard = () => {
  const { currentUser } = useAuth();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeGame, setActiveGame] = useState("canine_invaders");
  const [activeScoreType, setActiveScoreType] = useState("global");

  const formattedGameName = getGameDisplayName(activeGame);

  useEffect(() => {
    const fetchAndSetScores = async () => {
      console.log(currentUser);
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

        // Fetch user names for all scores
        const scoresWithUsernames = await Promise.all(
          fetchedScores.map(async (score) => {
            try {
              const player = await getPlayerById(score.userId);
              return { ...score, username: player.username };
            } catch (error) {
              console.error("Failed to fetch user name:", error);
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

  const filteredScores = useMemo(() => {
    const sortedScores = [...scores].sort((a, b) => b.score - a.score);
    return sortedScores.slice(0, 10);
  }, [scores]);

  const handleGameChange = (game) => {
    setActiveGame(game);
  };

  const handleScoreTypeChange = (scoreType) => {
    setActiveScoreType(scoreType);
  };

  function getGameDisplayName(activeGame) {
    const gameNames = {
      hangman: "Hangman",
      tictactoe: "Tic Tac Toe",
      "cat-run": "Cat Run!",
      canine_invaders: "Canine Invaders",
    };

    return gameNames[activeGame] || "Game";
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
