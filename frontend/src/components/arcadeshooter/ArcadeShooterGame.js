import React, { useRef, useEffect, useState } from "react";
import Ship from "./models/Ship";
import Enemy from "./models/Enemy";
import AchievementNotification from "../../components/achievements/AchievementNotification";
import {
  getUserAchievements,
  giveAchievement,
} from "../../controllers/AchievementController";

/**
 * Component for the main game screen of the Arcade Shooter game.
 *
 * @param {boolean} isPaused - Flag indicating whether the game is paused.
 * @param {Function} setScore - Function to set the player's score.
 * @param {Function} setLives - Function to set the player's remaining lives.
 * @param {number} level - Current level of the game.
 * @param {number} lives - Remaining lives of the player.
 * @param {number} score - Current score of the player.
 * @param {Function} setLevel - Function to set the current level.
 * @param {object} currentUser - Current user object.
 */
const ArcadeShooterGame = ({
  isPaused,
  setScore,
  setLives,
  level,
  lives,
  score,
  setLevel,
  currentUser,
}) => {
  const canvasRef = useRef(null);
  const enemiesRef = useRef([]);
  const playerShipRef = useRef(new Ship(390, 560));
  const keys = { right: false, left: false, space: false };
  const [userAchievements, setUserAchievements] = useState([]);
  const [achievement1Flag, setAchievement1Flag] = useState(false);
  const [achievement2Flag, setAchievement2Flag] = useState(false);
  const [achievementTitle, setAchievementTitle] = useState("");
  const [canvasWidth, setCanvasWidth] = useState(
    window.innerWidth > 1000 ? 775 : window.innerWidth > 770 ? 700 : 0
  );

  const achievement1Id = 7;
  const achievement2Id = 8;

  /**
   * Fetches user achievements from the server.
   */
  const fetchAchievements = async () => {
    if (currentUser) {
      const achievements = await getUserAchievements(currentUser.userId);
      setUserAchievements(achievements);
      achievements.forEach((achievement) => {
        if (achievement.id === achievement1Id) {
          setAchievement1Flag(true);
        } else if (achievement.id === achievement2Id) {
          setAchievement2Flag(true);
        }
      });
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, [currentUser]);

  useEffect(() => {
    // Check for Achievement 1
    if (score >= 1000 && lives === 3 && !achievement1Flag) {
      setAchievementTitle("Never tell me the odds!");
      if (currentUser) {
        giveAchievement(currentUser.userId, achievement1Id);
        setAchievement1Flag(true);
      }
    }

    // Check for Achievement 2
    if (level === 12 && !achievement2Flag) {
      setAchievementTitle("Kessel Run in less than 12 Paw-secs");
      if (currentUser) {
        giveAchievement(currentUser.userId, achievement2Id);
        setAchievement2Flag(true);
      }
    }
  }, [score, level, currentUser, achievement1Flag, achievement2Flag, lives]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1000) {
        setCanvasWidth(775);
      } else if (width > 770 && width <= 1000) {
        setCanvasWidth(700);
      } else {
        setCanvasWidth(0);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fetchAchievements();
  }, [currentUser]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvasWidth) {
      return;
    }

    canvas.width = canvasWidth;
    canvas.height = 600;

    const context = canvas.getContext("2d");
    let animationFrameId;

    /**
     * Spawns enemies based on the current level.
     */
    const spawnEnemies = () => {
      const numberOfEnemies = 3 + level;
      enemiesRef.current = [];
      for (let i = 0; i < numberOfEnemies; i++) {
        const x = Math.random() * (canvas.width - 50);
        enemiesRef.current.push(new Enemy(x, 10));
      }
    };

    /**
     * Handles key down events for player controls.
     *
     * @param {Event} e - The keydown event object.
     */
    const keyDownHandler = (e) => {
      e.preventDefault();
      if (e.key === "ArrowRight") keys.right = true;
      else if (e.key === "ArrowLeft") keys.left = true;
      else if (e.key === " " && !keys.space) {
        keys.space = true;
        playerShipRef.current.shoot();
      }
    };

    /**
     * Handles key up events for player controls.
     *
     * @param {Event} e - The keyup event object.
     */
    const keyUpHandler = (e) => {
      e.preventDefault();
      if (e.key === "ArrowRight") keys.right = false;
      else if (e.key === "ArrowLeft") keys.left = false;
      else if (e.key === " ") keys.space = false;
    };

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    /**
     * Checks for collisions between bullets and enemies.
     */
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
              setScore((prevScore) => prevScore + 10);
            }
            playerShipRef.current.bullets.splice(bulletIndex, 1);
          }
        });
      });
    };

    /**
     * Updates the game state and draws on the canvas.
     */
    const updateGame = () => {
      if (isPaused) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#000022";
      context.fillRect(0, 0, canvas.width, canvas.height);
      playerShipRef.current.draw(context);
      playerShipRef.current.drawBullets(context);

      enemiesRef.current.forEach((enemy) => {
        enemy.update(canvas.width, canvas.height);
        if (enemy.y >= canvas.height - (enemy.height + 10)) {
          setLives((prevLives) => prevLives - 1);
          enemiesRef.current.splice(enemiesRef.current.indexOf(enemy), 1);
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

    spawnEnemies();
    updateGame();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, [canvasWidth, isPaused, setScore, setLives, level, setLevel]);

  if (!canvasWidth) {
    return <div>Cannot play Canine Invaders on this small of a screen!</div>;
  }

  return (
    <div className="game-canvas-container">
      <canvas ref={canvasRef} className="game-canvas"></canvas>
      {achievementTitle && (
        <AchievementNotification achievementTitle={achievementTitle} />
      )}
    </div>
  );
};

export default ArcadeShooterGame;
