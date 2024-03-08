import React from "react";
import LeaderboardNav from "./LeaderboardNav";
import LeaderboardScore from "./LeaderboardScore";

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
      filteredScores: [], // Filtered scores based on user selection
      activeGame: "hangman",
      activeScoreType: "personal",
      currentUser: "Player1", // Assuming the current user is 'Player1'
      // Example scores
      exampleScores: [
        { username: "Player1", score: 100, game: "hangman" },
        { username: "Player2", score: 90, game: "hangman" },
        { username: "Player3", score: 80, game: "hangman" },
        { username: "Player4", score: 70, game: "hangman" },
        { username: "Player5", score: 60, game: "hangman" },
        { username: "Player1", score: 200, game: "tictactoe" },
        { username: "Player2", score: 190, game: "tictactoe" },
        { username: "Player3", score: 180, game: "tictactoe" },
        { username: "Player4", score: 170, game: "tictactoe" },
        { username: "Player5", score: 160, game: "tictactoe" },
        { username: "Player1", score: 300, game: "idlerunner" },
        { username: "Player2", score: 290, game: "idlerunner" },
        { username: "Player3", score: 280, game: "idlerunner" },
        { username: "Player4", score: 270, game: "idlerunner" },
        { username: "Player5", score: 260, game: "idlerunner" },
        { username: "Player1", score: 400, game: "galaga" },
        { username: "Player2", score: 390, game: "galaga" },
        { username: "Player3", score: 380, game: "galaga" },
        { username: "Player4", score: 370, game: "galaga" },
        { username: "Player5", score: 360, game: "galaga" },
      ],
    };
  }

  componentDidMount() {
    // Filter scores based on active game and score type
    this.filterScores();
  }

  componentDidUpdate(prevProps, prevState) {
    // Re-filter scores if game or score type changes
    if (
      prevState.activeGame !== this.state.activeGame ||
      prevState.activeScoreType !== this.state.activeScoreType
    ) {
      this.filterScores();
    }
  }

  // Method to filter scores based on active game and score type
  filterScores = () => {
    const { exampleScores, activeGame, activeScoreType, currentUser } =
      this.state;
    let filteredScores = exampleScores.filter(
      (score) =>
        score.game === activeGame &&
        (activeScoreType === "personal" ? score.username === currentUser : true)
    );
    this.setState({ filteredScores });
  };

  // Method to handle game change
  handleGameChange = (game) => {
    this.setState({ activeGame: game });
  };

  // Method to handle score type change
  handleScoreTypeChange = (scoreType) => {
    this.setState({ activeScoreType: scoreType });
  };

  render() {
    const { filteredScores, activeGame, activeScoreType } = this.state;
    return (
      <div className="container">
        <h3 className="display-5 mb-5">Leaderboard</h3>
        <LeaderboardNav
          onGameChange={this.handleGameChange}
          onScoreTypeChange={this.handleScoreTypeChange}
        />
        <div className="leaderboard-scores">
          {filteredScores.map((score, index) => (
            <LeaderboardScore
              key={index}
              name={score.username}
              score={score.score}
              game={score.game}
            />
          ))}
        </div>
        <p className="mt-3">
          Showing {activeScoreType === "personal" ? "personal" : "worldwide"}{" "}
          scores for {activeGame}
        </p>
      </div>
    );
  }
}

export default Leaderboard;
