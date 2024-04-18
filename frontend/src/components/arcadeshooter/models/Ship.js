import Bullet from "./Bullet";
import catShipImage from "../../../images/arcadeshooter/catship.png";

/**
 * Represents the player's ship in the game.
 */
export default class Ship {
  /**
   * Creates a new instance of Ship.
   * @param {number} x - The initial x-coordinate of the ship.
   * @param {number} y - The initial y-coordinate of the ship.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 7;
    this.width = 32;
    this.height = 32;
    this.bullets = [];
    this.image = new Image();
    this.image.src = catShipImage;
  }

  /**
   * Moves the ship to the right within the specified boundary.
   * @param {number} boundary - The right boundary for the ship's movement.
   */
  moveRight(boundary) {
    if (this.x + this.width < boundary) {
      this.x += this.speed;
    }
  }

  /**
   * Moves the ship to the left.
   */
  moveLeft() {
    if (this.x > 0) {
      this.x -= this.speed;
    }
  }

  /**
   * Fires a bullet from the ship's current position.
   */
  shoot() {
    const bulletX = this.x + this.width / 2 - 1.5;
    const bulletY = this.y - 10;
    this.bullets.push(new Bullet(bulletX, bulletY));
  }

  /**
   * Draws the ship on the canvas context.
   * @param {CanvasRenderingContext2D} context - The canvas rendering context.
   */
  draw(context) {
    if (this.image.complete) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      this.image.onload = () => {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
      };
    }
  }

  /**
   * Draws the bullets fired by the ship on the canvas context.
   * @param {CanvasRenderingContext2D} context - The canvas rendering context.
   */
  drawBullets(context) {
    this.bullets = this.bullets.filter((bullet) => bullet.y > 0);
    this.bullets.forEach((bullet) => {
      bullet.update();
      bullet.draw(context);
    });
  }
}
