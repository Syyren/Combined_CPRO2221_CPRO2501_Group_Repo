import React, { useState, useEffect, useRef } from 'react';
import catImage from './images/cat.png';
import obstacleImage from './images/obstacle.png';
import './AutoRunner.css';

const AutoRunner = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const catRef = useRef(null);
    const obstacleRef = useRef(null);
    const gameAreaRef = useRef(null);
    let speed = 5;

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Space')
            {
                if (!isPlaying)
                {
                    startGame();
                } 
                else 
                {
                    jump();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying]);

    useEffect(() => {
        let gameTimer;

        if (isPlaying) 
        {
            gameTimer = setInterval(updateGameArea, 20);
        } 
        else 
        {
            clearInterval(gameTimer);
        }

        return () => clearInterval(gameTimer);
    }, [isPlaying]);

    const startGame = () => {
        setIsPlaying(true);
        setScore(0);
        catRef.current.style.bottom = '0px';
        obstacleRef.current.style.left = '100vw';
    };

    const jump = () => {
        if (catRef.current.classList !== 'jump') {
        catRef.current.classList.add('jump');
        setTimeout(() => {
            catRef.current.classList.remove('jump');
        }, 1000);
        }
    };

    const updateGameArea = () => {
        const catBottom = parseInt(window.getComputedStyle(catRef.current).getPropertyValue('bottom'));
        const obstacleLeft = parseInt(window.getComputedStyle(obstacleRef.current).getPropertyValue('left'));

        //checks for collision
        if (obstacleLeft < 50 && obstacleLeft > 0 && catBottom < 50) 
        {
            setIsPlaying(false);
            alert('Game Over!\nScore: ' + score);
        }

        //moves the obstacle
        obstacleRef.current.style.left = `${obstacleLeft - speed}px`;

        //increments the score
        if (obstacleLeft < -10) 
        {
            setScore(score + 1);
            obstacleRef.current.style.left = '100vw';
        }
    };

  return (
    <div class="gameBody">
      <h1>Run Cat!</h1>
      <p>Score: {score}</p>
      <div className="d-flex align-items-center justify-content-center">
        <div className="game-area" ref={ gameAreaRef }>
            <img
                className={ `cat ${isPlaying ? 'running' : ''}` }
                ref={ catRef }
                src={ catImage }
                onClick={ jump }
                alt="Cat"
            />
            <img
                className="obstacle"
                ref={ obstacleRef }
                src={ obstacleImage }
                alt="Obstacle"
            />
        </div>
      </div>
    </div>
  );
};

export default AutoRunner;