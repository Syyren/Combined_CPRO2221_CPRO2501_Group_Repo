import React, { useRef, useEffect, useState } from "react";
import Ship from "./models/Ship";
import Enemy from "./models/Enemy";

const ArcadeShooterGame = ({ isPaused }) => {
  const canvasRef = useRef(null);
  const [playerShip, setPlayerShip] = useState(new Ship(390, 580));
  const [enemies, setEnemies] = useState([]);
  const keys = { right: false, left: false, space: false };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;

    let enemySpawnCounter = 0;
    let animationFrameId;

    const spawnEnemy = () => {
      console.log("Enemy Spawned!");
      if (enemies.length < 5) {
        const x = Math.random() * (canvas.width - 50);
        setEnemies((prevEnemies) => [...prevEnemies, new Enemy(x, 10)]);
      }
    };

    const keyDownHandler = (e) => {
      if (e.key === "ArrowRight") {
        keys.right = true;
      } else if (e.key === "ArrowLeft") {
        keys.left = true;
      } else if (e.key === " " && !keys.space) {
        keys.space = true;
        playerShip.shoot();
      }
    };

    const keyUpHandler = (e) => {
      if (e.key === "ArrowRight") {
        keys.right = false;
      } else if (e.key === "ArrowLeft") {
        keys.left = false;
      } else if (e.key === " ") {
        keys.space = false;
      }
    };

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    const checkCollisions = () => {
      playerShip.bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
          if (
            bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y
          ) {
            enemy.hit();
            if (!enemy.isAlive()) {
              setEnemies((prev) => prev.filter((_, idx) => idx !== enemyIndex));
            }
            playerShip.bullets.splice(bulletIndex, 1);
          }
        });
      });
    };

    const updateGame = () => {
      if (isPaused) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      playerShip.draw(context);
      playerShip.drawBullets(context);

      if (enemySpawnCounter++ % 100 === 0) {
        spawnEnemy();
      }

      enemies.forEach((enemy) => {
        enemy.update(canvas.width, canvas.height);
        enemy.draw(context);
      });

      if (keys.right) playerShip.moveRight(canvas.width);
      if (keys.left) playerShip.moveLeft();

      checkCollisions();

      animationFrameId = window.requestAnimationFrame(updateGame);
    };
    updateGame();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, [isPaused, enemies, playerShip]);

  return <canvas ref={canvasRef} className="game-canvas"></canvas>;
};

export default ArcadeShooterGame;
