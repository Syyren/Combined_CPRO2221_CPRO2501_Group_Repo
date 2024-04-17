import React, { useState, useEffect } from "react";
import ArcadeShooterHeader from "./ArcadeShooterHeader";
import ArcadeShooterFooter from "./ArcadeShooterFooter";
import ArcadeShooterGame from "./ArcadeShooterGame";
import StartGameScreen from "./StartGameScreen";
import GameOverScreen from "./GameOverScreen";
import { ArcadeShooterApi } from "../../controllers/ArcadeShooterController";
import { useAuth } from "../../context/AuthContext";

/**
 * Component representing the main game interface for the arcade shooter game.
 */
const ArcadeShooter = () => {
  // State for managing game status, score, levels, and user session.
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const { currentUser } = useAuth();
  const [sessionData, setSessionData] = useState(null);

  // Monitors the lives state to trigger game over when lives are depleted.
  useEffect(() => {
    if (lives <= 0 && gameStarted) {
      handleEndGame();
    }
  }, [lives, gameStarted]);

  // Toggles the game pause state.
  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  // Ends the game session and transitions to the game over screen.
  const handleEndGame = async () => {
    if (sessionData && sessionData.id) {
      try {
        await ArcadeShooterApi.endSession(sessionData.id, score, level);
        console.log("Session ended successfully");
      } catch (error) {
        console.error("Failed to end session:", error);
      }
    }
    setIsPaused(true); // Pause the game
    setGameStarted(false); // Mark the game as not started
    setGameOver(true); // Trigger the game over screen
  };

  // Starts a new game session.
  const handleStartGame = async () => {
    if (currentUser) {
      try {
        const response = await ArcadeShooterApi.startSession(
          currentUser.userId
        );
        setSessionData(response);
        setGameStarted(true);
        setGameOver(false); // Ensure the game over screen is not shown
        setIsPaused(false);
      } catch (error) {
        console.error("Failed to start session:", error);
      }
    } else {
      console.error("No user logged in");
    }
  };

  // Restarts the game by resetting states and starting a new game session.
  const handleRestartGame = () => {
    setLives(3);
    setLevel(1);
    setScore(0);
    setGameOver(false);
    handleStartGame(); // Restart the game immediately
  };

  return (
    <div className="container mt-3">
      <ArcadeShooterHeader lives={lives} level={level} score={score} />
      <main className="my-3">
        {!gameStarted && !gameOver && (
          <StartGameScreen onStart={handleStartGame} />
        )}
        {gameStarted && !gameOver && (
          <ArcadeShooterGame
            isPaused={isPaused}
            setScore={setScore}
            setLives={setLives}
            level={level}
            lives={lives}
            score={score}
            setLevel={setLevel}
            currentUser={currentUser}
          />
        )}
        {gameOver && (
          <GameOverScreen
            score={score}
            level={level}
            onRestart={handleRestartGame}
          />
        )}
      </main>
      <ArcadeShooterFooter onQuit={handleEndGame} onPause={handlePause} />
    </div>
  );
};

export default ArcadeShooter;
