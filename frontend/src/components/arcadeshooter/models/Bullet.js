export default class Bullet {
  constructor(x, y, velocity = 7) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.width = 3;
    this.height = 10;
  }

  update() {
    this.y -= this.velocity;
  }

  draw(context) {
    context.fillStyle = "#f00";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
