import React, { useState, useEffect, useRef } from 'react';
import catImage from './images/cat.png';
import obstacleImage from './images/obstacle.png';
import './AutoRunner.css';

const AutoRunner = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [benchmark, setBenchmark] = useState(0);
    const [gameText, setGameText] = useState("Press Space to Start!");
    const catRef = useRef(null);
    const obstacleRef = useRef(null);
    const gameAreaRef = useRef(null);
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Space')
            {
                if (!isPlaying)
                {
                    setGameText("");
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
            gameTimer = setInterval(() => {
                setScore((prevScore) => prevScore + 1);
                updateGameArea();
            }, 20);
        } 
        else 
        {
            clearInterval(gameTimer);
        }

        return () => clearInterval(gameTimer);
    }, [isPlaying, speed]);

    useEffect(() => {
        if (score > highScore) 
        {
            setHighScore(score);
        }
    }, [score, highScore]);

    useEffect(() => {
        console.log("score:", score);
        console.log("benchmark:", benchmark);
        console.log("speed:", speed);
        if (score >= benchmark)
        {
            setBenchmark((prevBenchmark) => prevBenchmark + 500);
            setSpeed((prevSpeed) => prevSpeed + 1);
        }
    }, [score, speed, benchmark]);

    const startGame = () => {
        setSpeed(7);
        setBenchmark(500);
        setIsPlaying(true);
        setScore(0);
        catRef.current.style.bottom = '0px';
        obstacleRef.current.style.left = '61vw';
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
            setGameText("Game Over!\nPress Space to try again.")
        }

        console.log("update speed:", speed);
        //moves the obstacle
        obstacleRef.current.style.left = `${obstacleLeft - speed}px`;

        //increments the score
        if (obstacleLeft < -10) 
        {
            obstacleRef.current.style.left = '61vw';
        }
    };

  return (
    <div className="gameBody">
      <h1>Run Cat!</h1>
      <div className="d-flex align-items-center justify-content-center">
        <div className="game-area" ref={ gameAreaRef }>
            <div className="scores">
                <p className="mt-2">High Score: { highScore } </p>
                <p>Score: { score }</p>
            </div>
            <p>{ gameText }</p>
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