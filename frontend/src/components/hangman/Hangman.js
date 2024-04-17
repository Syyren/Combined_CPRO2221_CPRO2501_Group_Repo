import React, { useState, useEffect } from "react";
import Word from "./Word";
import Score from "./Score";
import { submitScore} from "../../controllers/LeaderboardController.js"
import Gallow from "./Gallow/Gallow";
import Alphabet from "./Alphabet";
import Message from "./Message";
import { HangmanAPI } from "../../controllers/HangmanController";
import { useAuth } from "../../context/AuthContext";

const Hangman = () => {
  const [gameState, setGameState] = useState(null);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(null);
  const { currentUser } = useAuth();
  //const [Nine, setNine] = useState(9);
  const [antiSpam, setAntiSpam] = useState(false)

  const fetchGameState = async () => {
    try {
      const response = await HangmanAPI.fetchGameState();
      setGameState(response.data);
      setDisabledLetters(response.data.lettersGuessed);
      setGuessesLeft(response.data.guessesLeft);
    } catch (error) {
      console.error("Error fetching game state:", error);
    }
  };

  const handleLetterSelect = async (letter) => {
    try {
      setAntiSpam(false);
      const response = await HangmanAPI.handleLetterSelect(letter);
      setGameState(response.data);
      checkGameResult(response.data);
      updateDisabledLetters(letter);
      //setNine(response.data.guessesLeft);
    } catch (error) {
      console.error("Error selecting letter:", error);
    }
  };

  const updateDisabledLetters = (letter) => {
    setDisabledLetters([...disabledLetters, letter]);
  };

  const checkGameResult = (gameState) => {
    if (gameState.gameStatus === "won") {
      renderMessage("won");
      
    } else if (gameState.gameStatus === "lost") {
      renderMessage("lost");
      
    }
  };

  const handleNewGame = async () => {
    try {
      await HangmanAPI.handleNewGame();
      await fetchGameState();
    } catch (error) {
      console.error("Error starting new game:", error);
    }
  };

  const handleContinueGame = async () => {
    try {
      await HangmanAPI.handleContinueGame()
      await fetchGameState();
    } catch (error) {
      console.error("Error continuing game:", error);
    }
  };

  

  const renderPlayAgain = () => {
    let buttons = [];
    if (gameState && gameState.gameStatus === "won") {
      buttons.push(
        <button className="btn btn-outline-primary"  key="newGameButton" onClick={handleNewGame}>
          Start New Game
        </button>,
        <button className="btn btn-outline-primary"  key="continueGameButton" onClick={handleContinueGame}>
          Continue Game
        </button>
      );
      
    } else if (gameState && gameState.gameStatus === "lost") {
      buttons.push(
        <button className="btn btn-outline-primary"  key="newGameButton" onClick={handleNewGame}>
          Start New Game
        </button>
      );
      
    }
    return buttons;
  };

  const renderGallow = () => {
    let chances;
    if (gameState.guesses < guessesLeft) {
      chances = gameState.guesses;
    } else {
      chances = guessesLeft;
    }
    return <Gallow guessesRemaining={chances} />;
  };

  const renderMessage = (status) => {
    if (status === "won") {
      return <Message message="You Win!" />;
    } else if (status === "lost") {
      return <Message message="Game Over! The secret word was:" />;
    }
  };

  const saveScore = async () => {
    if (!gameState || !currentUser) {
      console.error("Game state or user not defined, cannot save score.");
      return;
    }
    if(antiSpam){
      return;
    }
    const scoreEntry = {
      gameName: "hangman",
      userId: currentUser.userId,
      score: gameState.totalScore,
      leaderboard: "Score",
    };
    try {
      const savedScore = await submitScore(scoreEntry);
      setAntiSpam(true)
      console.log("Score saved successfully:", savedScore);
    } catch (error) {
      console.error("Failed to save score:", error);
    }
  };

  return (
    <div>
      
      {gameState ? (
        <>
        <h2 className="display-4 mb-4">9 Lives</h2>
          <Score score={gameState.totalScore} />
          {renderGallow()}
          {renderMessage(gameState.gameStatus)}
          <Word displayedWord={gameState.displayedWord} />
          {gameState.gameStatus === 'in progress' && <Alphabet
            onLetterSelect={handleLetterSelect}
            disabledLetters={disabledLetters}
          />}
          <button className='btn btn-outline-primary' onClick={saveScore} >Save your Score</button>
          {renderPlayAgain()}

        </>
      ) : (
        
        <button className="btn btn-outline-primary" onClick={handleNewGame}>Start New Game</button>
      )}
    </div>
  );
};
export default Hangman;
