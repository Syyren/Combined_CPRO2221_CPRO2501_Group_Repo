import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Word from './Word';
import Score from './Score';
import Gallow from './Gallow/Gallow';
import Alphabet from './Alphabet';
import Message from './Message';
import { HangmanMultiplayerAPI } from '../../controllers/HangmanMultiplayerController';
import { useAuth } from '../../context/AuthContext';

const HangmanMultiplayer = () => {
  const { roomId } = useParams();
  const { currentUser } = useAuth();
  const [gameState, setGameState] = useState(null);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(null);
  const [isCurrentUserTurn, setIsCurrentUserTurn] = useState(false);

  useEffect(() => {
    fetchGameState();
  }, []);

  const fetchGameState = async () => {
    try {
      const response = await HangmanMultiplayerAPI.fetchGameState(roomId);
      console.log("Fetched game state:", response.data);
      setGameState(response.data);
      setDisabledLetters(response.data.lettersGuessed);
      setGuessesLeft(response.data.guessesLeft);
      setIsCurrentUserTurn(response.data.turnTaken !== currentUser.userId);
      console.log("isCurrentUserTurn:", isCurrentUserTurn);
      console.log('currentUserId: '+currentUser.userId)
    } catch (error) {
      console.error('Error fetching game state:', error);
    }
  };

  const handleLetterSelect = async (letter) => {
    try {
      console.log("Handling letter select:", letter);
      const response = await HangmanMultiplayerAPI.handleLetterSelect(letter, roomId, currentUser.userId)
      console.log("Letter select response:", response.data);
      setGameState(response.data);
      checkGameResult(response.data);
      updateDisabledLetters(letter);
      setIsCurrentUserTurn(response.data.turnTaken !== currentUser.userId);
      console.log("L isCurrentUserTurn:", isCurrentUserTurn);
      console.log('L currentUserId: '+currentUser.userId)
    } catch (error) {
      console.error('Error selecting letter:', error);
    }
  };

  const updateDisabledLetters = (letter) => {
    console.log("Updating disabled letters:", letter);
    setDisabledLetters([...disabledLetters, letter]);
  };

  const checkGameResult = (gameState) => {
    if (gameState.gameStatus === 'won') {
      console.log("Game won!");
      renderMessage('won')
      win();
    } else if (gameState.gameStatus === 'lost') {
      console.log("Game lost!");
      renderMessage('lost')
      lose();
    }
  };

  const handleNewGame = async () => {
    try {
      console.log("Starting new game...");
      await HangmanMultiplayerAPI.handleNewGame(roomId);
      console.log("New game started.");
      await fetchGameState();
    } catch (error) {
      console.error('Error starting new game:', error);
    }
  };

  const handleContinueGame = async () => {
    try {
      console.log("Continuing game...");
      await HangmanMultiplayerAPI.handleContinueGame(roomId)
      console.log("Game continued.");
      await fetchGameState();
    } catch (error) {
      console.error('Error continuing game:', error);
    }
  };

  const renderPlayAgain = () => {
    console.log('Rendering play again buttons...');
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
    console.log('Rendering gallow...');
    let chances;
    if (gameState.guesses < guessesLeft) {
      chances = gameState.guesses;
    } else {
      chances = guessesLeft;
    }
    return <Gallow guessesRemaining={chances} />;
  };

  const renderMessage = (status) => {
    console.log("Rendering message:", status);
    if (status === 'won') {
      return <Message message='You Win!' />;
    } else if (status === 'lost') {
      return <Message message='Game Over! The secret word was:' />;
    } else if (isCurrentUserTurn === false){
      return <Message message='Waiting for other player...' />;
    }
  };

  const win = () => {
    console.log("Game won logic executed.");
  }

  const lose = () => {
    console.log("Game lost logic executed.");
  }

  return (
    <div>
      {gameState ? (
        <>
          <Score score={gameState.totalScore} />
          {renderGallow()}
          {renderMessage(gameState.gameStatus)}
          <Word displayedWord={gameState.displayedWord} />
          {console.log('isCurrentUserTurn:', isCurrentUserTurn, 'gameStatus:', gameState.gameStatus)}
          {isCurrentUserTurn && gameState.gameStatus==='in progress' && (
            <Alphabet onLetterSelect={handleLetterSelect} disabledLetters={disabledLetters} />
          )}
          {renderPlayAgain()}
        </>
      ) : (
        <button onClick={handleNewGame}>Start New Game</button>
      )}
    </div>
  );
};

export default HangmanMultiplayer;
