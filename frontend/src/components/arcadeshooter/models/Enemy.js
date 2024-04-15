import React from "react";
import dogShipImage from "../../../images/arcadeshooter/dogship.png";

export default class Enemy {
  constructor(
    x,
    y,
    speed = 0.06,
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

  // Update method to move and update enemy state
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

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  hit() {
    this.health -= 1;
  }

  isAlive() {
    return this.health > 0;
  }
}
