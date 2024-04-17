import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Word from "./Word";
import Score from "./Score";
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

  const fetchGameState = async () => {
    try {
      const response = await HangmanAPI.fetchGameState();
      console.log("Game state:", JSON.stringify(response.data, null, 2));
      setGameState(response.data);
      setDisabledLetters(response.data.lettersGuessed);
      setGuessesLeft(response.data.guessesLeft);
    } catch (error) {
      console.error("Error fetching game state:", error);
    }
  };

  const handleLetterSelect = async (letter) => {
    try {
      const response = await HangmanAPI.handleLetterSelect(letter);
      setGameState(response.data);
      checkGameResult(response.data);
      updateDisabledLetters(letter);
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
      saveScore();
    } else if (gameState.gameStatus === "lost") {
      renderMessage("lost");
      saveScore();
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
    console.log("Rendering play again buttons...");
    let buttons = [];
    if (gameState && gameState.gameStatus === "won") {
      buttons.push(
        <button key="newGameButton" onClick={handleNewGame}>
          Start New Game
        </button>,
        <button key="continueGameButton" onClick={handleContinueGame}>
          Continue Game
        </button>
      );
    } else if (gameState && gameState.gameStatus === "lost") {
      buttons.push(
        <button key="newGameButton" onClick={handleNewGame}>
          Start New Game
        </button>
      );
    }
    return buttons;
  };

  const renderGallow = () => {
    let chances;
    console.log(
      "guessesLeft: " +
        guessesLeft +
        "\ngameState.guesses: " +
        gameState.guesses
    );
    if (gameState.guesses < guessesLeft) {
      chances = gameState.guesses;
    } else {
      chances = guessesLeft;
    }
    return <Gallow guessesRemaining={chances} />;
  };

  const renderMessage = (status) => {
    console.log("status: " + status);
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

    const scoreEntry = {
      gameName: "Hangman",
      userId: currentUser.userId,
      score: gameState.totalScore,
      leaderboard: "Score",
    };

    try {
      const savedScore = await submitScore(scoreEntry);
      console.log("Score saved successfully:", savedScore);
    } catch (error) {
      console.error("Failed to save score:", error);
    }
  };

  return (
    <div>
      {gameState ? (
        <>
          <Score score={gameState.totalScore} />
          {renderGallow()}
          {renderMessage(gameState.gameStatus)}
          <Word displayedWord={gameState.displayedWord} />
          <Alphabet
            onLetterSelect={handleLetterSelect}
            disabledLetters={disabledLetters}
          />
          {renderPlayAgain()}
        </>
      ) : (
        <button onClick={handleNewGame}>Start New Game</button>
      )}
    </div>
  );
};
export default Hangman;
