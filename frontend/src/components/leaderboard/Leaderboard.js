import React, { useState, useEffect } from "react";
import LeaderboardNav from "./LeaderboardNav";
import LeaderboardScore from "./LeaderboardScore";
import {
  getScoresByGame,
  getScoresByUserAndGame,
} from "../../controllers/LeaderboardController";
import { useAuth } from "../../context/AuthContext";

const Leaderboard = () => {
  const { currentUser } = useAuth();
  const [scores, setScores] = useState([]);
  const [activeGame, setActiveGame] = useState("tictactoe");
  const [activeScoreType, setActiveScoreType] = useState("personal");

  useEffect(() => {
    fetchScores();
  }, [activeGame, activeScoreType, currentUser]);

  const fetchScores = async () => {
    try {
      let fetchedScores = [];

      if (activeScoreType === "global") {
        fetchedScores = await getScoresByGame(activeGame);
      } else if (activeScoreType === "personal") {
        fetchedScores = await getScoresByUserAndGame(
          currentUser.id,
          activeGame
        );
      }

      setScores(fetchedScores);
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  const filterScores = () => {
    const sortedScores = [...scores].sort((a, b) => b.score - a.score);
    return sortedScores.slice(0, 10);
  };

  const handleGameChange = (game) => {
    setActiveGame(game);
  };

  const handleScoreTypeChange = (scoreType) => {
    setActiveScoreType(scoreType);
  };

  const filteredScores = filterScores();
  const capitalizedActiveGame =
    activeGame.charAt(0).toUpperCase() + activeGame.slice(1);
  return (
    <div className="container mt-5">
      <h3 className="display-4 mb-5">Leaderboard</h3>
      <h4>{currentUser.username}</h4>
      <LeaderboardNav
        onGameChange={handleGameChange} // Corrected here
        onScoreTypeChange={handleScoreTypeChange} // Corrected here
      />
      <h4 className="display-6 mb-2">{capitalizedActiveGame}</h4>
      <div className="list-group">
        {filteredScores.map((score, index) => (
          <LeaderboardScore
            key={score.id} // Use a unique identifier as the key
            rank={index + 1} // Assuming the rank is based on the index
            name={score.userId} // Use userId as the name
            score={score.score} // Assuming there is a 'score' property
            game={score.gameName} // Use gameName as the game
            currentUser={currentUser.username}
          />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
