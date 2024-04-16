import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Word from './Word';
import Score from './Score';
import Gallow from './Gallow';
import Alphabet from './Alphabet';
import Message from './Message';

const HangmanMultiplayer = () => {
  const { roomId } = useParams();
  const [gameState, setGameState] = useState(null);
  const [disabledLetters, setDisabledLetters] = useState([]);

  useEffect(() => {
    // Fetch initial game state when component mounts
    fetchGameState();
  }, []);

  const fetchGameState = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/api/hangman/${roomId}/gamestate`);
      setGameState(response.data);
      setDisabledLetters(response.data.lettersGuessed);
    } catch (error) {
      console.error('Error fetching game state:', error);
    }
  };

  const handleLetterSelect = async (letter) => {
    try {
      const response = await axios.post(`http://localhost:8090/api/hangman/${roomId}/guess`, null, {
        params: { letterGuessed: letter }
      });
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
      await axios.get(`http://localhost:8090/api/hangman/${roomId}/new-game`);
      await fetchGameState();
      } catch (error) {
        console.error('Error starting new game:', error);
      }
  };

  const handleContinueGame = async () => {
    try {
      await axios.get(`http://localhost:8090/api/hangman/${roomId}/continue-game`);
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
          <Gallow guesses={gameState.guesses} />
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
