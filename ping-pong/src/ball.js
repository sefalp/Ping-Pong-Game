import { collisionDetector } from "/src/collisionDetector.js";

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("ball");
    this.position = { x: 100, y: 100 };
    this.speed = { x: 18, y: 30 };
    this.size = 20;

    this.example = [1, 2];

    this.game = game;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  move(deltaTime) {
    if (!deltaTime) return;
    this.position.x += this.speed.x / deltaTime;
    this.position.y += this.speed.y / deltaTime;

    if (this.position.x < 0 || this.position.x + this.size > this.gameWidth) {
      this.speed.x = -this.speed.x;
    }

    if (this.position.y < 0 || this.position.y + this.size > this.gameHeight) {
      this.speed.y = -this.speed.y;
    }

    this.game.paddles.forEach(element => {
      if (collisionDetector(this, element)) {
        this.speed.y = -this.speed.y;

        if (this.speed.x < 0) {
          this.speed.x -= 2;
        } else if (this.speed.x > 0) {
          this.speed.x += 2;
        }

        if (this.speed.y < 0) {
          this.speed.y -= 2;
        } else if (this.speed.y > 0) {
          this.speed.y += 2;
        }
      }
    });
  }

  reset() {
    this.position = { x: 100, y: 100 };
    this.speed = { x: 18, y: 30 };
  }
}
