import React, { useState } from "react";
import ArcadeShooterHeader from "./ArcadeShooterHeader";
import ArcadeShooterFooter from "./ArcadeShooterFooter";
import ArcadeShooterGame from "./ArcadeShooterGame";

const ArcadeShooter = () => {
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleQuit = () => {
    setLives(3);
    setLevel(1);
    setScore(0);
  };

  return (
    <div className="container mt-3">
      <ArcadeShooterHeader lives={lives} level={level} score={score} />
      <main className="my-3">
        <ArcadeShooterGame
          isPaused={isPaused}
          setScore={setScore}
          setLives={setLives}
        />
      </main>
      <ArcadeShooterFooter onQuit={handleQuit} onPause={handlePause} />
    </div>
  );
};

export default ArcadeShooter;
