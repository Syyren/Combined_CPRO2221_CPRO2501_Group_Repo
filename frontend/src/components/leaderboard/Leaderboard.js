import React from "react";
import LeaderboardNav from "./LeaderboardNav";
import LeaderboardScore from "./LeaderboardScore";

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [], // Your scores array
      activeGame: "hangman",
      activeScoreType: "personal",
      currentUser: "Player1", // Assuming the current user is 'Player1'
    };
  }

  componentDidMount() {
    // Simulating fetching scores from an API or database
    this.fetchScores();
  }

  fetchScores = () => {
    // Example scores
    const exampleScores = [];

    // Function to generate a random score
    const generateRandomScore = () => Math.floor(Math.random() * 100) + 1;

    // Generate 5 example scores for each game
    const games = ["hangman", "tictactoe", "idlerunner", "galaga"];
    for (let i = 0; i < games.length; i++) {
      for (let j = 1; j <= 5; j++) {
        exampleScores.push({
          username: `Player${j}`,
          score: generateRandomScore(),
          game: games[i],
        });
      }
    }

    // Sort the scores array in descending order based on the score
    const sortedScores = exampleScores.sort((a, b) => b.score - a.score);

    // Assign ranks to the sorted scores
    const rankedScores = sortedScores.map((score, index) => ({
      ...score,
      rank: index + 1, // Rank starts from 1
    }));

    // Update state with ranked scores
    this.setState({ scores: rankedScores });
  };

  filterScores = () => {
    const { scores, activeGame, activeScoreType, currentUser } = this.state;

    // Filter scores based on the active game and score type
    let filteredScores = scores.filter(
      (score) =>
        (activeScoreType === "personal"
          ? score.username === currentUser
          : true) && (activeGame === "all" ? true : score.game === activeGame)
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
    const { activeGame, activeScoreType } = this.state;
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
              key={index}
              rank={score.rank}
              name={score.username}
              score={score.score}
              game={score.game}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Leaderboard;
