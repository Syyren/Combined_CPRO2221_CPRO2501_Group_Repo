import React from "react";
import LeaderboardNav from "./LeaderboardNav";
import LeaderboardScore from "./LeaderboardScore";
import {
  getAllScores,
  getScoresByGame,
  getScoresByUser,
  getScoresByUserAndGame,
  submitScore,
} from "../../controllers/LeaderboardController";

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [], // Your scores array
      activeGame: "tictactoe",
      activeScoreType: "personal",
      currentUser: "Mario", // Assuming the current user is 'Player1'
    };
  }

  componentDidMount() {
    // Fetch scores from the backend when the component mounts
    this.fetchScores();
  }

  fetchScores = async () => {
    try {
      // Retrieve all scores from the backend
      const scores = await getAllScores();
      this.setState({ scores });
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  filterScores = () => {
    const { scores, activeGame, activeScoreType, currentUser } = this.state;

    // Filter scores based on the active game and score type
    let filteredScores = scores.filter(
      (score) =>
        (activeScoreType === "personal"
          ? score.userId === currentUser // Adjusted to use userId
          : true) &&
        (activeGame === "all" ? true : score.gameName === activeGame) // Adjusted to use gameName
    );

    // If active game is not 'all', assign ranks within the group of scores for that game
    if (activeGame !== "all" && filteredScores.length > 0) {
      // Sort the filtered scores array in descending order based on the score
      filteredScores.sort((a, b) => b.score - a.score);

      // Assign ranks within the group of scores for the active game
      let rank = 1;
      let prevScore = filteredScores[0].score;
      filteredScores.forEach((score, index) => {
        if (score.score !== prevScore) {
          rank = index + 1;
        }
        score.rank = rank;
        prevScore = score.score;
      });
    }

    return filteredScores;
  };

  handleGameChange = (game) => {
    this.setState({ activeGame: game });
  };

  handleScoreTypeChange = (scoreType) => {
    this.setState({ activeScoreType: scoreType });
  };

  render() {
    const { activeGame, activeScoreType, currentUser } = this.state;
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
