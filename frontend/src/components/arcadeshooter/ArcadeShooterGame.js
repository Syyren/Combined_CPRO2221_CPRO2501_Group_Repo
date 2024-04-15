import React, { useRef, useEffect } from "react";
import Ship from "./models/Ship";
import Enemy from "./models/Enemy";

const ArcadeShooterGame = ({
  isPaused,
  setScore,
  setLives,
  level,
  setLevel,
}) => {
  const canvasRef = useRef(null);
  const enemiesRef = useRef([]);
  const playerShipRef = useRef(new Ship(390, 560));
  const keys = { right: false, left: false, space: false };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;

    let animationFrameId;

    const spawnEnemies = () => {
      const numberOfEnemies = 3 + level;
      enemiesRef.current = [];
      for (let i = 0; i < numberOfEnemies; i++) {
        const x = Math.random() * (canvas.width - 50);
        enemiesRef.current.push(new Enemy(x, 10));
      }
    };

    const keyDownHandler = (e) => {
      e.preventDefault();
      if (e.key === "ArrowRight") keys.right = true;
      else if (e.key === "ArrowLeft") keys.left = true;
      else if (e.key === " " && !keys.space) {
        keys.space = true;
        playerShipRef.current.shoot();
      }
    };

    const keyUpHandler = (e) => {
      e.preventDefault();
      if (e.key === "ArrowRight") keys.right = false;
      else if (e.key === "ArrowLeft") keys.left = false;
      else if (e.key === " ") keys.space = false;
    };

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    const checkCollisions = () => {
      playerShipRef.current.bullets.forEach((bullet, bulletIndex) => {
        enemiesRef.current.forEach((enemy, enemyIndex) => {
          if (
            bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y
          ) {
            enemy.hit();
            if (!enemy.isAlive()) {
              enemiesRef.current.splice(enemyIndex, 1);
              setScore((prevScore) => prevScore + 10); // Increment score for killing an enemy
            }
            playerShipRef.current.bullets.splice(bulletIndex, 1);
          }
        });
      });
    };

    const updateGame = () => {
      if (isPaused) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#000022"; // Dark blue, like a night sky
      context.fillRect(0, 0, canvas.width, canvas.height);
      playerShipRef.current.draw(context);
      playerShipRef.current.drawBullets(context);

      enemiesRef.current.forEach((enemy) => {
        enemy.update(canvas.width, canvas.height);
        if (enemy.y >= canvas.height - (enemy.height + 10)) {
          // Enemy reaches the bottom
          setLives((prevLives) => prevLives - 1);
          enemiesRef.current.splice(enemiesRef.current.indexOf(enemy), 1); // Remove enemy
        }
        enemy.draw(context);
      });

      if (keys.right) playerShipRef.current.moveRight(canvas.width);
      if (keys.left) playerShipRef.current.moveLeft();

      checkCollisions();

      if (enemiesRef.current.length === 0) {
        setLevel((prevLevel) => prevLevel + 1);
        setScore((prevScore) => prevScore + 100);
        spawnEnemies();
      }

      animationFrameId = window.requestAnimationFrame(updateGame);
    };

    spawnEnemies(); // Initial spawn
    updateGame();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, [isPaused, setScore, setLives, level, setLevel]);

  return <canvas ref={canvasRef} className="game-canvas"></canvas>;
};

export default ArcadeShooterGame;