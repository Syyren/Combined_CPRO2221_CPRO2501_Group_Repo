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
      scores: [],
      activeGame: "tictactoe",
      activeScoreType: "personal",
      currentUser: "Mario",
    };
  }

  componentDidMount() {
    this.fetchScores();
  }

  fetchScores = async () => {
    try {
      const { activeScoreType, activeGame, currentUser } = this.state;
      let scores = [];

      if (activeScoreType === "global") {
        scores = await getScoresByGame(activeGame);
      } else if (activeScoreType === "personal") {
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
              key={score.id}
              rank={index + 1}
              name={score.userId}
              score={score.score}
              game={score.gameName}
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Leaderboard;
