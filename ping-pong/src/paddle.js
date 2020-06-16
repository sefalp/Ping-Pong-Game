export default class Paddle {
  constructor(game, which_one) {
    this.width = 120;
    this.height = 30;

    this.lives = 3;

    this.game = game;
    this.which_one = which_one;
    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;

    this.maxspeed = 45;
    this.speed = 0;

    this.heart = document.getElementById("heart");

    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10
    };

    if (which_one === "upper") {
      this.position.y = 10;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "#00f";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    var i;
    for (i = 1; i < this.lives + 1; i++) {
      if (this.which_one === "upper")
        ctx.drawImage(this.heart, 10, i * 15 + 50, 15, 15);
      if (this.which_one === "lower")
        ctx.drawImage(this.heart, 10, i * 15 + 450, 15, 15);
    }
  }

  move(stamp) {
    if (!stamp) return;
    this.position.x += this.speed / stamp;

    if (this.which_one === "lower") {
      if (this.game.ball.position.y + this.game.ball.size >= this.gameHeight) {
        this.lives--;
        this.game.reset();
        //console.log(this.which_one,this.lives)
      }
    }

    if (this.which_one === "upper") {
      if (this.game.ball.position.y < 0) {
        this.lives--;
        this.game.reset();
        //console.log(this.which_one,this.lives)
      }
    }

    if (this.position.x < 0) {
      this.position.x = 0;
    } else if (this.position.x + this.width > this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }

    if (this.lives === 0) {
      this.game.currentSituation = "gameOver";
    }
  }

  moveLeft() {
    this.speed = -this.maxspeed;
  }

  moveRight() {
    this.speed = this.maxspeed;
  }

  stop() {
    this.speed = 0;
  }

  reset() {
    this.position = {
      x: this.game.gameWidth / 2 - this.width / 2,
      y: this.game.gameHeight - this.height - 10
    };

    if (this.which_one === "upper") {
      this.position.y = 10;
    }
  }
}
