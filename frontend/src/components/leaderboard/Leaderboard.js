import React from "react";
import LeaderboardNav from "./LeaderboardNav";
import LeaderboardScore from "./LeaderboardScore";
import {
  getScoresByGame,
  getScoresByUserAndGame,
} from "../../controllers/LeaderboardController";

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [], // Your scores array
      activeGame: "tictactoe",
      activeScoreType: "personal",
      currentUser: "Mario", // Assuming the current user is 'Mario'
    };
  }

  componentDidMount() {
    // Fetch scores from the backend when the component mounts
    this.fetchScores();
  }

  fetchScores = async () => {
    try {
      const { activeScoreType, activeGame, currentUser } = this.state;
      let scores = [];

      if (activeScoreType === "global") {
        // Fetch scores based on the game name for global searches
        scores = await getScoresByGame(activeGame);
      } else if (activeScoreType === "personal") {
        // Fetch scores based on both user ID and game name for personal searches
        scores = await getScoresByUserAndGame(currentUser, activeGame);
      }

      this.setState({ scores });
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  filterScores = () => {
    const { scores } = this.state;

    // Sorting scores based on score value in descending order
    const sortedScores = scores.sort((a, b) => b.score - a.score);

    // Return the top 10 scores
    return sortedScores.slice(0, 10);
  };

  handleGameChange = (game) => {
    this.setState({ activeGame: game }, this.fetchScores);
  };

  handleScoreTypeChange = (scoreType) => {
    this.setState({ activeScoreType: scoreType }, this.fetchScores);
  };

  render() {
    const { activeGame, currentUser } = this.state;
    const filteredScores = this.filterScores();
    // Capitalize the first letter of activeGame
    const capitalizedActiveGame =
      activeGame.charAt(0).toUpperCase() + activeGame.slice(1);
    return (
      <div className="container mt-5">
        <h3 className="display-4 mb-5">Leaderboard</h3>
        <LeaderboardNav
          onGameChange={this.handleGameChange}
          onScoreTypeChange={this.handleScoreTypeChange}
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
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Leaderboard;
