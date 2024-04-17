/**
 * Represents a bullet fired by the player.
 */
export default class Bullet {
  /**
   * Creates a new instance of Bullet.
   * @param {number} x - The x-coordinate of the bullet.
   * @param {number} y - The y-coordinate of the bullet.
   * @param {number} velocity - The velocity of the bullet (default is 7).
   */
  constructor(x, y, velocity = 7) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.width = 3;
    this.height = 10;
  }

  /**
   * Updates the position of the bullet based on its velocity.
   */
  update() {
    this.y -= this.velocity;
  }

  /**
   * Draws the bullet on the canvas context.
   * @param {CanvasRenderingContext2D} context - The canvas rendering context.
   */
  draw(context) {
    context.fillStyle = "#f00"; // Set fill style to red
    context.fillRect(this.x, this.y, this.width, this.height); // Draw a filled rectangle representing the bullet
  }
}
