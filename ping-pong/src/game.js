import Paddle from "/src/paddle.js";
import Ball from "/src/ball.js";
import InputHandler from "/src/inputHandler.js";

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.game_situations = ["menu", "running", "paused", "gameOver"];

    this.currentSituation = "menu";
  }

  start() {
    this.lower_paddle = new Paddle(this, "lower");
    this.upper_paddle = new Paddle(this, "upper");

    this.paddles = [this.lower_paddle, this.upper_paddle];

    this.ball = new Ball(this);

    this.objects = [this.lower_paddle, this.upper_paddle, this.ball];

    new InputHandler(this.lower_paddle, this.upper_paddle, this);
  }

  move_objects(deltaTime) {
    if (
      this.currentSituation === "paused" ||
      this.currentSituation === "menu" ||
      this.currentSituation === "gameOver"
    )
      return;

    this.objects.forEach(object => {
      object.move(deltaTime);
    });
  }

  draw_objects(ctx) {
    this.objects.forEach(object => {
      object.draw(ctx);
    });

    if (this.currentSituation === "paused") {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();

      ctx.font = "30px Times New Roman";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.currentSituation === "menu") {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      ctx.font = "30px Times New Roman";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACEBAR to start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.currentSituation === "gameOver") {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      ctx.font = "30px Times New Roman";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GameOver", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  pauseGame() {
    if (this.currentSituation !== "paused") {
      this.currentSituation = "paused";
    } else {
      this.currentSituation = "running";
    }
  }

  closeMenu() {
    this.currentSituation = "running";
  }

  reset() {
    this.objects.forEach(object => {
      object.reset();
    });
  }
}
