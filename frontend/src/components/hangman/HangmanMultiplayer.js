import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import Word from './Word';
import Score from './Score';
import Gallow from './Gallow/Gallow';
import Alphabet from './Alphabet';
import Message from './Message';
import { HangmanMultiplayerAPI } from '../../controllers/HangmanMultiplayerController';

const HangmanMultiplayer = () => {
  const { roomId } = useParams();
  const [gameState, setGameState] = useState(null);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(null)

  useEffect(() => {
    // Fetch initial game state when component mounts
    fetchGameState();
  }, []);

  const fetchGameState = async () => {
    try {
      const response = await HangmanMultiplayerAPI.fetchGameState(roomId);
      console.log("Game state:", JSON.stringify(response.data, null, 2));
      setGameState(response.data);
      setDisabledLetters(response.data.lettersGuessed);
      setGuessesLeft(response.data.guessesLeft)
    } catch (error) {
      console.error('Error fetching game state:', error);
    }
  };

  const handleLetterSelect = async (letter) => {
    try {
      const response = await HangmanMultiplayerAPI.handleLetterSelect(letter,roomId)
      setGameState(response.data);
      checkGameResult(response.data);
      updateDisabledLetters(letter);
    } catch (error) {
      console.error('Error selecting letter:', error);
    }
  };
    
  const updateDisabledLetters = (letter) => {
    setDisabledLetters([...disabledLetters, letter]);
  };

  const checkGameResult = (gameState) => {
    if (gameState.gameStatus === 'won') {
      renderMessage('won')
      win();
    } else if (gameState.gameStatus === 'lost') {
      renderMessage('lost')
      lose();
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
    let chances;
    console.log("guessesLeft: "+guessesLeft+"\ngameState.guesses: "+gameState.guesses)
    if (gameState.guesses < guessesLeft) {
      chances = gameState.guesses;
    } else {
      chances = guessesLeft;
    }
    return <Gallow guessesRemaining={chances} />;
  };

  const renderMessage = (status) => {
    console.log("status: "+status)
    if (status === 'won'){
      return <Message message='You Win!' />;
    } else if (status === 'lost'){
      return <Message message='Game Over! The secret word was:' />;
    }
  };

  const win = () => {}
  const lose = () => {}

  return (
    <div>
      {gameState ? (
        <>
          <Score score={gameState.totalScore} />
          {renderGallow()}
          {renderMessage(gameState.gameStatus)}
          <Word displayedWord={gameState.displayedWord} />
          <Alphabet onLetterSelect={handleLetterSelect} disabledLetters={disabledLetters} />
          {renderPlayAgain()}
        </>
      ) : (
        <button onClick={handleNewGame}>Start New Game</button>
      )}
    </div>
  );
};
export default HangmanMultiplayer;