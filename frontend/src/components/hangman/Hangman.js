import React, { useState } from 'react';
import axios from 'axios';
import Word from './Word';
import Score from './Score';
import Gallow from './Gallow';
import Alphabet from './Alphabet';
import Message from './Message';


const Hangman = () => {
    const [gameState, setGameState] = useState(null);
    const fetchGameState = async () => {
        try {
            const response = await axios.get('http://localhost:8090/api/hangman/gamestate');
            setGameState(response.data);
        } catch (error) {
            console.error('Error fetching game state:', error);
        }
    };
    const handleLetterSelect = async (letter) => {
        try {
            const response = await axios.post('http://localhost:8090/api/hangman/guess', null, {
                params: { letterGuessed: letter }
            });
            setGameState(response.data);
            checkGameResult(response.data);
        } catch (error) {
            console.error('Error selecting letter:', error);
        }
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
            //resets gamestate
            await axios.get('http://localhost:8090/api/hangman/new-game');
            //get new gamestate
            await fetchGameState();
        } catch (error) {
            console.error('Error starting new game:', error);
        }
    };

    const handleContinueGame = async () => {
        try {
            //resets gamestate score persists
            await axios.get('http://localhost:8090/api/hangman/continue-game');
            //get updated gamestate
            await fetchGameState();
        } catch (error) {
            console.error('Error starting new game:', error);
        }
    };

    const renderAlphabet = () => {
        if (gameState.gameStatus !== 'won' && gameState.gameStatus !== 'lost') {
            return <Alphabet onLetterSelect={handleLetterSelect} />;
        }
    };

    const renderPlayAgain = () => {
        let buttons = [];
        if (gameState.gameStatus === 'won') {
            buttons.push(
                <button key="newGameButton" onClick={handleNewGame}>Start New Game</button>,
                <button key="continueGameButton" onClick={handleContinueGame}>Continue Game</button>
            );
        } else if (gameState.gameStatus === 'lost') {
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
    
    
    const win = () => {

    }

    const lose = () => {
        
    }


    return (
        <div>
            {gameState ? (
                <>
                    <Score score={gameState.totalScore} />
                    <Gallow guesses={gameState.guesses} />
                    {renderMessage(gameState.gameStatus)}
                    <Word displayedWord={gameState.displayedWord} />
                    {renderAlphabet()}
                    {renderPlayAgain()}
                </>
            ) : (
                <button onClick={handleNewGame}>Start New Game</button>
            )}
        </div>
    );

};

export default Hangman;
