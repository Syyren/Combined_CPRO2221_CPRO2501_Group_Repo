export default class Enemy {
  constructor(
    x,
    y,
    speed = 0.05,
    health = 1,
    patternType = Math.floor(Math.random() * 5)
  ) {
    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.health = health;
    this.width = 50;
    this.height = 50;
    this.t = 0;
    this.patternType = patternType;
  }

  // Update method to move and update enemy state
  update(canvasWidth, canvasHeight) {
    this.t += this.speed;

    // Updates positions based on the pattern type
    switch (this.patternType) {
      case 0:
        this.x = this.initialX + 50 * Math.cos(this.t);
        this.y = this.initialY + 50 * Math.sin(this.t) + this.speed * 20;
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
        this.x = this.initialX + 75 * Math.sin(this.t);
        this.y = this.initialY + 50 * Math.cos(this.t);
        break;
      case 4:
        this.x = this.initialX + 100 * Math.sin(this.t);
        this.y += this.speed * 20;
        break;
      case 5:
        this.x = this.initialX + 50 * this.t * Math.cos(this.t);
        this.y = this.initialY + 50 * this.t * Math.sin(this.t);
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

  draw(context) {
    context.fillStyle = "#ff0000";
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  hit() {
    this.health -= 1;
  }

  isAlive() {
    return this.health > 0;
  }
}
