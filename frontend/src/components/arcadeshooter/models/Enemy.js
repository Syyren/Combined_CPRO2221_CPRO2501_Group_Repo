import React from "react";
import dogShipImage from "../../../images/arcadeshooter/dogship.png";

/**
 * Represents an enemy ship in the game.
 */
export default class Enemy {
  /**
   * Creates a new instance of Enemy.
   * @param {number} x - The initial x-coordinate of the enemy.
   * @param {number} y - The initial y-coordinate of the enemy.
   * @param {number} speed - The speed of the enemy (default is 0.06).
   * @param {number} health - The health of the enemy (default is 1).
   * @param {number} patternType - The pattern type of the enemy's movement (default is random).
   */
  constructor(
    x,
    y,
    speed = 0.057,
    health = 1,
    patternType = Math.floor(Math.random() * 4)
  ) {
    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.health = health;
    this.width = 30;
    this.height = 30;
    this.t = 0;
    this.patternType = patternType;
    this.image = new Image();
    this.image.src = dogShipImage;
  }

  /**
   * Updates the position and state of the enemy.
   * @param {number} canvasWidth - The width of the canvas.
   * @param {number} canvasHeight - The height of the canvas.
   */
  update(canvasWidth, canvasHeight) {
    this.t += this.speed;

    // Updates positions based on the pattern type
    switch (this.patternType) {
      case 0:
        this.x = this.initialX + 100 * Math.sin(this.t + 40);
        this.y += this.speed * 20;
        break;
      case 1:
        this.x = this.initialX + 100 * Math.sin(this.t);
        this.y = this.initialY + this.t * 10;
        break;
      case 2:
        this.x = this.initialX + this.t * 20;
        this.y = this.initialY + this.t * 20;
        break;
      case 3:
        this.x = this.initialX + 100 * Math.cos(this.t);
        this.y = this.initialY + this.t * 10;
        break;
      case 4:
        this.x = this.initialX - this.t * 20;
        this.y = this.initialY - this.t * 20;
        break;
      default:
        this.y += this.speed * 10;
    }

    // Boundary checks to ensure enemies don't move out of the visible area
    this.x = Math.max(0, Math.min(this.x, canvasWidth - this.width));
    this.y = Math.max(0, Math.min(this.y, canvasHeight - this.height));

    // Resets if reaches the bottom
    if (this.y >= canvasHeight - this.height) {
      this.y = this.initialY;
      this.x = this.initialX;
      this.t = 0;
    }
  }

  /**
   * Draws the enemy ship on the canvas context.
   * @param {CanvasRenderingContext2D} context - The canvas rendering context.
   */
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  /**
   * Handles a hit on the enemy ship.
   */
  hit() {
    this.health -= 1;
  }

  /**
   * Checks if the enemy ship is alive.
   * @returns {boolean} - True if the enemy ship is alive, otherwise false.
   */
  isAlive() {
    return this.health > 0;
  }
}
