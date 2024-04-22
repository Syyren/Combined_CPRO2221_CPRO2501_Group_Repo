import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Word from './Word';
import Score from './Score';
import Gallow from './Gallow/Gallow';
import Alphabet from './Alphabet';
import Message from './Message';
import { HangmanMultiplayerAPI } from '../../controllers/HangmanMultiplayerController';
import { useAuth } from '../../context/AuthContext';
import { submitScore } from '../../controllers/LeaderboardController';


const HangmanMultiplayer = () => {
  const { roomId } = useParams();
  const { currentUser } = useAuth();
  const [gameState, setGameState] = useState(null);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(null);
  const [isCurrentUserTurn, setIsCurrentUserTurn] = useState(false);
  const [antiSpam, setAntiSpam] = useState(false)

  useEffect(() => {
    fetchGameState();
      const intervalId = setInterval(() => {
      fetchGameState();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchGameState = async () => {
    try {
      const response = await HangmanMultiplayerAPI.fetchGameState(roomId);
      setGameState(response.data);
      setDisabledLetters(response.data.lettersGuessed);
      setGuessesLeft(response.data.guessesLeft);
      setIsCurrentUserTurn(response.data.turnTaken !== currentUser.userId);
    } catch (error) {
      console.error('Error fetching game state:', error);
    }
  };

  const handleLetterSelect = async (letter) => {
    try {
      setAntiSpam(false);
      const response = await HangmanMultiplayerAPI.handleLetterSelect(letter, roomId, currentUser.userId)
      setGameState(response.data);
      checkGameResult(response.data);
      updateDisabledLetters(letter);
      setIsCurrentUserTurn(response.data.turnTaken !== currentUser.userId);
      await HangmanMultiplayerAPI.addUserToRoom(roomId, currentUser.userId);
    } catch (error) {
      console.error('Error selecting letter:', error);
    }
  };

  const updateDisabledLetters = (letter) => {
    setDisabledLetters([...disabledLetters, letter]);
  };

  const checkGameResult = (gameState) => {
    if (gameState.gameStatus === 'won') {
      console.log("Game won!");
      renderMessage('won')
      saveScore();
    } else if (gameState.gameStatus === 'lost') {
      console.log("Game lost!");
      renderMessage('lost')
      saveScore();
    }
  };

  const handleNewGame = async () => {
    try {
      await HangmanMultiplayerAPI.handleNewGame(roomId);
      await fetchGameState();
    } catch (error) {
      console.error('Error starting new game:', error);
    }
  };

  const handleContinueGame = async () => {
    try {
      await HangmanMultiplayerAPI.handleContinueGame(roomId)
      await fetchGameState();
    } catch (error) {
      console.error('Error continuing game:', error);
    }
  };

  const saveScore = async () => {
    if (!gameState || !currentUser) {
      console.error("Game state or user not defined, cannot save score.");
      return;
    }
    if(antiSpam){//failsafe to prevent multiple score entries - disabled on letter guess
      return;
    }
    const userArray = await HangmanMultiplayerAPI.getUsersInRoom(roomId);
    console.log("userArray: ", userArray)
    try {
      for (let user of userArray){
        let scoreEntry = {
          gameName: "hangman",
          userId: user,
          score: gameState.totalScore,
          leaderboard: "Score"
        }
        let savedScore = await submitScore(scoreEntry);
        console.log("Score saved successfully:", savedScore);
      };
      setAntiSpam(true) 
    } catch (error) {
      console.error("Failed to save score:", error);
    }
  };

  const renderPlayAgain = () => {
    let buttons = [];
    if (gameState && gameState.gameStatus === 'won') {
      buttons.push(
        <button key="newGameButton" onClick={handleNewGame}>Start New Game</button>,
        <button key="continueGameButton" onClick={handleContinueGame}>Continue Game</button>
      );
    } else if (gameState && gameState.gameStatus === 'lost') {
      buttons.push(
        <button key="newGameButton" onClick={handleNewGame}>Start New Game</button>
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
    if (status === 'won') {
      return <Message message='You Win!' />;
    } else if (status === 'lost') {
      return <Message message='Game Over! The secret word was:' />;
    } else if (isCurrentUserTurn === false){
      return <Message message='Waiting for other player...' />;
    }
  };

  return (
    <div>
      <h4 style={{ textAlign: 'left' }}>Your Room ID: {roomId}</h4>
      {gameState ? (
        <>
        <h2 className="display-4 mb-4">9 Lives</h2>
          <Score score={gameState.totalScore} />
          {renderGallow()}
          {renderMessage(gameState.gameStatus)}
          <Word displayedWord={gameState.displayedWord} />
          {console.log('isCurrentUserTurn:', isCurrentUserTurn, 'gameStatus:', gameState.gameStatus)}
          {isCurrentUserTurn && gameState.gameStatus==='in progress' && (
            <Alphabet onLetterSelect={handleLetterSelect} disabledLetters={disabledLetters} />
          )}
          {!isCurrentUserTurn && renderPlayAgain()}
        </>
      ) : (
        <button onClick={handleNewGame}>Start New Game</button>
      )}
    </div>
  );
};
export default HangmanMultiplayer;