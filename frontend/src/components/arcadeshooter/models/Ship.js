import Bullet from "./Bullet";
import catShipImage from "../../../images/arcadeshooter/catship.png";

export default class Ship {
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

  moveRight(boundary) {
    if (this.x + this.width < boundary) {
      this.x += this.speed;
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= this.speed;
    }
  }

  shoot() {
    const bulletX = this.x + this.width / 2 - 1.5;
    const bulletY = this.y - 10;
    this.bullets.push(new Bullet(bulletX, bulletY));
  }

  draw(context) {
    if (this.image.complete) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      this.image.onload = () => {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
      };
    }
  }

  drawBullets(context) {
    this.bullets = this.bullets.filter((bullet) => bullet.y > 0);
    this.bullets.forEach((bullet) => {
      bullet.update();
      bullet.draw(context);
    });
  }
}
